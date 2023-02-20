<template>
	<NavbarActive />
	<div class="container-fluid header-container">
		<div class="container">
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<router-link to="/dashboard" class="text-dark">Dashboard</router-link>
					</li>
					<li class="breadcrumb-item active" aria-current="page">Profile</li>
				</ol>
			</nav>
		</div>
	</div>

	<div class="container mt-5">
		<h2 class="text-left">User Profile</h2>
		<div class="container mt-5">
			<div class="row">
				<div class="col-md-3">
					<div class="card text-center">
						<div class="card-header">Profile Picture</div>
						<div class="card-body d-">
							<img
								:src="userInfo.picture"
								class="rounded-circle mb-3 col-md-7 d-block m-auto"
								alt="Profile Picture"
							/>
							<input
								type="file"
								id="fileInput"
								@change="uploadProfilePicture"
								style="display: none"
							/>
							<button class="btn btn-primary btn-block d-block m-auto" @click="openFileInput">
								Change Picture
							</button>
						</div>
					</div>
				</div>
				<div class="col-md-9">
					<div class="card">
						<div class="card-header">
							<h5>
								<i class="fas fa-user"></i>
								Profile Information
							</h5>
						</div>
						<div class="card-body">
							<div class="form-group mb-2">
								<label for="email">Email:</label>
								<span class="mx-3 fw-light">{{ userInfo.email }}</span>

								<span class="mx-2 fw-light">
									<span
										:class="[userInfo.emailStatus === 'Active' ? 'green-dot' : 'red-dot']"
									></span>
									{{ userInfo.emailStatus }}
								</span>
							</div>
							<div class="form-group">
								<label for="nickname">Nickname: </label>
								<input
									type="text"
									class="form-control"
									id="nickname"
									v-model="userInfo.nickname"
									:class="{ 'is-invalid': errors.nickname }"
								/>
								<div class="invalid-feedback" v-if="errors.nickname">
									{{ errors.nickname }}
								</div>
							</div>
							<div class="form-group">
								<label>Firstname:</label>
								<input
									type="text"
									class="form-control"
									id="firstname"
									v-model="userInfo.firstname"
									:class="{ 'is-invalid': errors.firstname }"
								/>
								<div class="invalid-feedback" v-if="errors.firstname">
									{{ errors.firstname }}
								</div>
								<label>Lastname:</label>
								<input
									type="text"
									class="form-control"
									id="firstname"
									v-model="userInfo.lastname"
									:class="{ 'is-invalid': errors.lastname }"
								/>
								<div class="invalid-feedback" v-if="errors.lastname">
									{{ errors.lastname }}
								</div>
							</div>

							<!-- <div class="form-group">
								<label for="hometown">Hometown:</label>
								<input
									type="text"
									class="form-control"
									id="hometown"
									v-model="hometown"
									:class="{ 'is-invalid': errors.hometown }"
								/>
								<div class="invalid-feedback" v-if="errors.hometown">
									{{ errors.hometown }}
								</div>
							</div> -->
							<br />
							<div class="d-block">
								<button class="btn btn-secondary btn-block" @click="requestTeacher()">
									I am a teacher
								</button>
								<button class="btn btn-secondary btn-block mx-2" @click="requestTeacher()">
									<router-link to="/student">Join section</router-link>
								</button>
							</div>
							<hr />
							<button class="btn btn-primary btn-block d-block m-auto" @click="updateUser">
								Save Changes
							</button>
							<div class="alert alert-success mt-3 text-center" v-if="updateSuccess">
								Update success!
							</div>
						</div>
					</div>
				</div>
				<div class="alert alert-success mt-3" v-if="requestSuccess">Request success!</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavbarActive from './NavbarActive.vue';
	import UserApis from '@/apis/UserApis.js';
	import { mapState } from 'vuex';
	export default {
		name: 'Profile',
		components: {
			NavbarActive,
		},
		data() {
			return {
				requestSuccess: false,
				updateSuccess: false,
				userInfo: {
					username: '',
					firstname: '',
					lastname: '',
					nickname: '',
					email: '',
					email_verified: '',
					emailStatus: '',
					picture: '',
				},
				updatedInfo: {
					nickname: '',
					firstname: '',
					lastname: '',
				},
				errors: {},
			};
		},
		methods: {
			uploadProfilePicture(event) {
				let input = event.target;
				if (input.files && input.files[0]) {
					let reader = new FileReader();
					reader.onload = (e) => {
						// set the image source to the data URL of the selected file
						this.profilePicture = e.target.result;
					};
					reader.readAsDataURL(input.files[0]);
				}
			},
			openFileInput() {
				document.getElementById('fileInput').click();
			},
			async getUserByUsername() {
				const res = await UserApis.getUserByUsername(localStorage.getItem('user_name'));
				this.userInfo.nickname = res.data.nickname;
				this.userInfo.email = res.data.email;
				this.userInfo.lastname = res.data.lastname;
				this.userInfo.firstname = res.data.firstname;
				this.userInfo.picture = res.data.picture;
				this.userInfo.email_verified = res.data.email_verified;
				if (res.data.email_verified === 'true') {
					this.userInfo.emailStatus = 'Active';
				} else {
					this.userInfo.emailStatus = 'Pending';
				}
			},
			async updateUser() {
				this.errors = {};
				if (!this.userInfo.nickname) {
					this.errors.nickname = 'This field is required.';
				}
				if (!this.userInfo.firstname) {
					this.errors.firstname = 'This field is required.';
				}
				if (!this.userInfo.lastname) {
					this.errors.lastname = 'This field is required.';
				}
				if (Object.keys(this.errors).length === 0) {
					await UserApis.updateUser(localStorage.getItem('user_name'), this.userInfo);

					this.updateSuccess = true;
					setTimeout(() => {
						this.updateSuccess = false;
					}, 1200);
				}
			},

			async requestTeacher() {
				this.requestSuccess = true;
				setTimeout(() => {
					this.requestSuccess = false;
				}, 1200);
			},
		},
		computed: {
			...mapState(['userInfo']),
		},
		mounted() {
			this.getUserByUsername();
		},
	};
</script>

<style>
	.is-invalid {
		border-color: #dc3545;
	}
	.card-header h5 {
		font-size: 14px;
	}
	.green-dot,
	.red-dot {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.green-dot {
		background-color: green;
	}
	.red-dot {
		background-color: rgb(206, 0, 0);
	}
</style>
