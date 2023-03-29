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
				// Create a new DOMParser
				const parser = new DOMParser();

				// Parse the HTML text to create a new DOM tree
				const doc = parser.parseFromString(res.data.content, "text/html");

				// Get all <sup> elements and remove them from their parent
				const supTags = doc.querySelectorAll("sup");
				supTags.forEach(supTag => supTag.parentNode.removeChild(supTag));

				// Get the modified HTML text
				const modifiedHtmlText = doc.documentElement.innerHTML;
				this.PinyinContent = await pinyin(modifiedHtmlText);
				this.chineseTitle = res.data.title;
				this.chineseContent = modifiedHtmlText;
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
