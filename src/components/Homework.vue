<template>
	<div class="container tab-adjuster">
		<!-- Button trigger modal -->

		<button
			type="button"
			class="btn btn-primary"
			data-bs-toggle="collapse"
			data-bs-target="#multiCollapseExample2"
			aria-controls="multiCollapseExample2"
			v-if="isTeacherorAdmin"
		>
			Create Assignment
		</button>
		<div class="collapse" id="multiCollapseExample2">
			<h2>Assignment Creation</h2>
			<div v-if="isTeacher" class="form-check">
			<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" @change="$event => usePredefined()">
			<label class="form-check-label" for="flexCheckDefault">
				Use predefined assignment
			</label>
			</div>
			<div class="container tab-adjuster">
				<div class="row">
					<div class="question-bank col">
						<div
							class="card row"
							style="margin-bottom: 5px; display: flex; padding: 5px; flex-direction: row"
							v-for="(question, idx) in chosenQuestions"
							:key="question.id"
						>
							<input
								ref="forCheck"
								type="checkbox"
								style="width: 2%"
								:id="['Check_' + idx]"
								v-model="question.checked"
								:value="question.question"
								@change="check($event, idx)"
							/>
							<div class="card-body" style="width: 85%">
								<h5 class="card-title">Question:</h5>
								<h6 class="card-subtitle mb-2 text-muted" v-html="question.question.question"></h6>
								<h5>Answer:</h5>
								<p class="card-text" v-html="question.question.answer"></p>
							</div>
							<form class="form-inline" ref="forGrade" :id="['Row_' + idx]" hidden>
								<div class="form-group mx-sm-3 mb-2" style="width: 7%">
									<label for="inputGrade">Grade</label>
									<input
										type="text"
										class="form-control"
										:id="['inputGrade_' + idx]"
										@change="addToTotal($event, question.question)"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div style="display: flex; justify-content: center; flex-direction: row">
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
					<button
						type="button"
						class="btn btn-success col-sm-3"
						data-bs-toggle="collapse"
						data-bs-target="#multiCollapseExample2"
						aria-controls="multiCollapseExample2"
						@click="createHomework"
					>
						Create
					</button>
				</div>
			</div>
		</div>
		
		<div v-if="isTeacherorAdmin">Preview Current Assignment</div>
		<Assignment :lessonIdx="lessonIdx" :sid="sid" :key="update" />
	</div>
</template>

<script>
	import LessonApis from '@/apis/LessonApis';
	import Assignment from './Assignment.vue';
	import HomeworkApis from '@/apis/HomeworkApis';
	export default {
		name: 'Homework Creation',
		components: {
			Assignment,
		},
		props: ['lessonIdx', 'sid'],
		data() {
			return {
				lessons: [],
				questionsBank: [],
				checkedQuestions: [],
				total: 0,
				gradedQuestions: [],
				update: 0,
				formEvent: null,
				userRole: localStorage.getItem('user_role'),
				predefined: [],
				chosenQuestions: [],
				numOfQuestion: 0,

			};
		},
		methods: {
			async getLessonById() {
				const res = await LessonApis.getLessonById(this.lessonIdx);
				this.questionsBank = res.data.questionsBank;
				this.predefined = res.data.predefined.questionList;
				console.log(this.questionsBank)
				for(let q of this.questionsBank){
					let question = {
						question: q,
						checked: false
					}
					this.chosenQuestions.push(question)
				}
				// console.log(this.chosenQuestion)
			},
			async createHomework() {
				console.log('save');
				console.log(this.gradedQuestions)
				if(this.userRole == 'teacher'){
					console.log("w")
					await HomeworkApis.saveHomework(this.lessonIdx, this.gradedQuestions, this.sid).then(() => {
					for (let idx in this.$refs.forGrade) {
						this.$refs.forGrade[idx].reset();
						document.getElementById('Row_' + idx).hidden = true;
					}
					
				});
				} else if(this.userRole == 'admin') {
					await LessonApis.saveHomework(this.lessonIdx, this.gradedQuestions, this.sid).then(() => {
					for (let idx in this.$refs.forGrade) {
						this.$refs.forGrade[idx].reset();
						document.getElementById('Row_' + idx).hidden = true;
					}
				});
				}
				this.total = 0;
				this.checkedQuestions = [];
				this.update++;
				this.gradedQuestions = [];
				
			},
			check(e, idx) {
				console.log(this.chosenQuestions)
				this.$nextTick(() => {
					if (e.target.checked) {
						document.getElementById('Row_' + idx).hidden = false;
						this.numOfQuestion++
					} else {
						document.getElementById('Row_' + idx).hidden = true;
						this.numOfQuestion--
						let p = parseInt(document.getElementById('inputGrade_' + idx).value)
						this.total -= p
						this.$refs.forGrade[idx].reset();

					}
				});
			},
			addToTotal(e, q) {
				if (this.formEvent == null) {
					this.formEvent = e;
				}
				let p = parseInt(e.target.value);
				this.total += p;
				let gradedQuestion = {
					question: q,
					point: p,
				};
				this.gradedQuestions.push(gradedQuestion);
			},
			usePredefined() {
				let pIdx = 0
				let len = this.predefined.length
				for(let q of this.questionsBank){
					let idx = this.questionsBank.indexOf(q)
					
					if(pIdx < len && q.question == this.predefined[pIdx].question.question) {	
						this.chosenQuestions[idx].checked = true					
						document.getElementById('Row_' + idx).hidden = false;
						console.log(this.predefined[pIdx])
						document.getElementById('inputGrade_' + idx).value = this.predefined[pIdx].point
						let gradedQuestion = {
							question: this.predefined[pIdx].question,
							point: this.predefined[pIdx].point,
						};
						this.gradedQuestions.push(gradedQuestion);
						let p = this.predefined[pIdx].point;
						this.total += p;

						pIdx++

					}
				}
				this.numOfQuestion = this.gradedQuestions.length
			}
		},
		mounted() {
			this.getLessonById();

		},
		computed: {
			isTeacherorAdmin() {
				return this.userRole === 'teacher' || this.userRole === 'admin';
			},
			isStudent() {
				return this.userRole === 'student';
			},
			isTeacher() {
				return this.userRole === 'teacher';
			},
			isAdmin() {
				return this.userRole === 'admin';
			},
		},
	};
</script>

<style></style>
