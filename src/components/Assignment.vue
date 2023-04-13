<template>
	<div
		v-if="questions.length == 0"
		class="d-flex justify-content-center alert alert-secondary mt-3"
	>
		{{ statusMessage }}
	</div>

	<div v-else class="row d-flex justify-content-around">
		<div class="background-content">
			{{ exam ? "Exam's questions:" : "Assignment's questions:" }}
		</div>
		<div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 question-wrp">
			<div class="d-flex flex-column align-items-center align-items-sm-center px-3 pt-2 text-white">
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
					<h5 class="card-title">Question: ({{ point }} points)</h5>
					<div v-html="question"></div>
					<div v-if="isAdminOrTeacher">
						<h5>Answer:</h5>
						<div v-html="answer_s"></div>
					</div>

					<div v-if="!isAdmin" class="form-group" style="margin-bottom: 5%">
						<button
							class="btn btn-primary btn-custom"
							data-bs-toggle="collapse"
							data-bs-target="#collapseAnswer"
							aria-expanded="false"
							aria-controls="collapseAnswer"
						>
							+ Answer
						</button>
						<div class="collapse" id="collapseAnswer">
							<label for="exampleFormControlTextarea1">Answer: </label>
							<select
								class="form-select"
								aria-label="Default select example"
								style="width: 20%"
								v-model="selected"
							>
								<option selected disabled>Select Answer Type</option>
								<option :value="['q1_' + this.curr]" selected>Text</option>
								<option :value="['q2_' + this.curr]">Audio</option>
							</select>
							<textarea
								v-if="selected == 'q1_' + this.curr"
								class="form-control mt-2"
								id="text_answer"
								rows="3"
								placeholder="Type your answer here..."
								v-model="answer"
							></textarea>
							<div v-if="selected == 'q2_' + this.curr">
								<Audio @answer-update="audioUpdate($event)" />
							</div>
							<button class="btn btn-success btn-custom create" @click="saveAnswer()">
								Submit
							</button>
						</div>
					</div>
				</div>
				<div class="">
					<AnswerList :key="updateAnswer" :idx="idx" />
				</div>

				<div v-if="!isAdmin" class="my-2" id="foot">This is the end of answers.</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HomeworkApis from '@/apis/HomeworkApis';
	import Audio from './Audio.vue';
	import AnswerList from './AnswerList.vue';
	import LessonApis from '@/apis/LessonApis';
	export default {
		props: ['lessonIdx', 'sid', 'exam'],
		components: {
			Audio,
			AnswerList,
		},
		data() {
			return {
				questions: [],
				selected: '',
				curr: 0,
				num: 0,
				question: '',
				point: 0,
				answer_s: '',
				idx: 0,
				updateAnswer: 0,
				userRole: localStorage.getItem('user_role'),
				answer: '',
				statusMessage: 'There are no assignment at the moment',
			};
		},
		methods: {
			async getAssignment() {
				console.log('get assignment...');
				let res = 0;
				if (this.userRole != 'admin') {
					if (this.exam) {
						res = await LessonApis.getLessonById(this.lessonIdx);
						console.log(res);
						this.questions = res.data.exam.questionList;
					} else {
						res = await HomeworkApis.getHomeworkBySection(this.lessonIdx, this.sid).then((res) => {
							if (res == undefined) {
								this.statusMessage = 'No assignment created. Please create one!';
							} else {
								this.questions = res.data.questionList;
							}
						});
					}
				} else if (this.userRole == 'admin') {
					res = await LessonApis.getLessonById(this.lessonIdx);
					console.log(res);
					if (this.exam) {
						this.questions = res.data.exam.questionList;
					} else {
						this.questions = res.data.predefined.questionList;
					}
					console.log(this.questions);
				}
				if (this.questions.length != 0) {
					this.question = this.questions[0].question.question;
					this.point = this.questions[0].point;
					this.answer_s = this.questions[0].question.answer;
					this.idx = this.questions[0].id;
				}

				this.updateAnswer++;
			},
			chooseQuestion(question, num) {
				this.curr = num;
				this.num = num;
				this.question = question.question.question;
				this.answer_s = question.question.answer;
				console.log(this.answer_s);
				this.point = question.point;
				this.idx = question.id;
				this.updateAnswer++;
				console.log('q', this.idx);
			},
			async saveAnswer() {
				let username = localStorage.getItem('user_name');
				let type = this.selected[0].split('_')[0].slice(1) == 1 ? 'text' : 'audio';
				let answer = {};
				let foot = document.getElementById('foot');
				if (type == 'text') {
					answer = {
						type: 'text',
						key: this.answer,
					};
					await HomeworkApis.saveAnswerToAQuestion(username, this.idx, answer).then(() => {
						this.answer = '';
						this.updateAnswer++;
						console.log(this.updateAnswer);
						foot.scrollIntoView({ behavior: 'smooth' });
					});
				} else if (type == 'audio') {
					var reader = new FileReader();
					var base64data;
					var qId = this.idx;
					reader.readAsDataURL(this.answer);

					reader.onloadend = async function () {
						base64data = reader.result;
						console.log(base64data);
						answer = {
							type: 'audio',
							key: base64data,
						};

						await HomeworkApis.saveAnswerToAQuestion(username, qId, answer);
						this.updateAnswer++;
						console.log(this.updateAnswer);
						foot.scrollIntoView({ behavior: 'smooth' });
					}.bind(this);
				}
			},
			audioUpdate(key) {
				this.answer = key;
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
		},
		async mounted() {
			console.log(this.userRole);
			this.getAssignment();
		},
	};
</script>

<style></style>
