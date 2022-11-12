<template>
    <div>
        
        
    </div>
</template>

<script>
import LessonApis from "@/apis/LessonApis"
export default {
    name:'Lesson List',
    components:{
    },
    methods: {
        async getOneLesson() {
            const res = await LessonApis.getOneLesson()
            console.log(res)
        }
    },
    mounted() {
    this.getOneLesson();
  },
}
</script>

<style>

</style>