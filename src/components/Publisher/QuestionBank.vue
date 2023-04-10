<template>
	<div class="container tab-adjuster">
		<div>
			<Assignment :lessonIdx="this.$route.params.id" :key="update" :exam="type != 'assignment'" />
			<hr />
		</div>

		<QuestionCreation
			:lessonIdx="this.$route.params.id"
			:type="type"
			@exam-update="examUpdate($event)"
		/>
	</div>
</template>

<script>
	import QuestionApis from '@/apis/QuestionApis';
	import LessonApis from '@/apis/LessonApis';
	import Homework from '../Homework.vue';
	import QuestionCreation from './QuestionCreation.vue';
	import Assignment from '../Assignment.vue';

	export default {
		name: 'Question Bank',
		components: {
			Homework,
			QuestionCreation,
			Assignment,
		},
		props: ['lessonIdx', 'type'],
		data() {
			return {
				update: 0,
			};
		},
		methods: {
			examUpdate(update) {
				this.update += update;
			},
		},

		mounted() {
			console.log(this.type);
		},
	};
</script>

<style></style>
