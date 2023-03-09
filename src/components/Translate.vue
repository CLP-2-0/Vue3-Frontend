<template>
	<div>
		<div class="container">
			<div class="center-div">
				<div id="title">
					<ruby style="font-size: 20px">
						{{ chineseTitle }} <rp>(</rp><rt>{{ title }}</rt
						><rp>)</rp>
					</ruby>
				</div>
			</div>
			<div id="content" style="line-height: 300%">
				<ruby v-for="(ch, index) in characters" style="font-size: 20px">
					{{ ch }} <rp>(</rp><rt style="">{{ pinyins[index] }}</rt
					><rp>)</rp>
				</ruby>
			</div>
		</div>
	</div>
</template>
<script>
	// import { translate } from "@vitalets/google-translate-api";
	// import pinyin from 'pinyin';
	import { pinyin } from 'pinyin';

	import LessonApis from '@/apis/LessonApis';

	export default {
		props: ['lessonIdx'],
		data() {
			return {
				title: '',
				PinyinContent: '',
				chineseTitle: '',
				chineseContent: '',
				characters: [],
				pinyins: [],
			};
		},
		methods: {
			async chineseToPinyin() {
				const res = await LessonApis.getLessonById(this.lessonIdx);
				this.title = await pinyin(res.data.title).toString();
				this.PinyinContent = await pinyin(res.data.content);
				this.chineseTitle = res.data.title;
				this.chineseContent = res.data.content;
				this.chineseContent = this.chineseContent.replace(/(<([^>]+)>)/gi, '');

				this.characters = this.chineseContent.split('');

				for (let ch of this.characters) {
					this.pinyins.push(pinyin(ch).toString());
				}
				// console.log(this.pinyins);
				// console.log(this.pinyins[0]);
			},
		},
		created() {
			this.chineseToPinyin();
		},
	};
</script>

<style>
	.center-div {
		display: flex;
		justify-content: center;
	}
</style>
