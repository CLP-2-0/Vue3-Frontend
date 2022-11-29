<template>
  <div>
    <nav class="navbar navbar-dark bg-dark ">
      <div class="container-fluid m-2">
        <router-link to="/">Home</router-link>

        <div class="nav-link">
          <!-- <router-link to="/teacher/dashboard">Dashboard</router-link> -->
          <router-link to="/teacher/dashboard"
            ><i class="fa fa-solid fa-user px-3" style="color:white"></i
          ></router-link>
        </div>
      </div>
    </nav>

    <div class="container-fluid header-container">
      <span class="container">Current location</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
div > a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  text-transform: uppercase;
}
.header-container {
  height: 7vh;
  background-color: rgb(230, 239, 245);
  width: 100%;
  position: relative;
  margin-bottom: 20px;
}
.header-container > span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1em;
  margin: auto;
  font-size: 1.2em;
}
</style>
