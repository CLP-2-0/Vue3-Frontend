<template>
	<div class="container mt-5">
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
			<div class="btn-container mb-5">
				<button type="button" class="btn btn-outline-success" @click="save">
					Generate Vocabs and Grammars
				</button>
			</div>
			<!-- for binding content from quill-editor need v-model:content='' and contentType='html' -->
		</div>
		
		<div class="preview" hidden>
			<div class="title-container"><div id="title-preview"></div></div>
			<div id="content-preview" v-html="content" class="content ql-editor"></div>
		</div>
	</div>

	<Mock
		:red="red"
		:lessonIdx="lessonIdx"
		:title="title"
		:content="content"
		:key="update"
		:update="update"
	/>
	<div class="btn-container">
		<button type="button" class="btn btn-outline-success" @click="reload()">Save Book</button>
	</div>
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
							{ script: 'super' },
							{ color: ['red', 'rgb(237, 125, 49)', 'black'] },
							{ background: [] },
							'image',
						],
					},
				},
				content: '',
				title: '',
				red: [],
				oldVocabs: [],

				yellow: [],
				modelName: '',
				update: 0,
			};
		},
		methods: {
			async getLesson() {
				const res = await LessonApis.getLessonById(this.lessonIdx);
				this.title = res.data.title;
				this.content = res.data.content;
				this.red = res.data.vocabs;
				this.oldVocabs = res.data.vocabs;
				console.log(this.oldVocabs);

				//Binding content to QuillEditor
				this.$refs.quillEditor.setHTML(this.content);
			},
			save() {
				// this.red.length = 0;
				let contentElement = document.getElementById('content-preview');
				// contentElement.innerHTML = this.content;
				let children = contentElement.children;
				let n = 0; //index of old vocabs list
				let vocabs = [];
				for (let i = 0; i < children.length; i++) {
					let child = children[i];

					let spanChildren = child.children;
					for (let j = 0; j < spanChildren.length; j++) {
						let spanChild = spanChildren[j];

						if (spanChild.getAttribute('style') == 'color: red;') {
							if (
								this.oldVocabs.length > 0 &&
								n < this.oldVocabs.length &&
								spanChild.innerHTML.trim() == this.oldVocabs[n].word
							) {
								vocabs.push(this.oldVocabs[n]);
								n++;
							} else {
								console.log('print', spanChild.innerHTML);
								vocabs.push({
									word: spanChild.innerHTML,
									meaning: '',
									pinyin: '',
									type: '',
								});
							}
						} else if (spanChild.getAttribute('style') == 'color: rgb(237, 125, 49);') {
							this.yellow.push(spanChild.innerHTML);
						}
					}
				}
				console.log('v', vocabs);
				this.red = vocabs;
				this.update++;
			},
			reload() {
				this.$router.go(this.$router.currentRoute);
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
