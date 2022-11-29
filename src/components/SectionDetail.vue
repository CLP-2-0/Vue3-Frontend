<template>
  <div>
    <NavbarActive />
    <div class="container">
      <LessonList />
    </div>
  </div>
</template>

<script>
import NavbarActive from "./NavbarActive.vue";
import LessonList from "./LessonList.vue";
export default {
  name: "Section Detail",
  components: {
    NavbarActive,
    LessonList
  }
};
</script>

<style></style>
