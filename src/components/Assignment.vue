<template>
  <h4 v-if="this.questions == []">There is no assignment. Please create one!</h4>
  <div class="row">
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
      <div
        class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white"
      >
        <ul
          class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li class="nav-item">
            <span
              type="button"
              class="d-none d-sm-inline text-success link btn btn-outline-secondary"
              v-for="(question, idx) in questions"
              :key="question.id"
              @click="chooseQuestion(question, idx)"
            >
              Question {{ idx + 1 }}
            </span>
          </li>
        </ul>
        <hr />
      </div>
    </div>
    <div class="col-auto col-md-9 col-xl-10 px-sm-10">
      <div class="card-body ml-5" style="width: 90%" v-if="curr == num">
        <h5 class="card-title">Question: ({{ point }} points)</h5>
        <div v-html="question"></div>
        <div v-if="!isAdmin" class="form-group" style="margin-bottom: 5%">
          <button 
            class="btn btn-primary"
            data-bs-toggle="collapse"
            data-bs-target="#collapseAnswer"
            aria-expanded="false"
            aria-controls="collapseAnswer"
          >
            + Answer
          </button>
          <div class="collapse" id="collapseAnswer">
            <label for="exampleFormControlTextarea1">Answer: </label>
            <select
              class="form-select"
              aria-label="Default select example"
              style="width: 15%"
              v-model="selected"
            >
              <option selected disabled>Select Answer Type</option>
              <option :value="['q1_' + this.curr]" selected>Text</option>
              <option :value="['q2_' + this.curr]">Audio</option>
            </select>
            <textarea
              v-if="selected == 'q1_' + this.curr"
              class="form-control"
              id="text_answer"
              rows="3"
              placeholder="Type your answer here..."
              v-model="answer"
            ></textarea>
            <div v-if="selected == 'q2_' + this.curr">
              <Audio @answer-update="audioUpdate($event)" />
            </div>
            <button class="btn btn-success" @click="saveAnswer()">
              Submit
            </button>
          </div>
        </div>
        <AnswerList :key="updateAnswer" :idx="idx" />
        <div v-if="!isAdmin" id="foot">This is the end of answers.</div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeworkApis from "@/apis/HomeworkApis";
import Audio from "./Audio.vue";
import AnswerList from "./AnswerList.vue";
import LessonApis from "@/apis/LessonApis";

export default {
  props: ["lessonIdx", "sid"],
  components: {
    Audio,
    AnswerList,
  },
  data() {
    return {
      questions: [],
      selected: "",
      curr: 0,
      num: 0,
      question: "",
      point: 0,
      answer: "",
      idx: 0,
      updateAnswer: 0,
      userRole: localStorage.getItem('user_role'),
    };
  },
  methods: {
    async getAssignment() {
      console.log("get assignment...");
      let res = 0;
      if(this.userRole != 'admin'){
        res = await HomeworkApis.getHomeworkBySection(
        this.lessonIdx,
        this.sid
      );
      this.questions = res.data.questionList;
      
      } else if(this.userRole == 'admin'){
        res = await LessonApis.getLessonById(this.lessonIdx)
        console.log(res)
        this.questions = res.data.predefined.questionList

      }
      
      this.question = this.questions[0].question.question;
      this.point = this.questions[0].point;
      this.idx = this.questions[0].id;
      this.updateAnswer++;
      
    },
    chooseQuestion(question, num) {
      this.curr = num;
      this.num = num;
      this.question = question.question.question;
      this.point = question.point;
      this.idx = question.id;
      this.updateAnswer++;
      console.log("q", this.idx);
    },
    async saveAnswer() {
      let username = localStorage.getItem("user_name");
      let type =
        this.selected[0].split("_")[0].slice(1) == 1 ? "text" : "audio";
      let answer = {};
      let foot = document.getElementById("foot")
      if (type == "text") {
        answer = {
          type: "text",
          key: this.answer,
        };
        await HomeworkApis.saveAnswerToAQuestion(
          username,
          this.idx,
          answer
        ).then(() => {
          this.updateAnswer++;
          console.log(this.updateAnswer);
          foot.scrollIntoView({ behavior: "smooth" });
        });
      } else if (type == "audio") {
        var reader = new FileReader();
        var base64data;
        var qId = this.idx;
        reader.readAsDataURL(this.answer);

          reader.onloadend = async function() {
            base64data = reader.result;
            console.log(base64data);
            answer = {
              type: "audio",
              key: base64data
            }
            
            await HomeworkApis.saveAnswerToAQuestion(username, qId, answer)
            this.updateAnswer++;
            console.log(this.updateAnswer);
            foot.scrollIntoView({ behavior: "smooth" });
          }.bind(this);
          
        
      }
    },
    audioUpdate(key) {
      this.answer = key;
    },
  },
  computed: {
			isAdmin() {
				return this.userRole === 'admin'
			}
		},
  async mounted() {
    console.log(this.userRole)
    this.getAssignment();
  },
};
</script>

<style></style>
