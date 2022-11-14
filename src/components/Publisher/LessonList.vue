<template>
    <div>
        
        <div style="margin-top:30px">
            <table class="table table-hover">
                <!-- <thead>
                <tr>
                    <th>Title</th>
                    <th></th>
                </tr>
                </thead> -->
                <tbody>
                <tr v-for="lesson in lessons" :key="lesson.id" >
                    <td >
                        <router-link :to="{ name:'Lesson Detail', params: {id:lesson.id} }">
                           <div class="text-dark ">Lesson {{lesson.id}}: {{lesson.title}} </div> 
                        </router-link>
                        
                    </td>
                    <td class="text-right"><div >
                        <button class="btn btn-light mx-3 ">Edit</button>
                        <button class="btn btn-light">Delete</button>
                    </div>
                    </td>
                    
                </tr>
                
                </tbody>
            </table>
            </div>
            <!-- <p>{{lessons}}</p> -->
        
    </div>
</template>

<script>
import LessonApis from "@/apis/LessonApis"
export default {
    name:'Lesson List',
    components:{
    },
    data(){
        return{ 
            lessons:[]
        }
    },
    methods: {
        async getLessons() {
            const res = await LessonApis.getLessons()
            this.lessons = res.data
            // console.log("this from list",res.data)
            // console.log("lessons res:", this.lessons)
        }
    },
    mounted() {
    this.getLessons();
  },
}
</script>

<style>
    .text-right{
        text-align: right;
    }
</style>