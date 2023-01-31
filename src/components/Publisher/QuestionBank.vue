<template>
  <div class="container tab-adjuster">
    <!-- Button trigger modal -->
    <h2>Question Bank</h2>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="collapse"
      data-bs-target="#collapseCreation"
      aria-expanded="false"
      aria-controls="collapseCreation"
    >
      New Question
    </button>
    <div class="collapse" id="collapseCreation">
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
<div class="card" style=" margin-top: 30px" v-for="question in questionsBank" :key="question.id">
  <div class="card-body">
    <h5 class="card-title">Question</h5>
    <h6 class="card-subtitle mb-2 text-muted" v-html="question.question"></h6>
    <h5>Answer:</h5>
    <p class="card-text" v-html="question.answer"></p>
    
  </div>
</div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import QuestionApis from '@/apis/QuestionApis';
import LessonApis from '@/apis/LessonApis';

export default {
  name: "Question Bank",
  components: {
    QuillEditor,
  },
  props: ["lessonIdx"],
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
      questionsBank: []
    };
  },
  methods: {
    async save() {
        let question = {}
        question.question = this.question
        question.answer = this.answer
        await QuestionApis.saveQuestion(this.lessonIdx, question);
        this.getLessonById()
        this.question = ''
        this.answer = ''

    },
    async getLessonById() {
      
      const res = await LessonApis.getLessonById(this.lessonIdx);
      this.questionsBank = res.data.questionsBank
    }
  },
  mounted() {
    this.getLessonById()
  },
};
</script>

<style></style>
