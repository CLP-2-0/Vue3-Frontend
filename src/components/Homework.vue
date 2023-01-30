<template>
  <div class="container tab-adjuster">
    <div class="row">
      <div class="question-bank col">
        <div
          class="card row"
          style="margin-bottom: 5px; display: flex; padding: 5px; flex-direction: row;"
          v-for="question in questionsBank"
          :key="question.id"
        >
            <input type="checkbox" style="width:2%" id="checkbox" v-model="checkedQuestions" :value="question" />
          <div class="card-body " style="width: 90%;">
            <h5 class="card-title">Question:</h5>
            <h6
              class="card-subtitle mb-2 text-muted"
              v-html="question.question"
            ></h6>
            <h5>Answer:</h5>
            <p class="card-text" v-html="question.answer"></p>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex;justify-content: center;">
      <button type="button" class="btn btn-success" @click="createHomework"> Create Homework</button>
    </div>
    
  </div>
</template>

<script>
import LessonApis from "@/apis/LessonApis";

export default {
  name: "Homework Creation",
  components: {},
  props: ["lessonIdx"],
  data() {
    return {
      lessons: [],
      questionsBank: [],
      checkedQuestions: []
    };
  },
  methods: {
    async getLessonById() {
      const res = await LessonApis.getLessonById(this.lessonIdx);
      this.questionsBank = res.data.questionsBank;
      console.log(res.data.questionsBank);
    },
    createHomework() {
      
    }
  },
  mounted() {
    this.getLessonById();
  },
};
</script>

<style></style>
