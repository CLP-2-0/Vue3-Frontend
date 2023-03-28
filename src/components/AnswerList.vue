<template>

    <div v-if="isStudent && !show">
    <p>Submit your answer to see other classmates' responses</p>
    </div>
    <div id="answerSection" :key="updateAnswer" :hidden="!show">
      
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
                <source :src="[answer.key]" type="audio/mp3">
                Your browser does not support the audio element.
              </audio>
              </div>
              <button class="btn btn-outline-success"
              data-bs-toggle="collapse"
              data-bs-target="#collapseComment"
              aria-expanded="false"
              aria-controls="collapseComment"
              @click="showComments(answer.id)"
            >Comment</button>
            
            <div id="collapseComment" class="collapse" style="margin-top: 5%;">
              <div id="allComments"  v-for="(comment, i) in this.commentList" :key="i" style="margin-bottom: 2%;">
                <div class="card bg-light">
            <div class="card-body" :id="['Ans_'+i]">
              <div id="user-info" style="display: flex; justify-content: space-between;">
                <h5>{{ comment.username }}</h5>
                <p>{{ comment.timestamp }}</p>
              </div>
              
              <p >{{ comment.comment }}</p>
              </div>
              </div>
              </div>
              <textarea
              class="form-control"
              id="text_answer"
              rows="3"
              placeholder="Type your comment here..."
              v-model="comment"
            ></textarea>
              <button class="btn btn-success" @click="saveComment(answer.id)">Submit</button>
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
      comment: '',
      commentList: [],
      show: false
    };
  },
  methods: {
    async getAnswers(idx) {
      const res = await HomeworkApis.getAnswersByQuestion(idx)
      this.answerList = []
      this.userList = []
      console.log(res.data)
      for(let ans of res.data){
        let userInfo = ans.username.split("_")
        let timestamp = new Date(parseInt(userInfo[0]))
        let username = userInfo[1]
        if(username == localStorage.getItem('user_name')){
          this.show = true
        }
        this.userList.push(username)
        let answer = {
          timestamp: timestamp.toLocaleString(),
          username: username,
          key: ans.key,
          type: ans.type,
          id: ans.id
        }
        this.answerList.push(answer)
      }

      

    },

    async saveComment(id) {
      console.log(this.comment, id)
      let username = localStorage.getItem("user_name");
      await HomeworkApis.saveCommentToAnAnswer(
          username,
          id,
          this.comment
        ).then(() => {
          this.commentList = []
          this.showComments(id)
          this.comment = ''
        })
    },

    async showComments(id) {
      if(this.commentList.length == 0) {
        const response = await HomeworkApis.getCommentsByAnswer(id)
      console.log(response.data)
      for(let c of response.data) {
        let userInfo = c.split("_")
        let timestamp = new Date(parseInt(userInfo[0]))
        let username = userInfo[1]
        let content = c.substring(userInfo[0].length + username.length + 2)
        let comment = {
          timestamp: timestamp.toLocaleString(),
          username: username,
          comment: content
        }
        console.log(comment)
        this.commentList.push(comment)
      }
      }
      
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
      },
      isStudent() {
        return this.userRole === 'student'
      }
		},
};
</script>