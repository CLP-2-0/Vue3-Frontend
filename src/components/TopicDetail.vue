<template>
	<div class="discussion">
		<h2 class="discussion-title">
			<div>{{ topic.title }}</div>
			<h4>
				<div v-html="topic.content"></div>
			</h4>
		</h2>
		<div class="discussion-answers">
			<div v-for="(answer, index) in answersdb" :key="index" class="answer">
				<div class="header-custom">
					<div class="answer-header">
						<img
							:src="answer.answerCreator.picture"
							alt="User Profile Picture"
							class="profile-picture"
						/>
						<div class="user-info">
							<div class="username">
								{{ answer.answerCreator.firstname }} {{ answer.answerCreator.lastname }}
							</div>
							<div class="answer-date">{{ formatDate(answer.createdDate) }}</div>
						</div>
					</div>
					<div class="answer-body bg-light p-4 rounded-4">{{ answer.content }}</div>
				</div>

				<div class="answer-actions d-flex align-items-start justify-content-end">
					<button @click="replyToAnswer(index)" class="btn btn-sm reply-btn m-2 p-2">Reply</button>
				</div>

				<div
					v-if="showReplyTextarea && index === replyIndex"
					class="reply-textarea answer-replies mt-0 mb-3"
				>
					<div class="form-group">
						<label for="reply-text">Your reply:</label>
						<textarea v-model="replyText" id="reply-text" class="form-control mt-1"></textarea>
					</div>
					<div class="d-flex align-items-start justify-content-end">
						<button @click="addReply(index)" class="btn btn-sm btn-primary mx-2">Post Reply</button>
						<button @click="cancelReply" class="btn btn-sm btn-secondary">Cancel</button>
					</div>
				</div>

				<!-- Reply form  -->
				<div v-if="answer.replies.length > 0" class="answer-replies mt-0 mb-2">
					<div v-for="(reply, index) in answer.replies" :key="index" class="mb-4">
						<div class="reply-header">
							<img
								:src="reply.replyCreator.picture"
								alt="User Profile Picture"
								class="profile-picture"
							/>
							<div class="user-info">
								<div class="username">
									{{ reply.replyCreator.firstname }} {{ reply.replyCreator.lastname }}
								</div>
								<div class="reply-date">{{ formatDate(reply.createdDate) }}</div>
							</div>
						</div>
						<div class="reply-body bg-light p-4 rounded-4">{{ reply.content }}</div>
					</div>
				</div>
			</div>
			<div v-if="answersdb.length === 0" class="no-answers">
				No answers yet. Be the first to answer!
			</div>
		</div>

		<div class="d-flex align-items-start justify-content-end mb-5">
			<button v-if="!showAnswerForm" @click="toggleAnswerForm" class="btn btn-primary">
				Create Post
			</button>
		</div>
		<form @submit.prevent="addAnswer" class="answer-form mb-5" v-if="showAnswerForm">
			<div class="form-group">
				<label for="answer-text">Your answer:</label>
				<textarea v-model="newAnswerText" id="answer-text" class="form-control mt-1"></textarea>
			</div>
			<button type="submit" class="btn btn-sm btn-primary">Post Answer</button>
		</form>
	</div>
</template>

