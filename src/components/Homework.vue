<template>
  <div class="container tab-adjuster">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="collapse"
      data-bs-target="#collapseCreation"
      aria-expanded="false"
      aria-controls="collapseCreation"
    >
      Edit Assignment
    </button>
    <div class="collapse" id="collapseCreation">
      <h2>Assignment Creation</h2>

      <div class="container tab-adjuster">
        <div class="row">
          <div class="question-bank col">
            <div
              class="card row" style="margin-bottom: 5px;
                display: flex;
                padding: 5px;
                flex-direction: row;
              "
              v-for="(question, idx) in questionsBank"
              :key="question.id"
            >
              <input
                ref="forCheck"
                type="checkbox"
                style="width: 2%"
                id="checkbox"
                v-model="checkedQuestions"
                :value="question"
                @change="check($event, idx)"
              />
              <div class="card-body" style="width: 85%">
                <h5 class="card-title">Question:</h5>
                <h6
                  class="card-subtitle mb-2 text-muted"
                  v-html="question.question"
                ></h6>
                <h5>Answer:</h5>
                <p class="card-text" v-html="question.answer"></p>
              </div>
              <form class="form-inline" ref="forGrade" :id="['Row_' + idx]" hidden>
                <div class="form-group mx-sm-3 mb-2" style="width: 7%">
                  <label for="inputGrade">Grade</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputGrade"
                    @change="addToTotal($event, question)"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          style="display: flex; justify-content: center; flex-direction: row" 
        >
          <div class="form-group row">
            <label for="num" class="col-sm-3 col-form-label">Number of Questions:</label>
            <div class="col-sm-2">
              <input type="text" class="form-control" id="num" :value="checkedQuestions.length" disabled />
            </div>
            <label for="total" class="col-sm-2 col-form-label">Total Grade:</label>
            <div class="col-sm-2">
              <input type="text" class="form-control" id="total" :value="total" disabled/>
            </div>
            
          </div>
          <button
              type="button"
              class="btn btn-success col-sm-3"
              @click="createHomework"
              data-bs-toggle="collapse"
      data-bs-target="#collapseCreation"
      aria-expanded="false"
      aria-controls="collapseCreation"
            >
              Create Assignment
            </button>
        </div>
      </div>
    </div>
    <div>
      Preview Current Assignment
    </div>
    <Assignment :lessonIdx="lessonIdx" :sid="sid" :key="update"/>
  </div>
</template>

<script>
import LessonApis from "@/apis/LessonApis";
import Assignment from "./Assignment.vue";
import HomeworkApis from "@/apis/HomeworkApis";
export default {
  name: "Homework Creation",
  components: {
    Assignment,
  },
  props: ["lessonIdx", "sid"],
  data() {
    return {
      lessons: [],
      questionsBank: [],
      checkedQuestions: [],
      total: 0,
      gradedQuestions: [],
      update: 0,
      formEvent: null
    };
  },
  methods: {
    async getLessonById() {
      const res = await LessonApis.getLessonById(this.lessonIdx);
      this.questionsBank = res.data.questionsBank;
    },
    async createHomework() {
      console.log("save")
      await HomeworkApis.saveHomework(
        this.lessonIdx,
        this.gradedQuestions,
        this.sid,
      ).then(() => {
        for(let idx in this.$refs.forGrade){
          this.$refs.forGrade[idx].reset()
          document.getElementById("Row_" + idx).hidden = true
        }
        this.total = 0
        this.checkedQuestions = []
        this.update++
        this.gradedQuestions = []
        
      })

    },
    check(e, idx) {
      
      this.$nextTick(() => {
        if(e.target.checked) {
          document.getElementById("Row_" + idx).hidden = false
        } else {
          document.getElementById("Row_" + idx).hidden = true
        }
      });
    },
    addToTotal(e, q) {
      if(this.formEvent == null) {
        this.formEvent = e
      }
      let p = parseInt(e.target.value)
      this.total += p
      let gradedQuestion = {
        question: q,
        point: p
      }
      this.gradedQuestions.push(gradedQuestion)
    }
  },
  mounted() {
    this.getLessonById();
  },
};
</script>

<style></style>
