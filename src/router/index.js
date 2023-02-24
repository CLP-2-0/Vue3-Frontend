import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Signup from '../components/Signup.vue';
import Dashboard from '../components/Dashboard.vue';
import Lesson from '../components/Lesson.vue';
import SectionDetail from '../components/SectionDetail.vue';
import PublisherDashboard from '../components/Publisher/PublisherDashboard.vue';
import LessonDetail from '@/components/Publisher/LessonDetail.vue';
import NewStudent from '@/components/NewStudent.vue';
import Auth0Callback from '@/components/Auth0Callback.vue';
import Profile from '@/components/Profile.vue';
import store from '@/store';
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},

		{
			path: '/signup',
			name: 'SignUp',
			component: Signup,
		},
		{
			path: '/auth0callback',
			name: 'Auth0Callback',
			component: Auth0Callback,
		},
		{
			path: '/',
			children: [
				{
					path: 'dashboard',
					name: 'Dashboard',
					component: Dashboard,
					props: true,
					meta: {
						requiresAuth: true,
					},
				},
				{
					path: 'section:sid',
					name: 'SectionDetail',
					component: SectionDetail,
					props: true,
					meta: {
						requiresAuth: true,
					},
				},
			],
		},
		{
			path: '/profile',
			name: 'Profile',
			component: Profile,
			props: true,
			meta: {
				requiresAuth: true,
			},
		},
		// {
		// 	path: '/teacher/dashboard/:sid',
		// 	name: 'SectionDetail',
		// 	component: SectionDetail,
		// 	children: [
		{
			path: '/:sid/lesson/:id',
			name: 'Lesson',
			component: Lesson,
			props: true,
			meta: {
				requiresAuth: true,
			},
		},
		// 	]
		// },

		{
			path: '/publisher/dashboard',
			name: 'Publisher Dashboard',
			component: PublisherDashboard,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/publisher/dashboard/:id',
			name: 'Lesson Detail',
			component: LessonDetail,
			props: true,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: '/student',
			name: 'New Student',
			component: NewStudent,
			props: true,
			meta: {
				requiresAuth: true,
			},
		},
	],
});

router.beforeEach((to, from, next) => {
	// Allow finishing callback url for logging in
	if (to.matched.some((record) => record.path == '/auth0callback')) {
		console.log('router.beforeEach found /auth0callback url');
		store.dispatch('auth0HandleAuthentication');
		return;
	}

	// check if user is logged in (start assuming the user is not logged in = false)
	let routerAuthCheck = false;
	// Verify all the proper access variables are present for proper authorization
	if (
		localStorage.getItem('access_token') &&
		localStorage.getItem('id_token') &&
		localStorage.getItem('expires_at')
	) {
		console.log('found local storage tokens');
		// Check whether the current time is past the Access Token's expiry time
		let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		// set localAuthTokenCheck true if unexpired / false if expired
		routerAuthCheck = new Date().getTime() < expiresAt;
	}

	// set global ui understanding of authentication
	store.commit('setUserIsAuthenticated', routerAuthCheck);

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		//check if user is Authenticated
		if (routerAuthCheck) {
			//user is Authenticated
			next();
		} else {
			//user is not authenticated
			router.replace('/');
		}
	}
	// Allow loading page by func next()
	else {
		store.commit('setUserIsAuthenticated', false);
		next();
	}
});
export default router;
