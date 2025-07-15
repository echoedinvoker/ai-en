import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/account/teachers',
    },
    {
      path: '/account/teachers',
      name: 'AccountTeachers',
      component: () => import('@/views/account/TeachersPage.vue'),
    },
    {
      path: '/account/teachers/:id',
      name: 'AccountTeacherEdit',
      component: () => import('@/views/account/TeacherEditPage.vue'),
    },
    {
      path: '/account/students',
      name: 'AccountStudents',
      component: () => import('@/views/account/StudentsPage.vue'),
    },
    {
      path: '/account/students/:id',
      name: 'AccountStudentEdit',
      component: () => import('@/views/account/StudentEditPage.vue'),
    },
  ],
})

export default router
