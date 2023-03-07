<template>
	<div v-if="isTeacher" id="set-exam">
		<h4 class="col-sm-2 col-form-label">Set Exam Time:</h4>
  <Datepicker v-model="picked" :clearable="true"/>

  <input type="time" id="appt" name="appt" v-model="startTime">
  <input type="submit" @click="setExam">
	<button class="btn btn-outline-danger btn-sm" style="margin-left: 2%; margin-top: 0;" @click="clearDate">Cancel</button>

<div v-if="this.day != ''">
	<p>The exam will start at {{ startTime }} on {{ day }}</p>
</div>
	</div>

  <div>
    <div v-if="isStudent && !started">
    <p>The exam will begin at  {{ startTime }} on {{ day }}. The length of this exam is 2:00 hours.</p>
    <p>Once you are ready, click "Start Exam" button to start taking the exam. </p> 
    <p>  You can go back to previous question to re-do it. When you complete all questions, click "Submit" button to submit your work!
    </p>
    <button class="btn btn-outline-primary" id="startBtn" @click="startExam">Start Exam</button>
    <p>{{ closed }}</p>
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
  
	<!-- <div v-if="!isStudent">
		<button
      type="button"
      class="btn btn-success"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExam"
      v-bind:aria-expanded=isStudent
      aria-controls="collapseHWCreation"
    >
      Preview Exam
    </button>
    <div class="collapse" id="collapseExam">
      <Assignment
        :lessonIdx="this.$route.params.id"
        :key="update"
        :exam="true"
      />
    </div>
	</div> -->
    
    <hr />
    <div v-if="isTeacher">
    <h4>Exam Submission List</h4>
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
    <QuestionCreation
      v-if="isAdmin"
      :lessonIdx="this.$route.params.id"
      type="exam"
      @exam-update="examUpdate($event)"
    />
  </div>
</template>

<script>
import QuestionCreation from "./QuestionCreation.vue";
import ExamSubmission from "../ExamSubmission.vue";
import Datepicker from 'vue3-datepicker'
import HomeworkApis from "../../apis/HomeworkApis";

export default {
  props: ["lessonIdx"],
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
    length: '2:00',
    update: 0
    };
  },
  name: "Exam",
  components: {
    QuestionCreation,
    ExamSubmission,
    Datepicker,
  },

  methods: {
	async setExam() {
		this.day = this.picked.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
		let exam = {
			startTime: this.startTime,
			startDate: this.day
		}
		await HomeworkApis.saveExamToSection(this.$route.params.sid, this.$route.params.id, exam)

	},
	clearDate() {
		this.picked = ''
		this.startTime = ''
		this.day = ''
	},
	async getExam() {
		const res = await HomeworkApis.getExamBySection(this.$route.params.sid, this.$route.params.id)
		let gradeJson = res.data.gradeMap
    this.gradeMap = JSON.parse(gradeJson);
    // console.log(gradeMap["thimoe14"])
		this.startTime = res.data.startTime
		this.day = res.data.startDate
    this.submissions = res.data.submissions
    this.loading = ''
    
    const now = new Date().getTime()
    const time1 = this.startTime;
    const time2 = this.length;

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
    this.started = true
  },
  examUpdate(update) {
    this.update += update
  }
  },
  mounted() {
	this.getExam()
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
