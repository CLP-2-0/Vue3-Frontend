<template>
  <div>
    <NavbarActive />
    <!-- justfornow - need change later -->
    <div class="container-fluid header-container">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/dashboard" class="text-dark"
                >Dashboard</router-link
              >
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              All Lessons
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- end justfornow -->
    <div class="container">
      <div class="input-group mb-3">
        <h5>Section Code: {{ this.$route.params.sid }}</h5>

        <div class="input-group-append" style="margin-left: 2%">
          <span
            type="button"
            class="input-group-text"
            id="basic-addon2"
            @click="copyCode()"
			
            >Copy</span
          >
        </div>
      </div>

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
    LessonList,
  },
  methods: {
    copyCode() {
    //   var copyText = document.getElementById("sectionId");

    //   // Select the text field
    //   copyText.select();
    //   copyText.setSelectionRange(0, 99999); // For mobile devices

      // Copy the text inside the text field
      navigator.clipboard.writeText(this.$route.params.sid);
      alert("Copied the text: " + this.$route.params.sid);
    },
  },
};
</script>

<style></style>
