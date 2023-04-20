<template>
	<div class="accordion" id="accordionExample">
		<div class="accordion-item">
			<h2 class="accordion-header" id="headingOne">
				<button
					class="accordion-button"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapseOne"
					aria-expanded="true"
					aria-controls="collapseOne"
				>
					Edit Vocab
				</button>
			</h2>
			<div
				id="collapseOne"
				class="accordion-collapse collapse show m-3"
				aria-labelledby="headingOne"
				data-bs-parent="#accordionExample"
			>
				<table class="table" id="vocabTable">
					<thead>
						<tr class="bg-light text-center">
							<th scope="col">汉字</th>
							<th scope="col">汉语拼音</th>
							<th scope="col">词性</th>
							<th scope="col">英文意思</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(r, index) in red" class="text-center">
							<th scope="row">{{ r.word }}</th>
							<td>
								<textarea
									name="pinyin"
									type="text"
									cols="10"
									rows="1"
									:id="'pinyinId' + index"
									@blur="addToRed(index)"
									>{{ r.pinyin }}</textarea
								>
							</td>
							<td>
								<textarea
									name="type"
									cols="15"
									rows="1"
									:id="'typeId' + index"
									@blur="addToRed(index)"
									>{{ r.type }}</textarea
								>
							</td>
							<td>
								<textarea
									name="meaning"
									cols="40"
									rows="1"
									:id="'meaningId' + index"
									@input="addToRed(index)"
									>{{ r.meaning }}</textarea
								>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="btn-container">
					<button
						type="button"
						class="btn btn-outline-success"
						data-bs-toggle="collapse"
						data-bs-target="#collapseOne"
						aria-expanded="false"
						aria-controls="collapseOne"
						@click="saveTable"
					>
						Done
					</button>
				</div>
			</div>
		</div>
		<div class="accordion-item">
			<h2 class="accordion-header" id="headingTwo">
				<button
					class="accordion-button collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#collapseTwo"
					aria-expanded="false"
					aria-controls="collapseTwo"
				>
					Edit Grammar
				</button>
			</h2>
			<div
				id="collapseTwo"
				class="accordion-collapse collapse m-3"
				aria-labelledby="headingTwo"
				data-bs-parent="#accordionExample"
			>
				<GrammarEditor
					:lessonIdx="lessonIdx"
					:content="content"
					:editable="true"
					:update="update"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import VocabApis from '@/apis/VocabApis';
	import GrammarEditor from './GrammarEditor.vue';
	import LessonApis from '@/apis/LessonApis';

	export default {
		props: ['red', 'lessonIdx', 'title', 'content', 'update'],

		name: 'Mock',
		components: {
			GrammarEditor,
		},
		data() {
			return {
				vocabs: [],
				htmlContent: this.content,
			};
		},

		methods: {
			addToRed(index) {
				this.red[index].meaning = document.getElementById('meaningId' + index).value;

				this.red[index].pinyin = document.getElementById('pinyinId' + index).value;
				this.red[index].type = document.getElementById('typeId' + index).value;
			},
			async updateLesson() {
				await LessonApis.updateLessonContent(this.lessonIdx, this.title, this.content)
			},
			async saveTable() {
				console.log('mock', this.red);

				await this.updateLesson().then(async () => {
					const res = await VocabApis.saveVocabs(this.lessonIdx, this.red);
				});
				// .then(() => {
				//   this.$router.go(this.$router.currentRoute);
				// });
			},
		},
		mounted() {},
	};
</script>
