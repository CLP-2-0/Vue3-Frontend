<template>
  <div>
    <NavbarActive />
    <!-- Breadcrumb justfornow - need change later -->
    <div class="container-fluid header-container">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- end justfornow -->

    <SectionList />
  </div>
</template>

<script>
import NavbarActive from "../components/NavbarActive.vue";
import SectionList from "../components/SectionList.vue";
export default {
  name: "Dashboard",
  components: {
    NavbarActive,
    SectionList,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.addBtn {
  margin-bottom: 20px;
}
.input-group-text {
  border-radius: 0 0.375em 0.375em 0 !important;
}
</style>
