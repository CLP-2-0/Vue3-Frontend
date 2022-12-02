import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Signup from '../components/Signup.vue';
import Dashboard from '../components/Dashboard.vue';
import Lesson from '../components/Lesson.vue';
import SectionDetail from '../components/SectionDetail.vue';
import PublisherDashboard from '../components/Publisher/PublisherDashboard.vue';
import LessonDetail from '@/components/Publisher/LessonDetail.vue';

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
			path: '/teacher/dashboard',
			name: 'Dashboard',
			component: Dashboard,
		},
		{
			path: '/teacher/dashboard/section',
			name: 'LessonList',
			component: SectionDetail,
		},
		{
			path: '/teacher/dashboard/section/lesson:id',
			name: 'Lesson',
			component: Lesson,
			props: true,
		},
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
	],
});

export default router;
