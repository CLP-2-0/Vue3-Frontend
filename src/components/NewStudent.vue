<template>
	<div>
		<NavbarActive />

		<!-- Breadcrumb justfornow - need change later -->
		<div class="container-fluid header-container">
			<div class="container">
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item active" aria-current="page">Dashboard</li>
					</ol>
				</nav>
			</div>
		</div>
		<!-- end justfornow -->

		<div class="container">
			<form>
				<div class="form-group">
					<label for="exampleFormControlInput1">Enter Class Code:</label>
					<input
						type="text"
						class="form-control"
						id="exampleFormControlInput1"
						v-model="courseCode"
					/>
				</div>
				<button type="button" class="btn btn-outline-success" @click="joinClass">Join</button>
			</form>

			<div class="alert alert-success" v-if="joinSuccess">
				Join course successfully! Will direct to course ...
			</div>
		</div>
	</div>
</template>

<script>
	import NavbarActive from './NavbarActive.vue';

	export default {
		name: 'Publisher Dashboard',
		components: {
			NavbarActive,
		},
		data() {
			return {
				courseCode: '',
				joinSuccess: false,
			};
		},
		methods: {
			joinClass() {
				this.joinSuccess = true;

				setTimeout(() => {
					this.joinSuccess = false;
					this.$router.push(`/${this.courseCode}`);
				}, 3000);
			},
		},
	};
</script>

<style></style>
