<template>
	<div id="notification-box"></div>
	<div class="forum">
		<button class="btn btn-primary btn-custom" v-if="isTeacherorAdmin" @click="toggleCreateTopic">
			Create Topic
		</button>
		<!-- <create-topic /> -->
		<div class="create-topic mt-5" v-if="showCreateTopic">
			<div class="form-group row">
				<label for="title" class="col-sm-1 col-form-label">Title:</label>
				<div class="col-sm-11">
					<input
						type="text"
						class="form-control"
						id="titleInput"
						placeholder="Enter title here..."
						v-model="title"
					/>
				</div>
			</div>
			<div class="content-block">
				<label class="col-sm-1 col-form-label">Question:</label>
				<quill-editor
					v-model:content="content"
					contentType="html"
					ref="quillEditor"
					:options="editorOption"
				/>
				<div class="btn-container">
					<button
						type="button"
						class="btn btn-outline-secondary mx-3"
						@click="cancel"
						:disabled="isLoading"
					>
						Cancel
					</button>
					<button
						type="button"
						class="btn btn-outline-success"
						@click="submit"
						:disabled="isLoading"
					>
						{{ isLoading ? 'Creating . . .' : 'Create' }}
					</button>
				</div>
			</div>
		</div>

		<!-- TopicList section  -->

		<div class="topic-container mt-5">
			<div class="">
				<table :class="['table', 'table-hover', { 'topic-contaniner-trigger': trigger }]">
					<thead>
						<tr>
							<th class="w-70">Topic</th>
							<th>Active</th>
							<th>Created Date</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(topic, index) in topics"
							:key="index"
							@click="showTopicDetails(topic.id)"
							class="tr-custom"
						>
							<td class="p-3">
								{{ topic.title }}
							</td>
							<td class="p-3">
								<i class="fa fa-user"></i> {{ topic.userActive }}
								<i class="fa fa-comments mx-2"></i> {{ topic.replyCount }}
							</td>
							<td class="p-3">{{ formatDate(topic.lastPostDate) }}</td>
							<td class="text-right" v-if="isTeacherorAdmin">
								<!-- <i class="fa-solid fa-pen-to-square mx-3" @click="editTopic(topic.id)"></i> -->

								<i class="fa-solid fa-sm fa-x p-3 pt-4" @click="deleteTopic(topic.id)"></i>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="detail-container">
				<TopicDetail :id="selectedTopicId" v-if="selectedTopicId" @close="hideDetail" />
			</div>
		</div>
	</div>
</template>

<script>
	import { QuillEditor } from '@vueup/vue-quill';
	import TopicApis from '@/apis/TopicApis';
	import TopicDetail from './TopicDetail.vue';
	// import CreateTopic from './CreateTopic.vue';
	// import TopicList from './TopicList.vue';
	export default {
		components: {
			QuillEditor,
			TopicDetail,
		},
		data() {
			return {
				isLoading: false,
				showCreateTopic: false,
				trigger: false,
				title: '',
				content: '',
				editorOption: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline'],
							['blockquote', 'code-block'],
							[{ list: 'ordered' }, { list: 'bullet' }],
							[{ indent: '-1' }, { indent: '+1' }],
							[{ header: [1, 2, 3, 4, 5, 6, false] }],
							[{ color: ['red', 'rgb(237, 125, 49)', 'black'] }, { background: [] }],
							[{ font: [] }],
							[{ align: [] }],
							['link', 'image', 'video'],
						],
					},
				},
				topics: [],
				selectedTopicId: null,
				userRole: localStorage.getItem('user_role'),
			};
		},
		methods: {
			toggleCreateTopic() {
				this.showCreateTopic = !this.showCreateTopic;
			},
			async submit() {
				this.isLoading = true;
				const topicData = {
					title: this.title,
					content: this.content,
					createdDate: new Date().toISOString(),
					lastPostDate: new Date().toISOString(),
				};
				await TopicApis.createTopic(topicData, this.$route.params.sid).then(async (res) => {
					await this.getAllTopics(); // make the post request
				});

				this.showCreateTopic = false;
				this.resetForm();
				this.isLoading = false;
				this.showNotification('Created successfully!');
			},
			cancel() {
				this.showCreateTopic = false;
				this.resetForm();
			},
			resetForm() {
				this.title = '';
				this.content = '';
			},
			async getAllTopics() {
				const res = await TopicApis.getAllTopics();
				this.topics = res.data.filter((topic) => topic.belongSection === this.$route.params.sid);
				console.log(this.topics);
			},
			formatDate(dateString) {
				const date = new Date(dateString);
				return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(2)}`;
			},
			async deleteTopic(id) {
				if (!confirm('Are you sure you want to delete')) {
					return;
				}
				await TopicApis.deleteTopic(id).then((res) => {
					this.getAllTopics();
					alert('Deleted Successfully');
				});
			},
			showTopicDetails(id) {
				this.trigger = true;
				this.selectedTopicId = id;
			},
			hideDetail() {
				this.trigger = false;
				this.selectedTopicId = null;
			},
			showNotification(message) {
				const notificationBox = document.getElementById('notification-box');
				notificationBox.innerHTML = message;
				notificationBox.style.display = 'block';
				setTimeout(function () {
					notificationBox.style.display = 'none';
				}, 5000);
			},
		},
		mounted() {
			this.getAllTopics();
		},
		computed: {
			isTeacherorAdmin() {
				return this.userRole === 'teacher' || this.userRole === 'admin';
			},
			isStudent() {
				return this.userRole === 'student';
			},
		},
	};
</script>

<style>
	.w-70 {
		width: 65%;
	}
	.topic-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.topic-contaniner-trigger {
		display: none;
	}

	.detail-container {
		width: 100%;
	}
	table {
		width: 70%;
		border-collapse: collapse;
	}
	tr {
		overflow: hidden !important;
	}
	.tr-custom {
		cursor: pointer;
	}
</style>
