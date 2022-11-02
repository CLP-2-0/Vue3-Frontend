import { createRouter, createWebHistory} from 'vue-router';
import Home from '../components/Home.vue';
import Signup from '../components/Signup.vue';
import Dashboard from '../components/Dashboard.vue';
import Lesson from '../components/Lesson.vue';
import Course from '../components/Course.vue';


const router = createRouter({
    history : createWebHistory(),
    routes:[
        {
            path:'/', 
            name:'Home', 
            component: Home
        },
        {
            path:'/signup', 
            name:'SignUp', 
            component: Signup
        },
        {
            path:'/teacher/dashboard', 
            name:'Dashboard', 
            component: Dashboard
        },
        {
            path:'/teacher/dashboard/course', 
            name:'Course', 
            component: Course
        },
        {
            path:'/teacher/dashboard/course/lesson', 
            name:'Lesson', 
            component: Lesson
        },
    ],
    
})

export default router 