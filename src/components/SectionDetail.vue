<template>
	<div>
		<NavbarActive />
		<!-- justfornow - need change later -->
		<div class="container-fluid header-container">
			<div class="container">
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item">
							<router-link to="/dashboard" class="text-dark">Dashboard</router-link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">All Lessons</li>
					</ol>
				</nav>
			</div>
		</div>
		<!-- end justfornow -->
		<div class="container ">
			<div class="">
				<h5>Section Code: {{ this.$route.params.sid }}</h5>
			</div>

			<LessonList />
		</div>
	</div>
</template>

<script>
	import NavbarActive from './NavbarActive.vue';
	import LessonList from './LessonList.vue';
	export default {
		name: 'Section Detail',
		components: {
			NavbarActive,
			LessonList,
		},
	};
</script>

<style></style>
