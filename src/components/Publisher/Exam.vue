<template>
	<div>
		Exam Creation
        <QuestionCreation :lessonIdx="this.$route.params.id" />
	</div>
</template>

<script>
import QuestionCreation from './QuestionCreation.vue';
	export default {
        props: ['lessonIdx'],
		data() {
			return {
				
			};
		},
		name: 'Exam',
		components: {
			QuestionCreation
		},
		
		methods: {
			
		},
        mounted() {
		},
	};
</script>