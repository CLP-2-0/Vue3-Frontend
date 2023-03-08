<template>
	<div>
		<h2>{{ topic.title }}</h2>
		<p>{{ topic.content }}</p>
		<p>{{ topic.id }}</p>
		<!-- Add any other topic details you want to display here -->
	</div>
</template>

<script>
	export default {
		name: 'TopicDetails',
		props: ['topic'],
		async created() {
			console.log(this.topic.id);
		},
	};
</script>
