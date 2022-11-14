<template>
<div>
    <NavbarActive />
    <div class="container">
        <ul class="list-group container tab-adjuster">
        <li class="mb-4 bg-light p-2"><router-link to="/teacher/dashboard/course/lesson" class="text-reset">A simple default list group item</router-link></li>
        <li class="mb-4 bg-light p-2">A simple default list group item</li>
        <li class="mb-4 bg-light p-2">A simple default list group item</li>
        <li class="mb-4 bg-light p-2">A simple default list group item</li>
    </ul>
    </div>
    
</div>
</template>

<script>

import NavbarActive from './NavbarActive.vue'
export default {
    name:'Course',
    components:{
        NavbarActive,
    }
}

</script>

<style>

</style>