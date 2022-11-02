<template>
  <div class="container grid-container">
 
  <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
    <div class="col-6 col-md-4 mb-4">
       <router-link to="/teacher/dashboard/course"> <div class="image"><div>CHIN10123 FAL2022</div></div></router-link>
    </div>
    <div class="col-6 col-md-4 mb-4">
       <router-link to="/"> <div class="image"><div>CHIN10123 FAL2022</div></div></router-link>
    </div><div class="col-6 col-md-4 mb-4">
       <router-link to="/"> <div class="image"><div>CHIN10123 FAL2022</div></div></router-link>
    </div><div class="col-6 col-md-4 mb-4">
       <router-link to="/"> <div class="image"><div>CHIN10123 FAL2022</div></div></router-link>
       
  </div>

</div>
</template>

<script>
export default {

}
</script>

<style>
.grid-container{
    display:grid;
    grid-template-columns:auto auto auto;
    justify-content:space-between;
    width: 70vw;
    margin: auto;
}
.image{
    height: 40vh;
    width: 100%;
    min-width: 20vw;
    max-width: 400px;
    background: url("../assets/class-logo.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.6; 
    position: relative;
}
.image>div{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    color: rgb(92, 92, 92);

}
</style>