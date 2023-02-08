<template>
	<div>
		<NavbarActive />

		<!-- Breadcrumb justfornow - need change later -->
		<div class="container-fluid header-container">
			<div class="container">
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item">
							<router-link to="/dashboard" class="text-dark">Dashboard</router-link>
						</li>
						<li class="breadcrumb-item active" aria-current="page">Enrollment</li>
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
				Join course successfully! Will direct to section {{ sectionIdCheck }} ...
			</div>

			<div class="alert alert-danger" v-if="joinNotSuccess">Invalid section code! Try again !</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import NavbarActive from './NavbarActive.vue';
	import SectionApis from '@/apis/SectionApis.js';
	export default {
		name: 'Publisher Dashboard',
		components: {
			NavbarActive,
		},
		data() {
			return {
				courseCode: '',
				joinSuccess: false,
				joinNotSuccess: false,
				sectionId: '',
			};
		},
		methods: {
			async getSectionById() {
				const res = await SectionApis.getSectionById(this.courseCode);
				// console.log(res.data);
				this.sectionId = res.data.id;
			},
			async studentJoinSection() {
				const res = await SectionApis.studentJoinSection(this.sectionId, this.userInfo.id);
				console.log('Added student to section sucessfully');
			},
			async joinClass() {
				// console.log(this.courseCode);

				try {
					await this.getSectionById();
				} catch (error) {
					console.error(error);
				}

				if (this.sectionId) {
					// console.log('yes');
					this.joinSuccess = true;

					try {
						await this.studentJoinSection();
					} catch (error) {
						console.log(error);
					}
					setTimeout(() => {
						this.joinSuccess = false;
						this.$router.push(`/${this.courseCode}`);
					}, 3000);
				} else {
					// console.log('no');
					this.joinNotSuccess = true;

					setTimeout(() => {
						this.joinNotSuccess = false;
						// this.$router.push(`/${this.courseCode}`);
					}, 3000);
				}
			},
		},
		computed: {
			...mapState(['userInfo']),
		},
	};
</script>

<style></style>
