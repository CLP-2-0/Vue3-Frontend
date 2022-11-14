<template>
    <div>
        <NavbarActive />
        <div class="container">
            <!-- <BookEditor /> -->

            <!-- ************************************ -->
            <!-- TESTING call API -->
            <h1>testing</h1>
  
            <div style="margin-top:30px">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Content</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="lesson in lessons" :key="lesson.id">
                    <td>{{lesson.id}}</td>
                    <td>{{lesson.title}}</td>
                    <td class="text"><div >
                        <button class="btn btn-light mx-3">Edit</button>
                        <button class="btn btn-light">Delete</button>
                    </div>
                    </td>
                    
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
                this.lessons = res.data.data;
                console.log(res.data.data);
            })
        },
    data() {
            return {
                lessons:[]
            }
        }
     //  ************************************************************************************************************************
}
</script>

<style>
.text{
    text-align: right;
}
</style>