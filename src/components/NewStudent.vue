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

    <div class="container">
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Enter Class Code:</label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        <button type="button" class="btn btn-outline-success" @click="joinClass">
          Join
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import NavbarActive from "./NavbarActive.vue";

export default {
  name: "Publisher Dashboard",
  components: {
    NavbarActive,
  },
  data() {
    return {};
  },
  methods: {
	joinClass() {
		
	}
  }
};
</script>

<style></style>
