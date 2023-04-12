<template>
	<div class="">
		<!-- Either choose to create new question to question bank or create a new assignment/exam -->
		<div class="btn-group" role="group" aria-label="Basic example">
			<button
				type="button"
				class="btn btn-primary btn-custom"
				data-bs-toggle="collapse"
				data-bs-target="#collapseQCreation"
				aria-expanded="false"
				aria-controls="collapseQCreation"
				@click="addShow()"
			>
				{{ newBtn }}
			</button>
			<button
				v-if="isAdmin || isTeacher"
				type="button"
				class="btn btn-outline-success btn-custom create"
				@click="creationShow()"
			>
				{{ createBtn }}
			</button>
		</div>

		<!-- Set the time and length for the exam -->
		<div v-if="isExam && isTeacher" class="form-group row mt-2" :hidden="!show">
			<div class="form-group row">
				<h4 for="staticEmail" class="col-sm-2 col-form-label">Set Exam Length:</h4>
				<div class="col-sm-10">
					<input id="appt" v-model="examLength" placeholder="HH : MM" />
				</div>
			</div>

			<div id="set-exam">
				<h4 class="col-sm-2 col-form-label">Set Exam Time:</h4>
				<Datepicker v-model="picked" :clearable="true" />

				<input type="time" id="appt" name="appt" v-model="startTime" />

				<div v-if="this.day != ''">The exam is created.</div>
				<div v-else>
					<p>Choose the time and date you want the exam to be opened.</p>
				</div>
			</div>
		</div>

		<!-- QuillVue Section: Create new question and answer  -->
		<div class="collapse" id="collapseQCreation">
			<div class="q-creation">
				<label class="col-sm-1 col-form-label">Question:</label>
				<quill-editor
					v-model:content="question"
					contentType="html"
					ref="quillEditor"
					:options="editorOption"
				/>
				<label class="col-sm-3 col-form-label">Sample Answer:</label>
				<quill-editor
					v-model:content="answer"
					contentType="html"
					ref="quillEditor"
					:options="editorOption"
				/>
				<div class="btn-container">
					<button
						type="button"
						class="btn btn-outline-success"
						:data-bs-target="'#createSuccessNoti1' + type"
						:aria-controls="'createSuccessNoti1' + type"
						data-bs-toggle="modal"
						@click="
							() => {
								disable = false;
								message = '';
							}
						"
					>
						+ Add
					</button>
					<div
						class="modal fade"
						:id="['createSuccessNoti1' + type]"
						tabindex="-1"
						aria-labelledby="exampleModalLabel1"
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
								<div class="modal-body">
									<h5>Are you sure you want to create this question?</h5>
								</div>
								<div class="modal-footer">
									<p>{{ message }}</p>
									<button type="button" class="btn btn-primary" @click="save" :disabled="disable">
										Create
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Show question bank and able to assign new assignment/ exam  -->
	<div class="container tab-adjuster" :hidden="!show">
		<div class="mt-4 mb-2">{{ listField }}</div>
		<div>
			<div v-if="isTeacher" class="form-check">
				<input
					class="form-check-input"
					type="checkbox"
					value=""
					v-model="use"
					id="flexCheckDefault"
					@change="($event) => usePredefined()"
				/>
				<label class="form-check-label" for="flexCheckDefault"> Use predefined questions </label>
			</div>
		</div>
		<div class="row">
			<div class="question-bank col">
				<div
					class="card row"
					style="margin-bottom: 5px; display: flex; padding: 5px; flex-direction: row"
					v-for="(question, idx) in chosenQuestions"
					:key="question.id"
				>
					<input
						:hidden="!show"
						ref="forCheck"
						type="checkbox"
						style="width: 2%"
						:id="['Check_' + idx]"
						v-model="question.checked"
						:value="question.question"
						@change="check($event, idx, this.type)"
					/>
					<div class="card-body" style="width: 85%">
						<h5 class="card-title">Question:</h5>
						<h6 class="card-subtitle mb-2 text-muted" v-html="question.question.question"></h6>
						<h5>Answer:</h5>
						<p class="card-text" v-html="question.question.answer"></p>
					</div>
					<form class="form-inline" ref="forGrade" :id="['Row_' + idx + type]" hidden>
						<div class="form-group mx-sm-3 mb-2" style="width: 7%">
							<label for="inputGrade">Grade</label>
							<input type="text" class="form-control" :id="['inputGrade_' + idx + type]" />
						</div>
					</form>
				</div>
			</div>
		</div>
		<div style="display: flex; justify-content: center; flex-direction: row" :hidden="!show">
			<button
				type="button"
				class="btn btn-success col-sm-3"
				:data-bs-target="'#createSuccessNoti' + type"
				:aria-controls="'createSuccessNoti' + type"
				data-bs-toggle="modal"
				@click="countTotal()"
			>
				Create
			</button>
			<div
				class="modal fade"
				:id="['createSuccessNoti' + type]"
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
						<div class="modal-body">
							<h5>Are you sure you want to create this {{ type }}?</h5>
							<div class="form-group row">
								<label for="num" class="col-sm-3 col-form-label">Number of Questions:</label>
								<div class="col-sm-2">
									<input
										type="text"
										class="form-control"
										id="num"
										:value="numOfQuestion"
										disabled
									/>
								</div>
								<label for="total" class="col-sm-2 col-form-label">Total Grade:</label>
								<div class="col-sm-2">
									<input type="text" class="form-control" id="total" :value="total" disabled />
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<p>{{ message }}</p>
							<button type="button" class="btn btn-primary" @click="create" :disabled="disable">
								Create
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { QuillEditor } from '@vueup/vue-quill';
	import '@vueup/vue-quill/dist/vue-quill.snow.css';
	import QuestionApis from '@/apis/QuestionApis';
	import LessonApis from '@/apis/LessonApis';
	import HomeworkApis from '@/apis/HomeworkApis';
	import Datepicker from 'vue3-datepicker';
	export default {
		name: 'Question Creation',
		emits: ['exam-update'],
		components: {
			QuillEditor,
			Datepicker,
		},
		props: ['lessonIdx', 'type', 'sid'],
		data() {
			return {
				lessons: [],
				editorOption: {
					theme: 'snow',
					placeholder: '',
					modules: {
						toolbar: [
							'bold',
							'italic',
							'underline',
							'link',
							'clean',
							{ color: ['red', 'rgb(237, 125, 49)', 'black'] },
							{ background: [] },
							'image',
						],
					},
				},
				question: '',
				answer: '',
				questionsBank: [],
				show: false,
				userRole: localStorage.getItem('user_role'),
				gradedQuestions: [],
				numOfQuestion: 0,
				total: 0,
				examLength: '',
				chosenQuestions: [],
				createBtn: 'Create new ' + this.type,
				listField: 'List of ' + this.type + "'s questions:",
				sectionQBank: [],
				message: '',
				disable: false,
				day: '',
				picked: new Date(),
				startTime: '',
				newBtn: '+ Add Question',
				predefined: [],
				use: false,
			};
		},
		methods: {
			async save() {
				this.message = 'Loading...';
				let question = {};
				question.question = this.question;
				question.answer = this.answer;
				if (this.userRole === 'admin') {
					if (this.type == 'assignment') {
						await QuestionApis.saveQuestion(this.lessonIdx, question).then(() => {
							this.createSuccess();
						});
					} else if (this.type == 'exam') {
						await QuestionApis.saveEQuestion(this.lessonIdx, question).then(() => {
							this.createSuccess();
						});
					}
				} else if (this.userRole === 'teacher') {
					if (this.type == 'assignment') {
						await QuestionApis.saveQuestionToSec(this.lessonIdx, question, this.sid).then(() => {
							this.createSuccess();
						});
					} else if (this.type == 'exam') {
						await QuestionApis.saveEQuestionToSec(this.lessonIdx, question, this.sid).then(() => {
							this.createSuccess();
						});
					}
				}

				this.question = '';
				this.answer = '';
				this.resetForm();
				console.log('reset');
				this.questionsBank = [];
				this.getLessonById();
			},
			resetForm() {
				this.question = '';
				this.answer = '';
			},
			async getLessonById() {
				this.chosenQuestions = [];
				this.getQuestionBank().then(async () => {
					const res = await LessonApis.getLessonById(this.lessonIdx);
					if (this.type == 'assignment') {
						if (this.userRole == 'teacher') {
							this.questionsBank = res.data.questionsBank.concat(this.sectionQBank);
						} else if (this.userRole == 'admin') {
							this.questionsBank = res.data.questionsBank;
							console.log(this.questionsBank);
						}
					} else if (this.type == 'exam') {
						this.questionsBank = res.data.examBank.concat(this.sectionQBank);
					}
					for (let q of this.questionsBank) {
						let question = {
							question: q,
							checked: false,
						};
						this.chosenQuestions.push(question);
					}
				});

				const res = await LessonApis.getLessonById(this.lessonIdx);
				console.log(res);
				if (this.type == 'exam') {
					this.predefined = res.data.exam.questionList;
				} else {
					this.predefined = res.data.predefined.questionList;
				}
			},
			async getQuestionBank() {
				if (this.userRole == 'teacher') {
					if (this.type == 'assignment') {
						const res = await QuestionApis.getQuestionBankByLesson(this.lessonIdx, this.sid);
						this.sectionQBank = res.data;
					} else {
						const res = await QuestionApis.getEQuestionBankByLesson(this.lessonIdx, this.sid);
						this.sectionQBank = res.data;
					}
					console.log(this.sectionQBank);
				}
			},
			creationShow() {
				this.show = !this.show;
				if (!this.show) {
					this.createBtn = 'Create ' + this.type;
				} else {
					this.createBtn = 'Quit';
				}
				this.disable = false;
				this.message = '';
				// this.numOfQuestion = this.questionsBank.length
			},
			async saveExam() {
				if (this.userRole == 'teacher') {
					this.day = this.picked.toLocaleDateString('en-US', {
						month: 'numeric',
						day: 'numeric',
						year: 'numeric',
					});
					this.day = this.day.replaceAll('/', '-');
					await HomeworkApis.saveExamToSection(
						this.$route.params.sid,
						this.$route.params.id,
						this.startTime,
						this.picked,
						this.examLength,
						this.gradedQuestions
					).then(() => {
						for (let idx in this.$refs.forGrade) {
							this.$refs.forGrade[idx].reset();
							document.getElementById('Row_' + idx + this.type).hidden = true;
						}
						this.message = 'Your exam has been created. Scroll up to see the new exam.';
						this.$emit('exam-update', 1);
					});
				} else if (this.userRole == 'admin') {
					await LessonApis.saveExam(this.lessonIdx, this.gradedQuestions).then(() => {
						for (let idx in this.$refs.forGrade) {
							this.$refs.forGrade[idx].reset();
							document.getElementById('Row_' + idx + this.type).hidden = true;
						}
					});
					this.message = 'Your exam has been created. Scroll up to see the new exam.';
					this.$emit('exam-update', 1);
				}

				// await LessonApis.saveExam(this.lessonIdx, this.gradedQuestions, time)
			},
			check(e, idx, type) {
				this.$nextTick(() => {
					if (e.target.checked) {
						console.log('hello');
						document.getElementById('Row_' + idx + type).hidden = false;
						this.numOfQuestion++;
					} else {
						document.getElementById('Row_' + idx + type).hidden = true;
						this.numOfQuestion--;
						let p = parseInt(document.getElementById('inputGrade_' + idx + type).value);
						this.total -= p;
						this.$refs.forGrade[idx].reset();
					}
				});
			},
			countTotal() {
				this.total = 0;
				this.gradedQuestions = [];
				for (let idx in this.chosenQuestions) {
					let q = this.chosenQuestions[idx];
					if (q.checked) {
						let p = parseInt(document.getElementById('inputGrade_' + idx + this.type).value);
						let gradedQuestion = {
							question: q.question,
							point: p,
						};
						this.total += p;
						this.gradedQuestions.push(gradedQuestion);
					}
				}
			},
			async saveAssignment() {
				if (this.userRole == 'teacher') {
					await HomeworkApis.saveHomework(this.lessonIdx, this.gradedQuestions, this.sid).then(
						() => {
							for (let idx in this.$refs.forGrade) {
								this.$refs.forGrade[idx].reset();
								document.getElementById('Row_' + idx + this.type).hidden = true;
							}
							this.message =
								'Your assignment has been created. Scroll up to see the new assignment.';
							this.$emit('exam-update', 1);
						}
					);
				} else if (this.userRole == 'admin') {
					await LessonApis.saveHomework(this.lessonIdx, this.gradedQuestions, this.sid).then(() => {
						for (let idx in this.$refs.forGrade) {
							this.$refs.forGrade[idx].reset();
							document.getElementById('Row_' + idx + this.type).hidden = true;
						}
						this.message = 'Your assignment has been created. Scroll up to see the new assignment.';
						this.$emit('exam-update', 1);
					});
				}
				this.total = 0;
				this.checkedQuestions = [];
				this.update++;
				this.gradedQuestions = [];
			},
			createSuccess() {
				this.message = 'Your new question has been created.';
				this.disable = true;
			},
			create() {
				this.message = 'Loading...';
				this.type === 'assignment' ? this.saveAssignment() : this.saveExam();
				this.disable = true;
			},
			addShow() {
				if (this.newBtn == '+ Add Question') {
					this.newBtn = 'Quit';
				} else {
					this.newBtn = '+ Add Question';
				}
			},
			async usePredefined() {
				this.gradedQuestions = [];
				console.log(this.predefined);
				let pIdx = 0;
				let len = this.predefined.length;
				for (let q of this.questionsBank) {
					let idx = this.questionsBank.indexOf(q);

					if (pIdx < len && q.question == this.predefined[pIdx].question.question) {
						this.chosenQuestions[idx].checked = this.use ? true : false;
						document.getElementById('Row_' + idx + this.type).hidden = this.use ? false : true;
						document.getElementById('inputGrade_' + idx + this.type).value = this.use
							? this.predefined[pIdx].point
							: null;
						if (this.use) {
							let gradedQuestion = {
								question: this.predefined[pIdx].question,
								point: this.predefined[pIdx].point,
							};
							this.gradedQuestions.push(gradedQuestion);
							this.numOfQuestion++;
						} else {
							this.numOfQuestion--;
						}

						// let p = this.predefined[pIdx].point;
						// this.total += p;

						pIdx++;
					}
				}
				// this.numOfQuestion = this.gradedQuestions.length
			},
		},

		mounted() {
			this.getLessonById();
		},
		computed: {
			isAdmin() {
				return this.userRole === 'admin';
			},
			isExam() {
				return this.type === 'exam';
			},
			isTeacher() {
				return this.userRole === 'teacher';
			},
		},
	};
</script>

<style>
	.time-input {
		display: flex;
		align-items: center;
	}

	.time-input__hours,
	.time-input__minutes {
		width: 80px;
		height: 30px;
		padding: 5px;
		margin: 0 10px;
		border: 1px solid #ced4da;
		border-radius: 4px;
		text-align: center;
	}
</style>
