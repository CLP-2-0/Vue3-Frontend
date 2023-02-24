<template>
  <div v-if="loading" class="loading-page">
    <div class="spinner-container">
      <div class="loading-spinner"></div>
      <div class="loading-spinner-1"></div>
    </div>
    <p class="mt-4 text-uppercase fs-6 fw-bold">L o a d i n g . . .</p>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  data() {
    return {
      loading: true,
    };
  },
  name: "Home",
  components: {
    Navbar,
  },
  mounted() {
    this.auth0Login();
  },
  methods: {
    auth0Login() {
      this.$store.dispatch("auth0Login");
      console.log("login");
    },
  },
};
</script>

<style>
.loading-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.loading-spinner {
  position: absolute;
  /* border: 10px solid #f3f3f3; */
  border-top: 10px solid #5f278d;
  border-bottom: 10px solid #5f278d;
  border-radius: 50%;
  width: 40px;
  height: 100px;
  animation: spin 1.2s linear infinite;
}
.loading-spinner-1 {
  /* border: 10px solid #f3f3f3; */
  border-left: 10px solid #5f278d;
  border-right: 10px solid #5f278d;
  border-radius: 50%;
  width: 100px;
  height: 40px;
  animation: spin 1.2s linear infinite;
}

p {
  color: #581e88;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
