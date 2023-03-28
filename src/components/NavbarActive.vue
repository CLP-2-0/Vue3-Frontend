<template>
	<div>
		<nav class="navbar navbar-dark bg-dark p-0">
			<div class="container-fluid d-flex justify-content-spacebetween align-items-center mx-3">
				<img src="../assets/Logo1CLP.png" class="float-start" alt="..." style="width: 80px" />

				<div class="nav-link">
					<!-- <router-link to="/teacher/dashboard">Dashboard</router-link> -->
					<router-link to="/profile"
						><i class="fa fa-solid fa-user px-3 py-0" style="color: white"></i>{{ username }}
					</router-link>

					<button
						type="button"
						class="btn btn-primary btn-sm m-0 px-2"
						@click="logout()"
						v-if="this.$store.state.userIsAuthorized"
					>
						Logout
					</button>
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
			};
		},
		methods: {
			logout() {
				this.$store.dispatch('auth0Logout');
				console.log('logout');
			},
		},
		computed: {
			...mapState(['userInfo']),
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
</style>
