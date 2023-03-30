<template>
	<NavbarActive />
	<div id="notification-box"></div>
	<div class="container-fluid header-container" v-if="isTeacherorStudent">
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

	<div class="container-fluid header-container" v-if="isAdmin">
		<div class="container">
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<router-link to="publisher/dashboard" class="text-dark">Dashboard</router-link>
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
						<div class="card-body pt-4">
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
							<!-- <button class="btn btn-primary btn-block d-block m-auto" @click="openFileInput">
								Change Picture
							</button> -->
						</div>
						<div class="card-footer pb-3" v-if="isStudent">
							<div class="d-block">
								<button class="btn btn-secondary btn-block px-2" @click="requestTeacher()">
									I'm Teacher
								</button>
								<button class="btn btn-secondary btn-block mx-1 px-2" @click="requestTeacher()">
									<router-link to="/student">Join Section</router-link>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-9">
					<div class="card">
						<div class="card-header">
							<i class="fas fa-user"></i>
							Profile Information
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
							<!-- <div class="form-group">
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
							</div> -->
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
							<br />

							<hr />
							<button class="btn btn-primary btn-block d-block m-auto" @click="updateUser">
								Save Changes
							</button>
						</div>
					</div>
				</div>

				<div
					class="modal fade"
					id="requiredModal"
					tabindex="-1"
					aria-labelledby="requiredModalLabel"
					aria-hidden="true"
					role="dialog"
				>
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header justify-content-center">
								<h5 class="modal-title text-uppercase text-danger" id="requiredModalLabel">
									Action required!
								</h5>
							</div>
							<div class="modal-body text-center p-5">
								{{ this.message }}
							</div>
							<div class="modal-footer justify-content-center">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
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
				userInfo: {
					username: '',
					firstname: '',
					lastname: '',
					nickname: '',
					email: '',
					email_verified: '',
					emailStatus: '',
					picture: '',
					requestedRole: '',
					role: '',
				},
				message:
					'Require: Please update account with your first and last name, and verify your email for future access.',
				errors: {},
				userRole: localStorage.getItem('user_role'),
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
				this.userInfo.role = res.data.role;
				this.userInfo.email_verified = res.data.email_verified;

				if (res.data.email_verified === 'true') {
					this.userInfo.emailStatus = 'Active';
				} else {
					this.userInfo.emailStatus = 'Pending';
				}
				this.showModal();
			},
			async updateUser() {
				this.errors = {};

				if (!this.userInfo.firstname) {
					this.errors.firstname = 'This field is required.';
				}
				if (!this.userInfo.lastname) {
					this.errors.lastname = 'This field is required.';
				}
				if (Object.keys(this.errors).length === 0) {
					await UserApis.updateUser(localStorage.getItem('user_name'), this.userInfo);

					this.showNotification('Save successful!');

					setTimeout(() => {
						window.location.reload();
					}, 1000);
				}
			},

			async requestTeacher() {
				this.userInfo.requestedRole = 'teacher';
				await UserApis.updateUser(localStorage.getItem('user_name'), this.userInfo);
				console.log(this.userInfo);
				this.showNotification('Requested role successful!');
				setTimeout(() => {
					this.requestSuccess = false;
				}, 5000);
			},
			showNotification(message) {
				const notificationBox = document.getElementById('notification-box');
				notificationBox.innerHTML = message;
				notificationBox.style.display = 'block';
				setTimeout(function () {
					notificationBox.style.display = 'none';
				}, 5000);
			},
			async showModal() {
				if (
					this.userInfo.firstname === null ||
					this.userInfo.lastname === null ||
					!this.userInfo.lastname ||
					!this.userInfo.firstname
				) {
					$('#requiredModal').modal('show');
				}
			},
		},
		computed: {
			...mapState(['userInfo']),
			isTeacherorStudent() {
				return this.userRole === 'teacher' || this.userRole === 'student';
			},
			isAdmin() {
				return this.userRole === 'admin';
			},
			isStudent() {
				return this.userRole === 'student';
			},
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
