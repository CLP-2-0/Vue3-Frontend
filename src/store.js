import { createStore } from 'vuex';
import axios from 'axios';
import auth0 from 'auth0-js';
import router from './router';

export const store = createStore({
	state: {
		userIsAuthorized: false, //unit test login/logout function: userIsAuthorized true => login/ otherwise false => not login
		userInfo: {
			id: '',
			email: '',
			username: '',
			nickname: '',
			picture: '',
			role: '',
		},
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
		setUserInfo(state, checkUserInfo) {
			state.userInfo.id = checkUserInfo.data.data.id;
			state.userInfo.email = checkUserInfo.data.data.email;
			state.userInfo.username = checkUserInfo.data.data.username;
			state.userInfo.nickname = checkUserInfo.data.data.nickname;
			state.userInfo.picture = checkUserInfo.data.data.picture;
			state.userInfo.role = checkUserInfo.data.data.role;

			// console.log(state.userInfo);
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
					context.state.auth0.client.userInfo(authResult.accessToken, (err, user) => {
						if (err) {
							console.log(err);
							return;
						} else {
							/* We want to moving user database from Auth0 to MongoDB cause client want to use Free Plan of Auth0. Can not using directly Custom Database
							 */

							//Get user info from Auth0
							async function getUserData() {
								try {
									/*two way to get user info
                                    * 1. axios
                                        Example: 

                                        const userInfo = await axios.get(
										`https://${import.meta.env.VITE_AUTH0_DOMAIN}/userInfo`,
										{
											headers: {
												Authorization: `Bearer ${authResult.accessToken}`,
											},
										}
                                        console.log(userInfor.data);
									);
                                    * 2. user => from context.state.auth0.client.userInfor ( above )  
                                    */

									// console.log(userInfo.data);
									const username = user.email.split('@')[0];

									//Check if the user is existed in MongoDB
									const checkUserMongoDB = await axios.get(
										`${import.meta.env.VITE_URI}/users/${username}`
									);
									if (!checkUserMongoDB.data.data) {
										await axios.post(`${import.meta.env.VITE_URI}/users`, {
											id: user.sub.split('|')[1],
											email: user.email,
											username: user.email.split('@')[0],
											nickname: user.nickname,
											picture: user.picture,
											role: 'student',
										});
										console.log('save');
									} else {
										console.log('skip');
									}

									//Check user's role
									const checkUserInfo = await axios.get(
										`${import.meta.env.VITE_URI}/users/${username}`
									);

									//Pass to state via mutations
									context.commit('setUserInfo', checkUserInfo);

									//check user role
									const userRole = checkUserInfo.data.data.role;
									localStorage.setItem('user_role', userRole);
									localStorage.setItem('user_name', checkUserInfo.data.data.username);

									// console.log('role :', userRole);
									if (userRole === 'admin') {
										console.log('go to admin dashboard now');
										router.push('/publisher/dashboard');
									} else if (userRole === 'teacher') {
										console.log('go to teacher dashboard now');
										router.push('/dashboard');
									} else {
										console.log('go to dashboard now');
										router.push('/student');
									}
								} catch (error) {
									console.error(error);
								}
							}

							getUserData();
						}
					});
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
