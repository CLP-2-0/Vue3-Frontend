<template>
    <div class="container tab-adjuster">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="collapse"
        data-bs-target="#collapseQCreation"
        aria-expanded="false"
        aria-controls="collapseQCreation"
      >
        + New Question
      </button>
        <button v-if="isAdmin && isExam" type="button" class="btn btn-outline-success" @click="createExam()"> Create Exam</button>
      </div>
      <div class="form-group row mt-2" :hidden="!show">
						<label for="num" class="col-sm-2 col-form-label">Set Time:</label>
						<div class="col-sm-1">
							<div class="time-input">
                <input type="number" class="time-input__hours" v-model="hour" min="0" max="23" placeholder="HH" required pattern="\d{1,2}">
                <span>h:</span>
                <input type="number" class="time-input__minutes" v-model="minute" min="0" max="59" placeholder="MM" required pattern="\d{1,2}">m
              </div>

						</div>
            <!-- <div v-if="$v.$invalid" class="error-message">
              Please enter a valid time in the format HH:MM
            </div> -->
					</div>
      <div class="collapse" id="collapseQCreation" >
        <div class="q-creation">
          <label class="col-sm-1 col-form-label">Question:</label>
          <quill-editor
            v-model:content="question"
            contentType="html"
            ref="quillEditor"
            :options="editorOption"
          />
          <label class="col-sm-3 col-form-label">Sample Answer:</label>
          <quill-editor
            v-model:content="answer"
            contentType="html"
            ref="quillEditor"
            :options="editorOption"
          />
          <div class="btn-container">
            <button type="button" class="btn btn-outline-success" @click="save"
            data-bs-toggle="collapse" data-bs-target="#collapseCreation" aria-expanded="false" aria-controls="collapseCreation">
              Save
            </button>
          </div>
        </div>
      </div>
  </div>
  <div class="card " style=" margin-top: 30px" v-for="(question, idx) in questionsBank" :key="question.id">
    <div class="card-body">
      <h5 class="card-title">Question</h5>
      <h6 class="card-subtitle mb-2 text-muted" v-html="question.question"></h6>
      <h5>Answer:</h5>
      <p class="card-text" v-html="question.answer"></p>
      <form class="form-inline" ref="forGrade" :id="['Row_' + idx]" :hidden="!show">
								<div class="form-group mb-2" style="width: 7%">
									<label for="inputGrade">Grade</label>
									<input
										type="text"
										class="form-control"
										:id="['inputGrade_' + idx]"
										@change="addToTotal($event, question.question)"
									/>
								</div>
							</form>
      
    </div>
  </div>
  
  <div class="btn-container" :hidden="!show">
    <div class="form-group row mt-2">
						<label for="num" class="col-sm-3 col-form-label">Number of Questions:</label>
						<div class="col-sm-2">
							<input
								type="text"
								class="form-control"
								id="num"
								:value="numOfQuestion"
								disabled
							/>
						</div>
						<label for="total" class="col-sm-2 col-form-label">Total Grade:</label>
						<div class="col-sm-2">
							<input type="text" class="form-control" id="total" :value="total" disabled />
						</div>
					</div>
    <button type="button" class="btn btn-outline-success" @click="saveExam">
      Save Exam
    </button>
  </div>
  
  </template>
  
  <script>
  import { QuillEditor } from "@vueup/vue-quill";
  import "@vueup/vue-quill/dist/vue-quill.snow.css";
  import QuestionApis from '@/apis/QuestionApis';
  import LessonApis from '@/apis/LessonApis';
  
  export default {
    name: "Question Creation",
    components: {
      QuillEditor,
    },
    props: ["lessonIdx", "type"],
    data() {
      return {
        lessons: [],
        editorOption: {
          theme: "snow",
          placeholder: "",
          modules: {
            toolbar: [
              "bold",
              "italic",
              "underline",
              "link",
              "clean",
              { color: ["red", "rgb(237, 125, 49)", "black"] },
              { background: [] },
              "image"
            ],
          },
        },
        question: '',
        answer: '',
        questionsBank: [],
        show: false,
        userRole: localStorage.getItem("user_role"),
        gradedQuestions: [],
        numOfQuestion: 0,
        total: 0,
        hour: 0,
        minute: 0
      };
    },
    methods: {
      async save() {

          let question = {}
          question.question = this.question
          question.answer = this.answer
          if(this.type == 'assignment') {
            await QuestionApis.saveQuestion(this.lessonIdx, question);
          } else if(this.type == 'exam') {
            await QuestionApis.saveEQuestion(this.lessonIdx, question);
          }
          this.question = ''
          this.answer = ''
          this.getLessonById()

  
      },
      async getLessonById() {
        
        const res = await LessonApis.getLessonById(this.lessonIdx);
        if(this.type == 'assignment') {
          this.questionsBank = res.data.questionsBank
        } else if(this.type == 'exam') {
            this.questionsBank = res.data.examBank
          }
      },
      createExam() {
        this.show = !this.show
        this.numOfQuestion = this.questionsBank.length
      },
      addToTotal(e, q) {
				if (this.formEvent == null) {
					this.formEvent = e;
				}
				let p = parseInt(e.target.value);
				this.total += p;
				let gradedQuestion = {
					question: q,
					point: p,
				};
				this.gradedQuestions.push(gradedQuestion);
        console.log(this.gradedQuestions)
        console.log(this.total)
			},
      saveExam() {
        console.log(this.hour, this.minute)
      }
    },
    
    mounted() {
      this.getLessonById()
    },
    computed: {
			isAdmin() {
				return this.userRole === 'admin'
			},
      isExam() {
        return this.type === 'exam'
      }
		},
    
  };
  </script>
  
  <style>
.time-input {
  display: flex;
  align-items: center;
}

.time-input__hours,
.time-input__minutes {
  width: 80px;
  height: 30px;
  padding: 5px;
  margin: 0 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  text-align: center;
}

</style>
  