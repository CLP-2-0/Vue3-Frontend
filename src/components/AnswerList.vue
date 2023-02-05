<template>
    <div id="answerSection" :key="updateAnswer">
        <div id="allAnswers"  v-for="(answer, i) in this.answerList" :key="i">
          <div class="card">
            <div class="card-body" :id="['Ans_'+i]">
              <h5>{{ answer.user }}</h5>
              <p>{{ answer.answer }}</p>
              <button class="btn btn-outline-success">Comment</button>
            </div>
          </div>
        </div>
      </div>    
</template>
<script>
import HomeworkApis from "@/apis/HomeworkApis";
export default {
  props: ["idx"],
  components: {
    Audio,
  },
  data() {
    return {
      answerList: []
      
    };
  },
  methods: {
    async getAnswers(idx) {
      console.log("id",idx)
      const res = await HomeworkApis.getAnswersByQuestion(idx)
      this.answerList = []
      for(let key of res.data){
        key = key.split("_")
        this.answerList.push({
          user: key[0], 
          answer: key[2]
        })
      }
      

    }
  },
  async mounted() {
    this.getAnswers(this.idx)
    console.log(this.idx)
  },
};
</script>