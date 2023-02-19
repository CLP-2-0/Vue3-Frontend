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
		<h1 class="text-left">Edit My User Profile</h1>
		<div class="container mt-5">
			<div class="row">
				<div class="col-md-3">
					<div class="card text-center">
						<div class="card-header">Profile Picture</div>
						<div class="card-body d-">
							<img
								:src="picture"
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
								<span class="mx-3 fw-light">{{ email }}</span>

								<span class="mx-2 fw-light">
									<span :class="[emailVerified === 'Active' ? 'green-dot' : 'red-dot']"></span>
									{{ emailVerified }}
								</span>
							</div>
							<div class="form-group">
								<label for="nickname">Nickname: </label>
								<input
									type="text"
									class="form-control"
									id="nickname"
									v-model="nickname"
									:class="{ 'is-invalid': errors.nickname }"
								/>
								<div class="invalid-feedback" v-if="errors.nickname">
									{{ errors.nickname }}
								</div>
							</div>
							<div class="form-group">
								<label>Firstname:</label>
								<input type="text" class="form-control" id="firstname" v-model="firstname" />
								<label>Lastname:</label>
								<input type="text" class="form-control" id="firstname" v-model="lastname" />
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
							<button class="btn btn-primary btn-block d-block m-auto" @click="updatedUser">
								Save Changes
							</button>
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
				firstname: '',
				lastname: '',
				nickname: '',
				email: '',
				emailVerified: '',
				picture: '',
				updatedData: [
					{
						updatedNickname: '',
						updatedEmail: '',
						updatedHometown: '',
					},
				],
				errors: {},
			};
		},
		methods: {
			updateProfile() {
				this.errors = {};
				if (!this.nickname) {
					this.errors.nickname = 'Nickname is required.';
				}
				if (!this.email) {
					this.errors.email = 'Email is required.';
				}
				if (!this.hometown) {
					this.errors.hometown = 'Hometown is required.';
				}
				if (Object.keys(this.errors).length === 0) {
					// logic to update the profile information
					console.log(
						'Updating profile with nickname: ',
						this.nickname,
						' and email: ',
						this.email
					);
				}
			},
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
				this.nickname = res.data.nickname;
				this.email = res.data.email;
				this.picture = res.data.picture;
				if (res.data.email_verified === 'true') {
					this.emailVerified = 'Active';
				} else {
					this.emailVerified = 'Pending';
				}
				console.log(res.data.email_verified);

				//this.hometown = res.data.hometown;
				console.log(res.data);

				console.log('here', this.picture);
				console.log('here', this.email);
				console.log(res.userInfo);
			},
			// async updatedUser() {
			// 	const res = await UserApis.updatedUser(this.updatedData, this.userInfo.nickname);
			// 	this.updatedickname = res.data.updatedData.updatedNickname;
			// 	console.log(res.userInfo);
			// },

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
