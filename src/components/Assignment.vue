<!-- <template>
  <div>
    <div class="container tab-adjuster">
      <div class="row">
        <div class="question-bank col">
          <div
            class="card row"
              style="
              margin-bottom: 5px;
              display: flex;
              padding: 5px;
              flex-direction: row;
            "
            v-for="(question, idx) in questions"
            :key="question.id"
          >
            <div class="card-body" style="width: 90%">
              <h5 class="card-title">
                Question: ({{ question.point }} points)
              </h5>
              <h6
                class="card-subtitle mb-2 text-muted"
                v-html="question.question.question"
              ></h6>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Answer: </label>
                <select class="form-select" aria-label="Default select example" style="width: 15%" v-model="selected">
                  <option selected disabled>Select Answer Type</option>
                  <option :value="['q1'+idx]" selected>Text</option>
                  <option :value="['q2'+idx]">Audio</option>
                </select>
                <textarea v-if="selected == ('q1'+idx)"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Type your answer here..."
                ></textarea>
                <div v-if="selected == ('q2'+idx)">
                  <Audio />
                </div>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
       <div style="display: flex;justify-content: center;">
      <button type="button" class="btn btn-success" @click="createHomework"> Create Homework</button>
    </div> 
     </div>
  </div>
</template> -->
<template>
  <div class="row">
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
      <div
        class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
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
        <div class="form-group">
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
                <select class="form-select" aria-label="Default select example" style="width: 15%" v-model="selected">
                  <option selected disabled>Select Answer Type</option>
                  <option :value="['q1'+this.curr]" selected>Text</option>
                  <option :value="['q2'+this.curr]">Audio</option>
                </select>
                <textarea v-if="selected == ('q1'+this.curr)"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Type your answer here..."
                ></textarea>
                <div v-if="selected == ('q2'+this.curr)">
                  <Audio />
                </div>
                <button class="btn btn-success">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeworkApis from "@/apis/HomeworkApis";
import Audio from "./Audio.vue";
export default {
  props: ["lessonIdx", "sid"],
  components: {
    Audio,
  },
  data() {
    return {
      questions: [],
      selected: "",
      curr: 0,
      num: 0,
      question: "",
      point: 0,
    };
  },
  methods: {
    async getAssignment() {
      console.log("get assignment...");
      const res = await HomeworkApis.getHomeworkBySection(
        this.lessonIdx,
        this.sid
      );
      this.questions = res.data.questionList;
      this.question = this.questions[0].question.question;
      this.point = this.questions[0].point;
    },
    chooseQuestion(question, num) {
      this.curr = num;
      this.num = num;
      this.question = question.question.question;
      this.point = question.point;
      console.log("choose", num);
    },
    async saveAnswer() {
      // await HomeworkApis.saveAnswerToAQuestion(username, id, answer)
    },
  },
  async mounted() {
    this.getAssignment();
  },
};
</script>

<style></style>
