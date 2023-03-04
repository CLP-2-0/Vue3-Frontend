<template>
    <button class="btn btn-outline-primary" v-if="isTeacher" @click="grade">Grade</button>

    <div id="answerSection" :key="updateAnswer">
      
      <!-- <input
				type="text"
				class="form-control form-control-m mb-3"
				v-model="searchTerm"
				placeholder="Search for a student "
			/> -->
        <div id="allAnswers"  v-for="(answer, i) in this.answerList" :key="i">
          <div class="card">
            <div class="card-body" :id="['Ans_'+i]">
              <div id="user-info" style="display: flex; justify-content: space-between;">
                <h5>{{ answer.username }}</h5>
                <p>{{ answer.timestamp }}</p>
              </div>
              
              <p v-if="answer.type == 'text'">{{ answer.key }}</p>
              <div v-else>
                <audio controls :id="['result_' +i]">
                <source :src="['https://drive.google.com/uc?export=download&id='+ answer.key]" type="audio/mp3">
                Your browser does not support the audio element.
              </audio>
              </div>
              <button class="btn btn-outline-success">Comment</button>

              <div :id="['grade_'+i]" :hidden="!this.show">
                <input />

              </div>
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
      answerList: [],
      userList: [],
      searchTerm: '',
      userRole: localStorage.getItem('user_role'),
      show: false
    };
  },
  methods: {
    async getAnswers(idx) {
      console.log("id",idx)
      const res = await HomeworkApis.getAnswersByQuestion(idx)
      this.answerList = []
      this.userList = []
      for(let ans of res.data){
        let userInfo = ans.username.split("_")
        let timestamp = new Date(parseInt(userInfo[0]))
        let username = userInfo[1]
        this.userList.push(username)
        let answer = {
          timestamp: timestamp.toLocaleString(),
          username: username,
          key: ans.key,
          type: ans.type
        }
        console.log(answer.key)
        this.answerList.push(answer)
      }
      

    },
    grade() {
      this.show = !this.show
    }
  },
  async mounted() {
    if(this.userRole != 'admin') this.getAnswers(this.idx)
    console.log(this.idx)
  },
  computed: {
			sortedAndFilteredStudents() {
				const filtered = this.userList.filter((student) => {
					return student.toLowerCase().includes(this.searchTerm.toLowerCase());
				});
				return filtered.sort((a, b) => (a > b ? 1 : -1));
			},
      isTeacher() {
        return this.userRole === 'teacher'
      }
		},
};
</script>