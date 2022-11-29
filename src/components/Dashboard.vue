<template>
  <div>
    <NavbarActive />
    <SectionList />
  </div>
</template>

<script>
import NavbarActive from "./NavbarActive.vue";
import SectionList from "./SectionList.vue";
export default {
  name: "Dashboard",
  components: {
    NavbarActive,
    SectionList
  }
};
</script>

<style></style>