<script>
	import TopicApis from '@/apis/TopicApis';
	import UserApis from '@/apis/UserApis.js';
	import { QuillEditor } from '@vueup/vue-quill';
	import cuid from 'cuid';
	export default {
		name: 'TopicDetail',
		components: {
			QuillEditor,
		},
		props: {
			id: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				answers: [],
				answersdb: [],
				newAnswerText: '',
				topic: {},
				editorOption: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline'],
							['link', 'image', 'video'],
						],
					},
				},
				showAnswerForm: false,
				showReplyTextarea: false,
				replyIndex: null,
				replyText: '',
			};
		},

		methods: {
			async created() {
				const res = await TopicApis.getTopicById(this.id);
				this.topic = res.data;
				console.log('answer', res.data.topicAnswer);
				this.answersdb = res.data.topicAnswer;
			},
			// async getUserByUsername() {
			// 	const res = await UserApis.getUserByUsername(localStorage.getItem('user_name'));
			// 	this.userInfo.nickname = res.data.nickname;
			// 	this.userInfo.lastname = res.data.lastname;
			// 	this.userInfo.firstname = res.data.firstname;
			// 	this.userInfo.picture = res.data.picture;
			// },
			async addAnswer() {
				const res = await UserApis.getUserByUsername(localStorage.getItem('user_name'));
				const newAnswer = {
					id: cuid(),
					answerCreator: {
						lastname: res.data.lastname,
						firstname: res.data.firstname,
						picture: res.data.picture,
					},
					createdDate: new Date().toISOString(),
					content: this.newAnswerText,
					replies: [],
				};

				// console.log(newAnswer);
				await TopicApis.createAnswer(
					this.topic.id,
					newAnswer,
					localStorage.getItem('user_name')
				).then(async (res) => {
					this.answersdb.push(newAnswer);
				});

				this.newAnswerText = '';
				this.showAnswerForm = false;
			},
			replyToAnswer(index) {
				this.replyIndex = index;
				console.log(this.replyIndex);
				this.showReplyTextarea = true;
			},
			async addReply() {
				if (this.replyText !== null && this.replyText.trim() !== '') {
					const res = await UserApis.getUserByUsername(localStorage.getItem('user_name'));
					const reply = {
						// user: {
						// 	name: 'John Doe',
						// 	picture: 'https://via.placeholder.com/150',
						// },
						// date: new Date().toLocaleDateString(),
						// text: this.replyText,
						id: cuid(),
						replyCreator: {
							lastname: res.data.lastname,
							firstname: res.data.firstname,
							picture: res.data.picture,
						},
						createdDate: new Date().toISOString(),
						content: this.replyText,
					};

					await TopicApis.createReply(
						this.answersdb[this.replyIndex].id,
						reply,
						localStorage.getItem('user_name')
					).then(async (res) => {
						this.answersdb[this.replyIndex].replies.push(reply);
					});

					this.cancelReply();
				}
			},
			cancelReply() {
				this.replyIndex = null;
				this.replyText = '';
				this.showReplyTextarea = false;
			},
			toggleAnswerForm() {
				this.showAnswerForm = !this.showAnswerForm;
			},
			formatDate(dateString) {
				const date = new Date(dateString);
				const day = date.getDate().toString().padStart(2, '0');
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const year = date.getFullYear().toString().slice(2);
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');
				return `${day}/${month}/${year} ${hours}:${minutes}`;
			},
		},
		mounted() {
			this.created();
		},
	};
</script>

<style>
	.discussion {
		margin-top: 50px;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
	}

	.discussion-title {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.discussion-answers {
		margin: 30px 0;
		border-bottom: 1px solid rgb(241, 241, 241);
	}

	.answer {
		margin-bottom: 30px;
		/* background-color: #f5f5f5; */
	}

	.answer-header {
		display: flex;
		align-items: center;
	}

	.profile-picture {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 20px;
	}

	.user-info {
		font-size: 18px;
	}

	.username {
		font-weight: bold;
	}

	.answer-body {
		margin-top: 20px;
		font-size: 18px;
	}
	.reply-btn {
		border: none !important;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
		text-decoration: underline !important;
	}

	.reply-btn:visited .reply-btn:hover .reply-btn:focus .reply-btn:active {
		border: none;
		box-shadow: none;
	}
	.answer-replies {
		margin-top: 20px;
		margin-left: 50px;
	}

	.reply {
		margin-bottom: 20px;
		padding: 10px;
		background-color: #f5f5f5;
	}

	.reply-header {
		display: flex;
		align-items: center;
	}

	.reply-date,
	.answer-date {
		color: #808080;
		font-size: 12px;
	}

	.reply-body {
		margin-top: 10px;
		font-size: 16px;
	}

	.no-answers {
		font-size: 18px;
		font-style: italic;
		color: #808080;
	}
</style>
