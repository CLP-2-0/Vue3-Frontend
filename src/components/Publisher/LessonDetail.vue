<template>
    <div>
        <NavbarActive />
        <div class="container">
            <!-- Testing current location. Erase it when fisnih ********************************************* -->
            <h4><span class='text-success'>//testing where we are</span> This is <span class='text-danger'>lesson {{ id }} </span></h4>
            <br/><br/>
            <!-- Testing current location. Erase it when fisnih *********************************************-->
            <BookEditor />
        </div>
       
    </div>

   
</template>

<script>
import NavbarActive from '../NavbarActive.vue'
import LessonList from './LessonList.vue'
import BookEditor from './BookEditor.vue'
export default {
    name: "Lesson Detail",
    components:{
        NavbarActive,
        LessonList,
        BookEditor,
    },
    data() {
         return {
            id: this.$route.params.id,
         };
        }
}
</script>

<style>

</style>