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
		<div class="container">
			<div
				class="bg-light d-flex justify-content-center align-items-center p-1"
				v-if="isTeacherorAdmin"
			>
				<h5 class="pt-2">Section Code: {{ this.$route.params.sid }}</h5>

				<div class="" style="margin-left: 2%">
					<span
						type="button"
						class="input-group-text px-4 py-1 m-0 rounded-2"
						id="basic-addon2"
						@click="copyCode()"
						>Copy</span
					>
				</div>
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
		methods: {
			copyCode() {
				//   var copyText = document.getElementById("sectionId");

				//   // Select the text field
				//   copyText.select();
				//   copyText.setSelectionRange(0, 99999); // For mobile devices

				// Copy the text inside the text field
				navigator.clipboard.writeText(this.$route.params.sid);
				alert('Copied the text: ' + this.$route.params.sid);
			},
		},
		data() {
			return {
				userRole: localStorage.getItem('user_role'),
			};
		},
		computed: {
			isTeacherorAdmin() {
				return this.userRole === 'teacher' || this.userRole === 'admin';
			},
			isStudent() {
				return this.userRole === 'student';
			},
		},
	};
</script>

<style></style>
