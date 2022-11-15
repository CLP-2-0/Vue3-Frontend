<template>
  <div>
    <div class="container">
      <div class="center-div">
        <div>{{ title }}</div>
      </div>
      <div id="content"></div>
    </div>
  </div>
</template>

<script>
import LessonApis from "@/apis/LessonApis";
export default {
  name: "Book",
  components: {},
  props: ["lessonIdx"],
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    async getLessonById() {
      const res = await LessonApis.getLessonbyId(this.lessonIdx);
      this.title = res.data.title;
      this.content = res.data.content;
      document.getElementById("content").innerHTML = this.content;
    },
  },
  mounted() {
    this.getLessonById();
  },
};
</script>

<style>
.center-div {
    display: flex;
    justify-content: center;
}
</style>
