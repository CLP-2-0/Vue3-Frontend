<template>
	<div>
		<nav class="navbar navbar-dark bg-dark">
			<div class="container-fluid m-2">
				<router-link to="/">Home</router-link>

				<div class="nav-link">
					<!-- <router-link to="/teacher/dashboard">Dashboard</router-link> -->
					<!-- <router-link to="/teacher/profile" -->

					<router-link to="/teacher/profile"
						><i class="btn-primary fa fa-solid fa-user px-3" style="color: white"></i
					></router-link>

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
	export default {
		methods: {
			logout() {
				this.$store.dispatch('auth0Logout');
				console.log('logout');
			},
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
