<template>
	<nav class="navbar navbar-dark bg-dark">
		<div class="container-fluid m-2">
			<router-link to="/">Home</router-link>
			<div class="nav-link"><router-link to="/signup">Signup</router-link></div>
		</div>
	</nav>
</template>

<script>
	export default {
		methods: {
			logout() {
				console.log('logout');
			},
		},
	};
</script>

<style></style>
