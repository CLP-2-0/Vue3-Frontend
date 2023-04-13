<template>
	<div id="notification-box"></div>

	<div class="discussion">
		<div class="d-flex justify-content-center">
			<button
				@click="$emit('close')"
				class="btn btn-exam m-0 px-3 text-uppercase list-group-item-secondary shadow"
			>
				Back to list of topics
			</button>
		</div>
		<div class="rounded question-wrp p-5">
			<h2 class="discussion-title">
				<div>{{ topic.title }}</div>
			</h2>
			<div class="py-2 fs-6 border-bottom">
				<h5>Question:</h5>
				<div v-html="topic.content"></div>
			</div>
			<div class="d-flex align-items-start justify-content-end mt-3">
				<button v-if="!showAnswerForm" @click="toggleAnswerForm" class="btn btn-primary">
					Create Post
				</button>
			</div>
			<form @submit.prevent="addAnswer" class="answer-form mt-5" v-if="showAnswerForm">
				<div class="form-group">
					<label for="answer-text">Your answer:</label>
					<textarea v-model="newAnswerText" id="answer-text" class="form-control mt-1"></textarea>
				</div>
				<button type="submit" class="btn btn-sm btn-primary">Post Answer</button>
			</form>
		</div>

		<div class="discussion-answers">
			<div
				v-for="(answer, index) in answersdb"
				:key="index"
				class="answer question-wrp rounded p-5"
			>
				<div class="header-custom">
					<div class="answer-header">
						<img :src="answer.pictureProfile" alt="User Profile Picture" class="profile-picture" />
						<div class="user-info">
							<div class="username">
								{{ answer.ansCreator }}
							</div>
							<div class="answer-date">{{ formatDate(answer.createdDate) }}</div>
						</div>
					</div>
					<div class="answer-body p-4 fs-6 bg-light">{{ answer.content }}</div>
				</div>

				<div class="answer-actions d-flex align-items-start justify-content-end">
					<button @click="replyToAnswer(index)" class="btn btn-sm reply-btn m-2 me-4 p-2">
						Reply
					</button>
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
							<img :src="reply.pictureProfile" alt="User Profile Picture" class="profile-picture" />
							<div class="user-info">
								<div class="username">
									{{ reply.repCreator }}
								</div>
								<div class="reply-date">{{ formatDate(reply.createdDate) }}</div>
							</div>
						</div>
						<div class="reply-body bg-light p-4 rounded">{{ reply.content }}</div>
					</div>
				</div>
			</div>
			<div v-if="answersdb.length === 0" class="no-answers">
				No answers yet. Be the first to answer!
			</div>
		</div>
	</div>
</template>

<script>
	import TopicApis from '@/apis/TopicApis';
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
				answerUsers: [],
				replyUsers: [],
				numPosts: 0,
			};
		},

		methods: {
			async created() {
				const res = await TopicApis.getTopicById(this.id);
				this.topic = res.data;
				console.log('answer', res.data.topicAnswer);
				this.answersdb = res.data.topicAnswer;

				for (const answer of this.answersdb) {
					const username = answer.answerCreatorUsername;
					if (!this.answerUsers.includes(username)) {
						this.answerUsers.push(username);
					}

					for (const reply of answer.replies) {
						const username = reply.repCreatorUsername;
						if (!this.replyUsers.includes(username)) {
							this.replyUsers.push(username);
						}
					}
					// count the number of replies for this answer
					const numReplies = answer.replies.length;

					// increment the total number of posts
					this.numPosts += 1 + numReplies;
				}
				const updateCountedForTopic = {
					title: this.topic.title,
					content: this.topic.content,
					replyCount: this.numPosts,
					userActive: this.answerUsers.length,
				};
				await TopicApis.updateTopic(updateCountedForTopic, this.topic.id).then(async (res) => {
					console.log('update count');
				});

				// console.log(this.answerUsers.length);
				// console.log(this.replyUsers.length);
				// console.log(this.numPosts);
			},
			async addAnswer() {
				const newAnswer = {
					id: cuid(),
					ansCreatorUsername: localStorage.getItem('user_name'),
					ansCreator: localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname'),
					pictureProfile: localStorage.getItem('profile'),
					createdDate: new Date().toISOString(),
					content: this.newAnswerText,
					replies: [],
				};

				await TopicApis.createAnswer(this.topic.id, newAnswer).then(async (res) => {
					this.answersdb.push(newAnswer);
				});
				this.showNotification('Answer posted successfully');
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
					const reply = {
						id: cuid(),
						repCreatorUsername: localStorage.getItem('user_name'),
						repCreator: localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname'),
						pictureProfile: localStorage.getItem('profile'),
						createdDate: new Date().toISOString(),
						content: this.replyText,
					};

					await TopicApis.createReply(this.answersdb[this.replyIndex].id, reply).then(
						async (res) => {
							this.answersdb[this.replyIndex].replies.push(reply);
						}
					);
					this.showNotification('Reply posted successfully');
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
				//Scroll to the last page
				// this.$nextTick(() => {
				// 	window.scrollTo(0, document.body.scrollHeight);
				// });
			},
			formatDate(dateString) {
				const date = new Date(dateString);
				const day = date.getDate().toString().padStart(2, '0');
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const year = date.getFullYear().toString().slice(2);
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');
				return `${month}/${day}/${year} ${hours}:${minutes}`;
			},
			showNotification(message) {
				const notificationBox = document.getElementById('notification-box');
				notificationBox.innerHTML = message;
				notificationBox.style.display = 'block';
				setTimeout(function () {
					notificationBox.style.display = 'none';
				}, 3000);
			},
		},
		mounted() {
			this.created();
		},
		computed: {
			numAnswerUsers() {
				return this.answerUsers.length;
			},
			numReplyUsers() {
				return this.replyUsers.length;
			},
			totalNumPosts() {
				return this.numPosts;
			},
		},
		// Whenever the id prop changes, the watcher is called with the new value of the id prop as the first argument and the old value as the second argument
		watch: {
			id(newValue, oldValue) {
				this.created();
			},
		},
	};
</script>

<style>
	.discussion {
		margin-top: 10px;
		width: 100%;
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
		width: 40px;
		height: 40px;
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
	.question-wrp {
		margin-top: 20px;
		box-shadow: 0 0 15px 15px rgba(235, 235, 235, 0.5);
		border: none;
	}
</style>
