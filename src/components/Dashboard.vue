<template>
    <div>
        <NavbarActive />
        <CourseList />
    </div>
</template>

<script>
import NavbarActive from './NavbarActive.vue'
import CourseList from './CourseList.vue'
export default {
    name:'Dashboard',
    components:{
        NavbarActive,
        CourseList,
    }
}
</script>

<style>

</style>