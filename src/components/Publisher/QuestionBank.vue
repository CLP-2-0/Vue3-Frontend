<template>
  <div class="container tab-adjuster">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-success"
      data-bs-toggle="collapse"
      data-bs-target="#collapseHWCreation"
      aria-expanded="false"
      aria-controls="collapseHWCreation"
    >
      Pre-defined Assignment
    </button>
    <div class="collapse" id="collapseHWCreation">
      <Homework :lessonIdx="this.$route.params.id"/>
    </div>
    <hr />
    <h2>Question Bank</h2>
    <QuestionCreation :lessonIdx="this.$route.params.id" type="assignment"/>

</div>

</template>

<script>
import QuestionApis from '@/apis/QuestionApis';
import LessonApis from '@/apis/LessonApis';
import Homework from '../Homework.vue';
import QuestionCreation from './QuestionCreation.vue';

export default {
  name: "Question Bank",
  components: {
    Homework,
    QuestionCreation
  },
  props: ["lessonIdx"],
  data() {
    return {
    };
  },
  methods: {

  },
  
  mounted() {
  },
};
</script>

<style></style>
