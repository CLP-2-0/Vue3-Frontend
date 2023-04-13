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
		<div class="my-3 mt-4">Classmates' responses:</div>
		<div id="allAnswers" v-for="(answer, i) in this.answerList" :key="i">
			<div class="card ans-box px-3 py-2 mb-2">
				<div class="card-body" :id="['Ans_' + i]">
					<div id="user-info" style="display: flex; justify-content: space-between">
						<h5>{{ answer.username }}</h5>
						<p>{{ answer.timestamp }}</p>
					</div>

					<p v-if="answer.type == 'text'">{{ answer.key }}</p>
					<div v-else>
						<audio controls :id="['result_' + i]">
							<source :src="[answer.key]" type="audio/mp3" />
							Your browser does not support the audio element.
						</audio>
					</div>
					<button
						class="btn btn-outline-success text-end"
						data-bs-toggle="collapse"
						:data-bs-target="'#collapseComment' + i"
						aria-expanded="false"
						:aria-controls="'collapseComment' + i"
						@click="showComment()"
					>
						Comment
					</button>

					<div :id="['collapseComment' + i]" class="collapse" style="margin-top: 5%">
						<CommentList :idx="answer.id" :key="update"/>
						<textarea
							class="form-control"
							:id="['text_' + i]"
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
	import HomeworkApis from '@/apis/HomeworkApis';
	import CommentList from './CommentList.vue';
	export default {
		props: ['idx'],
		components: {
			Audio,
			CommentList
		},
		data() {
			return {
				answerList: [],
				userList: [],
				searchTerm: '',
				userRole: localStorage.getItem('user_role'),
				comment: '',
				commentList: [],
				show: false,
				update: 0
			};
		},
		methods: {
			async getAnswers(idx) {
				const res = await HomeworkApis.getAnswersByQuestion(idx);
				this.answerList = [];
				this.userList = [];
				console.log(res.data);
				for (let ans of res.data) {
					let userInfo = ans.username.split('_');
					let timestamp = new Date(parseInt(userInfo[0]));
					let username = userInfo[1];
					if (username == localStorage.getItem('user_name')) {
						this.show = true;
					}
					this.userList.push(username);
					let answer = {
						timestamp: timestamp.toLocaleString(),
						username: username,
						key: ans.key,
						type: ans.type,
						id: ans.id,
					};
					this.answerList.push(answer);
				}
			},

			async saveComment(id) {
				console.log(this.comment, id);
				let username = localStorage.getItem('user_name');
				await HomeworkApis.saveCommentToAnAnswer(username, id, this.comment).then(() => {
					this.commentList = [];
					this.showComment();
					this.comment = '';
				});
			},

			showComment() {
				this.update++
			},
		},
		async mounted() {
			if (this.userRole != 'admin') this.getAnswers(this.idx);
			console.log(this.idx);
		},
		computed: {
			sortedAndFilteredStudents() {
				const filtered = this.userList.filter((student) => {
					return student.toLowerCase().includes(this.searchTerm.toLowerCase());
				});
				return filtered.sort((a, b) => (a > b ? 1 : -1));
			},
			isTeacher() {
				return this.userRole === 'teacher';
			},
			isStudent() {
				return this.userRole === 'student';
			},
		},
	};
</script>
