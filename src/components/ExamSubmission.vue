<template>
	<div
		v-if="questions.length == 0"
		class="d-flex justify-content-center alert alert-secondary mt-3"
	>
		{{ statusMessage }}
	</div>
	<div v-else>
		<p v-if="isTeacher" class="background-content">
			The exam will start at {{ startTime }} on {{ day }}
		</p>
		<p v-if="isStudent && !stop" id="time">Time remaining: {{ timer }}</p>
		<div v-if="!stop" class="row">
			<div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 question-wrp">
				<div
					class="d-flex flex-column align-items-center align-items-sm-center px-3 pt-2 text-white"
				>
					<ul
						class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
						id="menu"
					>
						<li class="nav-item justify-content-center text-center">
							<span
								type="button"
								class="link btn btn-custom question"
								v-for="(question, idx) in questions"
								:key="question.id"
								@click="chooseQuestion(question, idx)"
							>
								Question {{ idx + 1 }}
							</span>
						</li>
					</ul>

					<hr />
				</div>
			</div>
			<div class="col-auto col-md-9 col-xl-10 p-0">
				<div class="card-body ml-5 m-auto" style="width: 90%" v-if="curr == num">
					<div class="card-box p-4 my-3">
						<h5 class="card-title">Question: ({{ question.point }} points)</h5>
						<div v-html="question.question"></div>
						<div v-if="isAdminOrTeacher">
							<h5>Answer:</h5>
							<!-- <div v-html="question"></div> -->
							<!-- <div>{{ question }}</div> -->
						</div>

						<div v-if="!isAdmin" class="form-group" style="margin-bottom: 5%">
							<div>
								<label for="exampleFormControlTextarea1">Choose answer type: </label>
								<select
									class="form-select"
									aria-label="Default select example"
									style="width: 15%"
									v-model="selected"
								>
									<option selected disabled>Select Answer Type</option>
									<option :value="['q1_' + this.curr]" selected>Text</option>
									<option :value="['q2_' + this.curr]">Audio</option>
								</select>
								<textarea
									v-if="selected == 'q1_' + this.curr"
									class="form-control"
									:id="['text_answer_' + this.curr]"
									rows="3"
									placeholder="Type your answer here..."
									v-model="question.answer"
									@change="saveAnswer()"
								></textarea>
								<div v-if="selected == 'q2_' + this.curr">
									<Audio @answer-update="audioUpdate($event)" />
								</div>
								<div>
									<h5>Answer:</h5>
									<div
										class="card px-3 pt-2 pb-4"
										v-if="this.eAnswers[this.curr] && this.eAnswers[this.curr].type == 'text'"
									>
										{{ eAnswers[this.curr].key }}
									</div>
									<audio
										v-if="this.eAnswers[this.curr] && this.eAnswers[this.curr].type == 'audio'"
										controls
										:src="this.eAnswers[this.curr].key"
										id="result"
									></audio>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					v-if="isStudent && !stop"
					style="display: flex; justify-content: center"
					:hidden="!submit"
				>
					<button
						class="btn btn-success btn-custom create"
						id="submitBtn"
						data-bs-toggle="modal"
						data-bs-target="#submitModal"
					>
						Submit
					</button>
				</div>
			</div>

			<div
				class="modal fade"
				id="submitModal"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body">Are you sure you want to submit this exam?</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-primary btn-custom"
								data-bs-dismiss="modal"
								@click="submitExam"
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isStudent && stop">You submitted the exam!</div>
		<p v-if="isStudent">{{ message }}</p>
	</div>
</template>

