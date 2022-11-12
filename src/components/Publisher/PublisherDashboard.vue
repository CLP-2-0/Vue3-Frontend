<template>
    <div>
        <NavbarActive />
        <div class="container">
            <BookEditor />
        </div>
        <LessonList />
        
    </div>
</template>

<script>
import NavbarActive from '../NavbarActive.vue'
import BookEditor from './BookEditor.vue'
import LessonList from './LessonList.vue';
export default {
    name:'Publisher Dashboard',
    components:{
        NavbarActive,
        BookEditor,
        LessonList
    }
}
</script>

<style>

</style>