<template>
	<div>
		<nav class="navbar navbar-dark bg-dark p-0">
			<div class="container-fluid d-flex justify-content-spacebetween align-items-center mx-3">
				<img src="../assets/Logo1CLP.png" class="float-start" alt="..." style="width: 80px" />

				<div class="nav-link">
					<!-- <router-link to="/teacher/dashboard">Dashboard</router-link> -->

					<i class="fa fa-solid fa-user px-2 py-0" style="color: white"></i
					><span class="greeting" v-if="showGreeting">Hi, {{ username }}</span>
					<span class="greeting" v-if="!showGreeting">Hi, {{ lastname }}</span>

					<div class="btn-group">
						<button
							type="button"
							class="btn dropdown-button m-3 p-0"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<i class="fa-solid fa-gear me-2"></i>
						</button>
						<ul class="dropdown-menu dropdown-menu-end">
							<li>
								<router-link to="/profile"
									><button class="dropdown-item text-end" type="button">
										Profile
									</button></router-link
								>
							</li>
							<li v-if="isAdmin"><router-link to="/request"><button class="dropdown-item text-end" type="button">Request Teacher</button></router-link
								></li>
							<li><hr class="m-1 p-0" /></li>
							<li>
								<button
									class="dropdown-item text-end"
									type="button"
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
	export default {
		data() {
			return {
				username: localStorage.getItem('user_name'),
				lastname: localStorage.getItem('lastname'),
				showGreeting: false,
				userRole: localStorage.getItem('user_role'),
			};
		},
		methods: {
			checkLastname() {
				if (this.lastname == '' || !this.lastname) {
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
	div > a {
		color: rgb(255, 255, 255);
		text-decoration: none;
		text-transform: uppercase;
	}
	.header-container {
		height: 7vh;
		background-color: rgb(230, 239, 245);
		width: 100%;
		position: relative;
		margin-bottom: 20px;
	}
	.header-container > div {
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translateX(-50%);
		font-size: 16px;
		margin: auto;
	}

	.dropdown-button > i {
		color: #ccc;
	}
	.dropdown-button {
	}
	.greeting {
		text-transform: none;
		color: #fff;
	}
</style>
