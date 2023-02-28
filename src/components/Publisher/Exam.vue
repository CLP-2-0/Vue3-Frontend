<template>
	<div>
        <QuestionCreation :lessonIdx="this.$route.params.id" type="exam"/>
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