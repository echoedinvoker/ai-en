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
      path: '/account',
      children: [
        {
          path: 'teachers',
          name: 'AccountTeachers',
          component: () => import('@/views/account/teacher/TeachersPage.vue'),
        },
        {
          path: 'teachers/:id',
          name: 'AccountTeacherEdit',
          component: () => import('@/views/account/teacher/TeacherEditPage.vue'),
        },
        {
          path: 'students',
          name: 'AccountStudents',
          component: () => import('@/views/account/student/StudentsPage.vue'),
        },
        {
          path: 'students/:id',
          name: 'AccountStudentEdit',
          component: () => import('@/views/account/student/StudentEditPage.vue'),
        },
        {
          path: 'staff',
          name: 'AccountStaff',
          component: () => import('@/views/account/staff/StaffListPage.vue'),
        },
        {
          path: 'staff/:id',
          name: 'AccountStaffEdit',
          component: () => import('@/views/account/staff/StaffMemberEditPage.vue'),
        },
        {
          path: 'permissions',
          name: 'AccountPermissions',
          component: () => import('@/views/account/permission/PermissionListPage.vue'),
        },
        {
          path: 'permissions/:id',
          name: 'AccountStaffEdit',
          component: () => import('@/views/account/permission/PermissionEditPage.vue'),
        },
      ]
    }
  ],
})

export default router
