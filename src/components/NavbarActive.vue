<template>
	<div>
		<nav class="navbar navbar-dark bg-dark">
			<div class="container-fluid m-2">
				<img
					src="https://brand.tcu.edu/wp-content/uploads/2015/12/TCULogo_purple_5X7-01.jpg"
					class="float-start"
					alt="..."
					style="width: 60px"
				/>

				<div class="nav-link">
					<!-- <router-link to="/teacher/dashboard">Dashboard</router-link> -->
					<router-link to="/profile"
						><i class="fa fa-solid fa-user px-3" style="color: white"></i>{{ username }}
					</router-link>

					<button
						type="button"
						class="btn btn-primary btn-sm mt-1 ms-3"
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
