<template>
	<div>
		<nav class="navbar navbar-custom p-0">
			<div class="container d-flex flex-row justify-content-between align-items-center nav-height">
				<div class="d-flex">
					<img src="../assets/Logo1CLP.png" class="" alt="..." style="width: 80px" />
					<span class="fs-4 ms-4">{{ current }}</span>
				</div>

				<div class="nav-link">
					<!-- <router-link to="/teacher/dashboard">Dashboard</router-link> -->

					<i class="fa fa-solid fa-user mx-2"></i>
					<span class="greeting" v-if="showGreeting">Hi, {{ username }}</span>
					<span class="greeting" v-if="!showGreeting">Hi, {{ lastname }}</span>

					<div class="btn-group">
						<button
							type="button"
							class="btn dropdown-button m-2 p-0"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<i class="fa-solid fa-gear"></i>
						</button>
						<ul class="dropdown-menu dropdown-menu-end">
							<li>
								<router-link to="/profile"
									><button class="dropdown-item text-end btn-profile" type="button">
										Profile
									</button></router-link
								>
							</li>
							<li v-if="isAdmin">
								<router-link to="/request"
									><button class="dropdown-item text-end btn-profile" type="button">
										Request Teacher
									</button></router-link
								>
							</li>
							<li><hr class="m-1 p-0" /></li>
							<li>
								<button
									class="dropdown-item text-end btn-profile"
									type="button "
									@click="logout()"
									v-if="this.$store.state.userIsAuthorized"
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>

		<!-- <div class="container-fluid header-container">
      <span class="container">Current location</span>
    </div> -->
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import UserApis from '@/apis/UserApis.js';
	export default {
		name: 'NavbarActive',
		props: ['current'], // define the prop
		data() {
			return {
				username: localStorage.getItem('user_name'),
				lastname: '',
				showGreeting: false,
				userRole: localStorage.getItem('user_role'),
			};
		},
		methods: {
			async checkLastname() {
				const res = await UserApis.getUserByUsername(localStorage.getItem('user_name'));
				console.log(res);
				this.lastname = res.data.lastname;
				console.log('this is lastname', this.lastname);
				if (this.lastname === null || !this.lastname) {
					this.showGreeting = true;
				} else {
					this.showGreeting = false;
				}
			},
			logout() {
				this.$store.dispatch('auth0Logout');
				console.log('logout');
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
			this.checkLastname();
		},
	};
</script>

<style>
	.navbar-custom {
		height: 8vh;
		min-height: 60px;
		box-shadow: 0px 10px 20px rgba(240, 240, 240, 1);
	}
	.navbar-custom > div > div {
		margin-top: 0;
	}
	.nav-height {
		height: 100%;
	}
	.fullscreen {
		height: auto;
		min-height: 92vh;
	}
	div > a {
		color: rgb(255, 255, 255);
		text-decoration: none;
		text-transform: uppercase;
	}
	.header-container {
		height: 7vh;
		/* background-color: rgb(230, 239, 245); */
		/* background-color: var(--background-color); */

		width: 100%;
		position: relative;
		margin: 10px;
	}
	.header-container > div {
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translateX(-50%);
		font-size: 16px;
		margin: auto;
	}
	.btn-profile:hover,
	.btn-profile:visited,
	.btn-profile:active {
		background-color: var(--secondary-color) !important;
	}
	.dropdown-button > i {
		/* color: #ccc; */
	}
	.dropdown-button,
	.dropdown-button:active,
	.dropdown-button:focus {
		border: none !important ;
	}
	.greeting {
		text-transform: none;
		/* color: #fff; */
	}
</style>
