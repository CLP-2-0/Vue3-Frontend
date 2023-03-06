<template>
	<div class="forum">
		<button class="btn btn-primary mb-5" @click="toggleCreateTopic">Create Topic</button>
		<!-- <create-topic /> -->
		<div class="create-topic" v-if="showCreateTopic">
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
				<label class="col-sm-1 col-form-label">Content:</label>
				<quill-editor
					v-model:content="content"
					contentType="html"
					ref="quillEditor"
					:options="editorOption"
				/>
				<div class="btn-container">
					<button type="button" class="btn btn-outline-secondary mx-3" @click="cancel">
						Cancel
					</button>
					<button type="button" class="btn btn-outline-success" @click="submit">Create</button>
				</div>
			</div>
		</div>

		<!-- TopicList section  -->
		<div class="topic-list">
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Topic</th>
						<th>Active</th>
						<th>Last Post</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(topic, index) in topics" :key="index">
						<td>
							<router-link
								:to="{ name: 'TopicDetail', params: { id: topic.id } }"
								class="text-dark"
								>{{ topic.title }}</router-link
							>
						</td>
						<td><i class="fa fa-user"></i> {{ topic.replyCount }}</td>
						<td>{{ formatDate(topic.lastPostDate) }}</td>
						<td class="text-right">
							<div>
								<i class="fa-solid fa-pen-to-square mx-3" @click="editUser(student.id)"></i>

								<i class="fa-solid fa-sm fa-x" @click="editUser(student.id)"></i>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import { QuillEditor } from '@vueup/vue-quill';
	import TopicApis from '@/apis/TopicApis';
	// import CreateTopic from './CreateTopic.vue';
	// import TopicList from './TopicList.vue';
	export default {
		components: {
			QuillEditor,
		},
		data() {
			return {
				showCreateTopic: false,
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
						// toolbar: [
						// 	['bold', 'italic', 'underline'],
						// 	['blockquote', 'code-block'],
						// 	[{ list: 'ordered' }, { list: 'bullet' }],
						// 	[{ script: 'sub' }, { script: 'super' }],
						// 	[{ indent: '-1' }, { indent: '+1' }],
						// 	[{ direction: 'rtl' }],
						// 	[{ size: ['small', false, 'large', 'huge'] }],
						// 	[{ header: [1, 2, 3, 4, 5, 6, false] }],
						// 	[{ color: [] }, { background: [] }],
						// 	[{ font: [] }],
						// 	[{ align: [] }],
						// 	['clean'],
						// 	['link', 'image', 'video'],
						// ],
					},
				},
				topics: [],
			};
		},
		methods: {
			toggleCreateTopic() {
				this.showCreateTopic = !this.showCreateTopic;
			},
			async submit() {
				const topicData = {
					title: this.title,
					content: this.content,
					createdDate: new Date().toISOString(),
					lastPostDate: new Date().toISOString(),
				};
				await TopicApis.createTopic(topicData).then(async (res) => {
					await this.getAllTopics(); // make the post request
				});
				this.showCreateTopic = false;
				this.resetForm();
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
				this.topics = res.data;
			},
			formatDate(dateString) {
				const date = new Date(dateString);
				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
			},
		},
		mounted() {
			this.getAllTopics();
		},
	};
</script>
