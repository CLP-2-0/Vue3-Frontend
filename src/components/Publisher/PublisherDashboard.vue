<template>
  <div>
    <NavbarActive />
    <div class="container">
      <LessonList />
      <!-- <BookEditor /> -->
    </div>
  </div>
</template>

<script>
import NavbarActive from "../NavbarActive.vue";
import BookEditor from "./BookEditor.vue";
import LessonList from "./LessonList.vue";

export default {
  name: "Publisher Dashboard",
  components: {
    NavbarActive,
    BookEditor,
    LessonList
  },
  data() {
    return {};
  }
};
</script>

<style></style>
