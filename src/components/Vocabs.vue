<template>
	<table class="table">
		<thead>
			<tr class="bg-light">
				<th class="py-3 ps-4" scope="col">汉字</th>
				<th class="py-3" scope="col">汉语拼音</th>
				<th class="py-3" scope="col">词性</th>
				<th class="py-3" scope="col">英文意思</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(v, index) in Vocabs">
				<th class="py-3 ps-4" scope="row">{{ v.word }}</th>
				<td class="py-3">
					{{ v.pinyin }}
				</td>
				<td class="py-3">
					{{ v.type }}
				</td>
				<td class="py-3">
					{{ v.meaning }}
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script>
	import LessonApis from '@/apis/LessonApis.js';

	export default {
		props: ['lessonIdx'],
		data() {
			return {
				Vocabs: [],
			};
		},
		methods: {
			async getVocabs() {
				const res = await LessonApis.getLessonById(this.lessonIdx);
				this.Vocabs = res.data.vocabs;
			},
		},
		created() {
			this.getVocabs();
		},
	};
</script>
