import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MyCoursesView from '@/views/MyCoursesView.vue'
import AllCoursesView from '@/views/AllCoursesView.vue'
import CourseDetailView from '@/views/CourseDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'home',
    component: HomeView,
    },
    {
    path: '/courses',
    name: 'myCourses',
    component: MyCoursesView,
    },
    {
    path: '/courses/all',
    name: 'allCourses',
    component: AllCoursesView,
    },
    {
    path: '/courses/:id',
    name: 'courseDetail',
    component: CourseDetailView,
    },
  ],
})

export default router