<script>
	import HomeworkApis from '@/apis/HomeworkApis';
	import Audio from './Audio.vue';
	import LessonApis from '@/apis/LessonApis';

	export default {
		props: ['lessonIdx', 'sid', 'exam', 'time', 'examContent'],
		emits: ['questions-update'],
		components: {
			Audio,
		},
		data() {
			return {
				questions: [],
				selected: '',
				curr: 0,
				num: 0,
				question: '',
				answer_s: '',
				idx: 0,
				updateAnswer: 0,
				userRole: localStorage.getItem('user_role'),
				answer: '',
				eAnswers: [],
				timer: '',
				message: '',
				stop: false,
				startTime: '',
				day: new Date(),
				statusMessage: 'Loading...',
				submit: false,
			};
		},
		methods: {
			async getAssignment() {
				console.log('get assignment...');
				let res = 0;
				if (this.userRole != 'admin') {
					if (this.exam) {
						const res = await HomeworkApis.getExamBySection(
							this.$route.params.sid,
							this.$route.params.id
						).then((res) => {
							if (res == undefined) {
								this.statusMessage = 'No exam created. Please create one!';
							} else {
								this.questions = res.data.exam.questionList;
								this.startTime = res.data.startTime;
								this.day = new Date(res.data.startDate).toLocaleDateString('en-US', {
									month: 'numeric',
									day: 'numeric',
									year: 'numeric',
								});
								this.$emit('questions-update', this.questions);
								console.log('ok');
							}
						});
						// this.questions = res.data.exam.questionList
						// console.log(res.data)
						// this.startTime = res.data.startTime
						// this.day = new Date(res.data.startDate).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
					} else {
						res = await HomeworkApis.getHomeworkBySection(this.lessonIdx, this.sid);
						this.questions = res.data.questionList;
					}
				} else if (this.userRole == 'admin') {
					res = await LessonApis.getLessonById(this.lessonIdx);
					console.log(res.data);
					if (this.exam) {
						this.questions = res.data.exam.questionList;
					} else {
						this.questions = res.data.predefined.questionList;
					}
				}

				this.question = {
					question: this.questions[0].question.question,
					point: this.questions[0].point,
					id: this.num,
				};
				this.updateAnswer++;
			},
			chooseQuestion(question, num) {
				if (num + 1 == this.questions.length) this.submit = true;
				else this.submit = false;
				console.log(num, this.questions.length);
				this.curr = num;
				this.num = num;
				this.question = {
					question: question.question.question,
					point: question.point,
					id: this.num,
				};
				this.updateAnswer++;
			},
			async saveAnswer() {
				let type = this.selected[0].split('_')[0].slice(1) == 1 ? 'text' : 'audio';
				let answer = {};
				if (type == 'text') {
					answer = {
						type: 'text',
						key: this.question.answer,
					};
					this.eAnswers.splice(this.question.id, 1, answer);
					console.log(this.eAnswers);
				} else if (type == 'audio') {
					var reader = new FileReader();
					var base64data;
					var answerPromise = new Promise((resolve, reject) => {
						// create a Promise
						reader.onloadend = function () {
							base64data = reader.result;
							var answer = {
								type: 'audio',
								key: base64data,
							};
							resolve(answer); // resolve the Promise with the answer value
						};
					});
					reader.readAsDataURL(this.question.answer);

					answerPromise.then((answer) => {
						// wait for the Promise to resolve
						this.updateAnswer++;
						console.log(answer);
						this.eAnswers.splice(this.question.id, 1, answer);
						console.log(this.eAnswers);
					});
				}
			},
			audioUpdate(key) {
				this.question.answer = key;
				this.saveAnswer();
			},
			async submitExam() {
				let username = localStorage.getItem('user_name');
				console.log(username, this.eAnswers);
				let examAnswer = {};
				let examAnswers = [];
				console.log(this.eAnswers.length);
				this.eAnswers.forEach((a) => {
					examAnswer = {
						answer: a,
						student: username,
					};
					examAnswers.push(examAnswer);
				});
				this.stop = true;
				await HomeworkApis.saveExamSubmission(this.sid, this.lessonIdx, examAnswers);

				const tabs = document.querySelectorAll('.nav-link');
				tabs.forEach((tab) => {
					tab.setAttribute('disabled', false);
				});
			},
			updateTimer(time) {
				// Set the date we're counting down to
				const countDownDate = new Date(time).getTime();
				// Get today's date and time
				const now = new Date().getTime();

				// Find the distance between now and the count down date
				const distance = countDownDate - now;

				// Time calculations for days, hours, minutes and seconds
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				// Format the time display
				const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
					seconds < 10 ? '0' + seconds : seconds
				}`;

				// Update the timer value
				if (distance < 0) {
					this.timer = "TIME's UP!";
					this.message = "TIME's UP! Your exam will be auto-submitted in 5 seconds.";
					// document.getElementById("submitBtn").disabled = true
					setInterval(() => {}, 5000);
				} else {
					this.timer = formattedTime;
				}
			},
		},
		computed: {
			isAdmin() {
				return this.userRole === 'admin';
			},
			isExam() {
				return this.exam === true;
			},
			isAdminOrTeacher() {
				return this.userRole === 'admin' || this.userRole === 'teacher';
			},
			isTeacher() {
				return this.userRole === 'teacher';
			},
			isStudent() {
				return this.userRole === 'student';
			},
		},
		async mounted() {
			console.log(this.userRole);
			this.getAssignment();
			setInterval(() => {
				this.updateTimer(this.time);
			}, 1000);
		},
	};
</script>

<style></style>
