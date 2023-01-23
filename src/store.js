import { createStore } from 'vuex';
import axios from 'axios';
import auth0 from 'auth0-js';
import router from './router';

export const store = createStore({
	state: {
		userIsAuthorized: false, //unit test login/logout function: userIsAuthorized true => login/ otherwise false => not login
		userInfo: {
			username: '',
			email: '',
			role: '',
		},
		userRawData: {},
		auth0: new auth0.WebAuth({
			domain: import.meta.env.VITE_AUTH0_DOMAIN,
			clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
			redirectUri: import.meta.env.VITE_APP_DOMAINURL + '/auth0callback',
			responseType: import.meta.env.VITE_AUTH0_CONFIG_RESPONSETYPE,
			scope: import.meta.env.VITE_AUTH0_CONFIG_SCOPE,
		}),
	},
	mutations: {
		setUserIsAuthenticated(state, replacement) {
			state.userIsAuthorized = replacement;
			console.log('check setUserIsAuthenticated');
		},
		setUserInfo(state, user) {
			state.userInfo.username = user.nickname;
			state.userInfo.email = user.email;
			// state.userInfo.role = user.app_metadata.role;
			// state.userInfo.role = user.app_metadata.role;
			console.log(user);
		},
		setUserRawData(state, userRawData) {
			state.userRawData = userRawData;
			state.userInfo.role = userRawData.app_metadata.role;
		},
	},
	actions: {
		auth0Login(context) {
			console.log('in the store action named auth0Login');
			context.state.auth0.authorize();
		},
		auth0HandleAuthentication(context) {
			context.state.auth0.parseHash((err, authResult) => {
				if (authResult && authResult.accessToken && authResult.idToken) {
					let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
					// save the tokens locally
					localStorage.setItem('access_token', authResult.accessToken);
					localStorage.setItem('id_token', authResult.idToken);
					localStorage.setItem('expires_at', expiresAt);

					// Fetch the user info using the access token
					context.state.auth0.client.userInfo(
						authResult.accessToken,

						(err, user) => {
							if (err) {
								console.log(err);
								return;
							}
							context.commit('setUserInfo', user);

							//************NEED TO FIGURE OUT THE ROLE */
							// const userId = user.sub.split('|')[1];

							// axios
							// 	.get(`https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/users/${userId}`, {
							// 		headers: {
							// 			Authorization: `Bearer ${authResult.accessToken}`,
							// 		},
							// 	})
							// 	.then((response) => {
							// 		// do something with the response data
							// 		console.log(response.data);
							// 	})
							// 	.catch((error) => {
							// 		console.log(error);
							// 	});

							// console.log('go to admin dashboard now');
							// router.push('/publisher/dashboard');

							//********************JUST FOR NOW */
							console.log(user.nickname);
							if (user.nickname === 'admin') {
								console.log('go to admin dashboard now');
								router.push('/publisher/dashboard');
							} else if (user.nickname === 'teacher') {
								console.log('go to teacher dashboard now');
								router.push('/teacher/dashboard');
							} else {
								console.log('go to dashboard now');
								router.push('/student');
							}
						}
					);
					// console.log(user.nickname);
					// if (this.user.nickname === 'admin') {
					// 	console.log('go to admin dashboard now');
					// 	router.push('/publisher/dashboard');

					// } else if (user.nickname === 'teacher') {
					// 	console.log('go to teacher dashboard now');
					// 	router.push('/teacher/dashboard');
					// } else {
					// 	console.log('go to dashboard now');
					// 	router.push('/student');
					// }

					// console.log('go to admin dashboard now');
					// router.push('/publisher/dashboard');
				} else if (err) {
					// alert('login failed. Error #KJN838');
					router.push('/');
					console.log(err);
					console.log('error');
				}
			});
		},
		auth0Logout(context) {
			// No need to update the bearer in global axiosConfig to null because we are redirecting out of the application
			// Clear Access Token and ID Token from local storage
			localStorage.removeItem('access_token');
			localStorage.removeItem('id_token');
			localStorage.removeItem('expires_at');
			// redirect to auth0 logout to completely log the user out
			window.location.href = `${import.meta.env.VITE_AUTH0_DOMAINURL}/v2/logout?returnTo=${
				import.meta.env.VITE_APP_DOMAINURL
			}&client_id=${import.meta.env.VITE_AUTH0_CLIENT_ID}`;
		},
	},
});

export default store;
