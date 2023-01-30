import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Signup from '../components/Signup.vue';
import Dashboard from '../components/Dashboard.vue';
import Lesson from '../components/Lesson.vue';
import SectionDetail from '../components/SectionDetail.vue';
import PublisherDashboard from '../components/Publisher/PublisherDashboard.vue';
import LessonDetail from '@/components/Publisher/LessonDetail.vue';
import NewStudent from '@/components/NewStudent.vue';

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
			path: '/teacher',
			children: [
				{
					path: 'dashboard',
					name: 'Dashboard',
					component: Dashboard,
					props: true,
				},
				{
					path: ':sid',
					name: 'SectionDetail',
					component: SectionDetail,
					props: true,
				},
			]
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
				},
		// 	]
		// },
		
		{
			path: '/publisher/dashboard',
			name: 'Publisher Dashboard',
			component: PublisherDashboard,
		},
		{
			path: '/publisher/dashboard/:id',
			name: 'Lesson Detail',
			component: LessonDetail,
			props: true,
		},
		{
			path: '/student',
			name: 'New Student',
			component: NewStudent,
			props: true,
		},
	],
});

export default router;
