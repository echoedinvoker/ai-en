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
    }
  ],
})

export default router
