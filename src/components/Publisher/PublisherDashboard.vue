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
			<LessonList />
			<!-- <BookEditor /> -->
		</div>
	</div>
</template>

<script>
	import NavbarActive from '../NavbarActive.vue';
	import BookEditor from './BookEditor.vue';
	import LessonList from './LessonList.vue';

	export default {
		name: 'Publisher Dashboard',
		components: {
			NavbarActive,
			BookEditor,
			LessonList,
		},
		data() {
			return {};
		},
	};
</script>

<style></style>
