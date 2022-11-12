<template>
    <div>
        <NavbarActive />
        <div class="container">
            <!-- <BookEditor /> -->

            <!-- ************************************ -->
            <!-- TESTING call API -->
            <h1>testing</h1>
  
            <div style="margin-top:30px">
            <table class="table table-hover" id="example">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Content</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="lesson in lessons" :key="lesson.id">
                    <td>{{lesson.id}}</td>
                    <td>{{lesson.name}}</td>
                    <td>{{lesson.content}}</td>
                </tr>
                
                </tbody>
            </table>
            </div>
            

            <!-- ********************************** -->

        </div>

       
    </div>
</template>

<script>
import NavbarActive from '../NavbarActive.vue'
// import BookEditor from './BookEditor.vue'

import axios from 'axios';

export default {
    name:'Publisher Dashboard',
    components:{
        NavbarActive,
        // BookEditor,
    },
    // ************************************************************************************************************************
    // test  axios.get("https://jsonplaceholder.typicode.com/users")
    mounted(){
        //API Call
        axios.get("http://localhost:8000/lessons")
            .then((res)=>
            {
                this.lessons = res.data;
            
            })
        },
    data: function() {
            return {
                lessons:[]
            }
        }
     //  ************************************************************************************************************************
}
</script>

<style>

</style>