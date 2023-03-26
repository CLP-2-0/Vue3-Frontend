<template>
  <div v-if=" this.type=='exam'">
  <div>
    <div v-if="isStudent && !started">
    <p v-if="startTime == ''">{{ examStatus }}</p>
    <div v-else>
    <p>The exam will begin at  {{ startTime }} on {{ day }}. The length of this exam is {{ length }} hours.</p>
    <p>Once you are ready, click "Start Exam" button to start taking the exam. </p> 
    <p>  You can go back to previous question to re-do it. When you complete all questions, click "Submit" button to submit your work!
    </p>
    <button class="btn btn-outline-primary" id="startBtn" @click="startExam">Start Exam</button>
    <p>{{ closed }}</p>
  </div>
    </div>
	<div>

		<ExamSubmission
        v-if="isTeacher || isAdmin || started"
        :lessonIdx="this.$route.params.id"
        :sid="this.$route.params.sid"
        :key="update"
        :exam="true"
        :time="time"
      />
	</div>
    
    <hr />
    <div v-if="isTeacher && this.type == 'exam'">
    <h4>Exam Submission List</h4>
    <div>{{submissionStatus}}</div>
    <div v-for="(submission, i) in submissions" >
      
      <div class="card p-2"
      type="button"
      data-bs-toggle="collapse"
      :data-bs-target="'#collapseSubmission' + i"
      aria-expanded="false"
      aria-controls="collapseHWCreation"
    >
     <h6>Exam {{this.$route.params.id}}: {{ submission[0].student }}</h6>
    </div>
    <div class="collapse bg-light p-3" :id="['collapseSubmission' + i]" >
      <div v-for="(a, idx) in submission">
        <h6>Question {{ idx+1 }}:</h6>
        <form class="form-inline" ref="forGrade" :id="['RowA_' + idx]" >
								<div class="form-group mb-2" style="width: 7%">
									<label for="inputGrade">Grade</label>
									<input
										type="text"
										class="form-control"
										:id="['inputGrade_' + idx]"
                    v-model.number="a.grade"
										@change="addToTotal($event)"
									/>
								</div>
							</form>
        <h6>Answer:</h6>
        <p v-if="a.answer.type == 'text'">{{ a.answer.key }}</p>
              <div v-else>
                <audio controls :id="['result_' +i]">
                <source :src="['https://drive.google.com/uc?export=download&id='+ a.answer.key]" type="audio/mp3">
                Your browser does not support the audio element.
              </audio>
              </div>
              <hr>
      </div>
      <button class="btn btn-success" @click="grade(submission, i)">Done</button>

      <h5>Total: {{ gradeMap[submission[0].student] }}</h5>
      <p>{{ loading }}</p>
    </div>
    </div>
  </div>
</div>
</div>
<div v-if="this.type=='assignment'">
  <Assignment 
      :lessonIdx="this.$route.params.id"
      :sid="this.$route.params.sid" 
      :key="update" />
</div>
<hr />
    <QuestionCreation
      v-if="isAdmin || isTeacher"
      :lessonIdx="this.$route.params.id"
      :sid="this.$route.params.sid"
      :type=type
      @exam-update="examUpdate($event)"
    />
</template>

<script>
import QuestionCreation from "./QuestionCreation.vue";
import ExamSubmission from "../ExamSubmission.vue";
import HomeworkApis from "../../apis/HomeworkApis";
import Assignment from "../Assignment.vue";

export default {
  props: ["type"],
  data() {
    return {
    userRole: localStorage.getItem("user_role"),
	  picked: new Date(),
	  clearable: true,
	  startTime: '',
	  day: '',
    submissions: [],
    total: 0,
    gradeMap: {},
    loading: '',
    started: false,
    time: '',
    closed: '',
    length: '',
    update: 0,
    examStatus: "Loading...",
    ready: '',
    submissionStatus: "Loading..."
    };
  },
  name: "Exam",
  components: {
    QuestionCreation,
    ExamSubmission,
    Assignment
  },

  methods: {

	clearDate() {
		this.picked = ''
		this.startTime = ''
		this.day = ''
	},
	async getExam() {
		const res = await HomeworkApis.getExamBySection(this.$route.params.sid, this.$route.params.id).then((res) => {
      console.log(res)
      if(res == undefined) {
        this.examStatus = "No exam available."
      } else {
        if(res.data.submissions == 0) {
          this.submissionStatus = "Submission List is empty!"
        } else {
          this.submissionStatus = ''
        }
        this.examContent = res.data.exam.questionList
		let gradeJson = res.data.gradeMap
    this.gradeMap = JSON.parse(gradeJson);
    // console.log(gradeMap["thimoe14"])
		this.startTime = res.data.startTime
		this.day = new Date(res.data.startDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
    this.submissions = res.data.submissions
    this.loading = ''
    this.length = res.data.length
      }
    })
    
    
    const now = new Date().getTime()
    const time1 = this.startTime;
    const time2 = this.length;

    this.ready = this.day + " " + time1

    // Convert time1 to minutes
    const [hours1, minutes1] = time1.split(":").map(Number);
    const totalMinutes1 = hours1 * 60 + minutes1;

    // Convert time2 to minutes
    const [hours2, minutes2] = time2.split(":").map(Number);
    const totalMinutes2 = hours2 * 60 + minutes2;

    // Add the minutes together
    const totalMinutes = totalMinutes1 + totalMinutes2;

    // Convert the result back to "hh:mm" format
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const result = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    this.time = this.day + " " + result
    console.log("time", this.time)
    let timer = new Date(this.time).getTime()

    if(timer - now < 0) {
      this.closed = "This exam is closed."
      document.getElementById("startBtn").disabled = true
    }

	},
  async grade(submission, i) {
    this.loading = 'loading...'
    await HomeworkApis.gradeExamSubmission(this.$route.params.sid,this.$route.params.id, submission, i).then(async () => {
      this.getExam()
    })
  },
  startExam() {
    let diff = new Date().getTime() - new Date(this.ready).getTime()
    if(diff > 0) {
    this.started = true
    } else {
      this.closed = "The exam is not opened yet."
    }
    console.log(new Date(this.ready));
  },
  examUpdate(update) {
    this.update += update
  }
  },
  mounted() {
	this.getExam()
  console.log(this.type)
  },
  computed: {
    isAdmin() {
      return this.userRole === "admin";
    },
	isTeacher() {
		return this.userRole === "teacher"
	},
	isStudent() {
		return this.userRole === 'student'
	}
  },
};
</script>
