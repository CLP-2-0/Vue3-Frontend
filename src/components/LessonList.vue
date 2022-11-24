<template>
  <div class="container tab-adjuster">
     <div style="margin-top:30px">
            <table class="table table-hover">
               <!-- <thead>
                <tr>
                    <th>Title</th>
                    <th></th>
                </tr>
                </thead> -->
                <tbody>
                <tr v-for="lesson in lessons" :key="lesson.id" class="m-4">
                    <td>
                        <router-link :to="{ name:'Lesson', params: {id:lesson.id} }">
                           <div class="text-dark m-3">Lesson {{lesson.id}}: {{lesson.title}} </div> 
                        </router-link>
                        
                    </td>
                    
                </tr>
                
                </tbody>
            </table>
            </div>
  </div>
</template>

<script>
import LessonApis from "@/apis/LessonApis";

export default {
    name:'Lesson List',
    components:{
    },
    data(){
        return{ 
            lessons:[],
        }
    },
    methods: {
        async getLessons() {
            const res = await LessonApis.getLessons()
            this.lessons = res.data
            console.log("this from list",res.data)
            // console.log("lessons res:", this.lessons)
        },
    },
    mounted() {
    this.getLessons();
  },
}
</script>

<style>

</style>