<template>
	<div class="container">
		<div class="form-group row">
			<label for="title" class="col-sm-1 col-form-label">Title:</label>
			<div class="col-sm-11">
				<input
					type="text"
					class="form-control"
					id="titleInput"
					placeholder="Enter title here..."
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
				<button type="button" class="btn btn-outline-success col-2" @click="save">
					Generate Vocab
				</button>
			</div>
			<!-- for binding content from quill-editor need v-model:content='' and contentType='html' -->
		</div>

		<div class="preview">
			<div class="title-container"><div id="title-preview"></div></div>
			<div id="content-preview" class="content ql-editor"></div>
		</div>
	</div>

	<Mock :red="red" :lessonIdx="lessonIdx" :title="title" :content="content" />
</template>

<script>
	import { QuillEditor } from '@vueup/vue-quill';
	import '@vueup/vue-quill/dist/vue-quill.snow.css';

	import Mock from './Mock.vue';
	import LessonApis from '@/apis/LessonApis';

	export default {
		name: 'quil-editor',
		title: 'Book Editor',
		components: {
			QuillEditor,

			Mock,
		},
		props: ['lessonIdx'],
		data() {
			return {
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
						],
					},
				},
				content: '',
				title: '',
				red: [],

				yellow: [],
				modelName: '',
			};
		},
		methods: {
			async getLesson() {
				const res = await LessonApis.getLessonbyId(this.lessonIdx);
				this.title = res.data.title;
				this.content = res.data.content;
				this.red = res.data.vocabs;

				document.getElementById('titleInput').value = this.title;
				document.getElementById('content-preview').innerHTML = this.content;
				document.getElementById('title-preview').innerHTML = this.title;

				//Binding content to QuillEditor
				this.$refs.quillEditor.setHTML(this.content);
			},
			save() {
				this.red.length = 0;
				this.title = document.getElementById('titleInput').value;
				document.getElementById('title').innerHTML = this.title;

				let contentElement = document.getElementById('content-preview');
				contentElement.innerHTML = this.content;
				let children = contentElement.children;
				for (let i = 0; i < children.length; i++) {
					let child = children[i];

					let spanChildren = child.children;
					for (let j = 0; j < spanChildren.length; j++) {
						let spanChild = spanChildren[j];

						if (spanChild.getAttribute('style') == 'color: red;') {
							// this.red.word = spanChild.innerHTML;
							this.red.push({
								word: spanChild.innerHTML,
								meaning: '',
								pinyin: '',
								type: '',
							});
						} else if (
							spanChild.getAttribute('style') == 'color: rgb(237, 125, 49);'
						) {
							this.yellow.push(spanChild.innerHTML);
						}
					}
				}
			},
		},
		mounted() {
			this.getLesson();
		},
	};
</script>

<style>
	.container > div {
		margin-top: 10px;
	}

	.btn-container {
		display: flex;
		justify-content: end;
	}

	.btn {
		margin-top: 10px;
	}

	.title-container {
		display: flex;
		justify-content: center;
	}
</style>
