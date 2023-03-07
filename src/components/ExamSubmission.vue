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
          <h5 class="card-title">Question: ({{question.point }} points)</h5>
          <div v-html="question.question"></div>
          <div v-if="isAdminOrTeacher">
            <h5>Answer:</h5>
            <div v-html="answer_s"></div>
  
          </div>
  
          <div v-if="!isAdmin" class="form-group" style="margin-bottom: 5%">
            
            <div >
              <label for="exampleFormControlTextarea1">Choose answer type: </label>
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
                :id="['text_answer_' + this.curr]"
                rows="3"
                placeholder="Type your answer here..."
                v-model="question.answer"
                @change="saveAnswer()"
              ></textarea>
              <div v-if="selected == 'q2_' + this.curr">
                <Audio @answer-update="audioUpdate($event)" />
              </div>
              <div>
                <h5>Answer:</h5>
                 <div class="card" v-if="this.eAnswers[this.curr] && this.eAnswers[this.curr].type == 'text'">
                  {{eAnswers[this.curr].key}}
                </div> 
                 <audio
                 v-if="this.eAnswers[this.curr] && this.eAnswers[this.curr].type == 'audio'"
                    controls
                    :src=this.eAnswers[this.curr].key
                    id="result">
                </audio>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="display:flex; justify-content: center;">
        <button class="btn btn-success" @click="submitExam()">
            Submit
        </button>
    </div>
    
  </template>
  
  <script>
  import HomeworkApis from "@/apis/HomeworkApis";
  import Audio from "./Audio.vue";
  import LessonApis from "@/apis/LessonApis";
  
  export default {
    props: ["lessonIdx", "sid", "exam"],
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
        answer_s: "",
        idx: 0,
        updateAnswer: 0,
        userRole: localStorage.getItem('user_role'),
        answer: '',
        eAnswers: []
      };
    },
    methods: {
      async getAssignment() {
        console.log("get assignment...");
        let res = 0;
        if(this.userRole != 'admin'){
          if(this.exam) {
            res = await LessonApis.getLessonById(this.lessonIdx)
            console.log(res)
            this.questions = res.data.exam.questionList
          } else {
            res = await HomeworkApis.getHomeworkBySection(
            this.lessonIdx,
            this.sid
            )
            this.questions = res.data.questionList;
  
          }
          
        
        
        } else if(this.userRole == 'admin'){
            res = await LessonApis.getLessonById(this.lessonIdx)
            console.log(res)
          if(this.exam){
            this.questions = res.data.exam.questionList
          } else {
            this.questions = res.data.predefined.questionList
          }
          
  
        }
        
        this.question = {
            question: this.questions[0].question.question,
            point: this.questions[0].point,
            id: this.num
        }
        this.updateAnswer++;
        
      },
      chooseQuestion(question, num) {
        this.curr = num;
        this.num = num;
        this.question = {
            question: question.question.question,
            point: question.point,
            id: this.num
        }
        this.updateAnswer++;
      },
      async saveAnswer() {
        let type =
          this.selected[0].split("_")[0].slice(1) == 1 ? "text" : "audio";
        let answer = {};
        if (type == "text") {
          answer = {
            type: "text",
            key: this.question.answer,
          };
        this.eAnswers.splice(this.question.id, 1, answer)
        console.log(this.eAnswers)
        } else if (type == "audio") {
        var reader = new FileReader();
        var base64data;
        var answerPromise = new Promise((resolve, reject) => { // create a Promise
            reader.onloadend = function() {
            base64data = reader.result;
            var answer = {
                type: "audio",
                key: base64data
            }
            resolve(answer); // resolve the Promise with the answer value
            }
        });
        reader.readAsDataURL(this.question.answer);

        answerPromise.then((answer) => { // wait for the Promise to resolve
            this.updateAnswer++;
            console.log(answer)
            this.eAnswers.splice(this.question.id, 1, answer)
        console.log(this.eAnswers)
        });
        }

        
        

      },
      audioUpdate(key) {
        this.question.answer = key;
        this.saveAnswer()
        
      },
      async submitExam() {
        let username = localStorage.getItem("user_name");
        console.log(username, this.eAnswers)
        let examAnswer = {}
        let examAnswers = []
        this.eAnswers.forEach(a => {
          examAnswer = {
            answer: a,
            student: username
          }
          examAnswers.push(examAnswer)
        });
        // console.log(this.sid, this.lessonIdx)
        await HomeworkApis.saveExamSubmission(this.sid, this.lessonIdx, examAnswers)
      }
    },
    computed: {
        isAdmin() {
        return this.userRole === 'admin'
              },
        isExam() {
          return this.exam === true
        },
        isAdminOrTeacher() {
                  return this.userRole === 'admin' || this.userRole === 'teacher'
              },
        isTeacher() {
          return this.userRole === 'teacher'
        }
          },
    async mounted() {
      console.log(this.userRole)
      this.getAssignment();
    },
  };
  </script>
  
  <style></style>
  