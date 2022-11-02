<template>
    <nav class="navbar navbar-dark bg-dark ">
        <div class="container-fluid m-2">
            <router-link to="/">Home</router-link>    
            <div class="nav-link"><router-link to="/signup">Signup</router-link></div>
        </div>
    </nav>
</template>

<script>
export default {
}
</script>

<style>
    div>a{
        color: rgb(255, 255, 255);
        text-decoration: none;
        text-transform: uppercase
    }
    nav{
        height: 7vh;
        min-height: 60px; 
    }
</style>