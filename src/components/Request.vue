<template>
	<NavbarActive />
	<div id="notification-box"></div>
	<!-- Breadcrumb justfornow - need change later -->
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
	<!-- end justfornow -->
	<div class="d-flex justify-content-center" v-else>
		You dont have permission to access this page
	</div>
	<div class="container" v-if="isAdmin">
		<div style="margin-top: 30px">
			<div>Lists of user request Teacher role:</div>
			<div
				class="d-flex justify-content-center alert alert-secondary mt-3"
				role="alert"
				v-if="noRequest"
			>
				There are no request at the moment
			</div>
			<div class="d-flex justify-content-center alert mt-3" v-if="loading" role="alert">
				L O A D I N G . . .
			</div>
			<table class="table table-hover" v-if="!noRequest">
				<tbody>
					<tr v-for="(student, index) in students" :key="student.id">
						<td>
							<div class="text-dark m-3">{{ student.firstname }}, {{ student.lastname }}</div>
						</td>
						<td>
							<div class="text-dark m-3">{{ student.email }}</div>
						</td>

						<td class="text-right">
							<div class="">
								<nobr class="accept-button" @click="accept(student.username)">
									<i class="fa-solid fa-check mt-3 mx-2"></i><span class="accept-text">Accept</span>
								</nobr>
								<nobr class="accept-button ms-5" @click="decline(student.username)">
									<i class="fa-solid fa-xmark me-2"></i><span class="accept-text">Decline</span>
								</nobr>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import UserApis from '@/apis/UserApis.js';
	import NavbarActive from './NavbarActive.vue';
	export default {
		name: 'Request',
		components: {
			NavbarActive,
		},
		data() {
			return {
				students: [],
				userRole: localStorage.getItem('user_role'),
				noRequest: false,
				loading: true,
			};
		},
		methods: {
			async getUserByRequestedRole() {
				const res = await UserApis.getUsers();
				// console.log(res.data);
				const usersWithRequestedRole = res.data.filter((user) => user.requestedRole === 'teacher');
				console.log('teacher', usersWithRequestedRole);
				this.loading = false;
				if (usersWithRequestedRole.length == 0) {
					this.noRequest = true;
					this.loading = false;
				} else this.students = usersWithRequestedRole;
			},

			async accept(username) {
				// this.showNotification('Assign Teacher role successfully');
				const res = await UserApis.getUserByUsername(username);
				const user = {
					lastname: res.data.lastname,
					firstname: res.data.firstname,
					picture: res.data.picture,
					email_verified: res.data.email_verified,
					role: 'teacher',
					requestedRole: null,
				};
				// console.log(user);
				await UserApis.updateUser(username, user);
				this.getUserByRequestedRole();
				this.showNotification('Assign Teacher role successfully');
			},
			async decline(username) {
				const res = await UserApis.getUserByUsername(username);
				const user = {
					lastname: res.data.lastname,
					firstname: res.data.firstname,
					picture: res.data.picture,
					email_verified: res.data.email_verified,
					role: 'student',
					requestedRole: null,
				};
				// console.log(user);
				await UserApis.updateUser(username, user);
				this.getUserByRequestedRole();
				this.showNotification('Decline Teacher role successfully');
			},
			showNotification(message) {
				const notificationBox = document.getElementById('notification-box');
				notificationBox.innerHTML = message;
				notificationBox.style.display = 'block';
				setTimeout(function () {
					notificationBox.style.display = 'none';
				}, 5000);
			},
		},
		mounted() {
			this.getUserByRequestedRole();
		},
		computed: {
			isAdmin() {
				return this.userRole === 'admin';
			},
			isTeacherorStudent() {
				return this.userRole === 'teacher' || this.userRole === 'student';
			},
			isStudent() {
				return this.userRole === 'student';
			},
		},
	};
</script>

<style>
	.accept-button {
		cursor: pointer;
	}
</style>
