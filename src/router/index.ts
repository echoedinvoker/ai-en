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
          name: 'AccountPermissionEdit',
          component: () => import('@/views/account/permission/PermissionEditPage.vue'),
        },
      ]
    },
    {
      path: '/data',
      children: [
        {
          path: 'questions',
          name: 'DataQuestions',
          component: () => import('@/views/data/question/QuestionListPage.vue'),
        },
        {
          path: 'questions/create',
          name: 'DataQuestionCreate',
          component: () => import('@/views/data/question/QuestionCreatePage.vue'),
        },
        {
          path: 'questions/import',
          name: 'DataQuestionImport',
          component: () => import('@/views/data/question/QuestionImportPage.vue'),
        },
        {
          path: 'essays',
          name: 'DataEssays',
          component: () => import('@/views/data/essay/EssayListPage.vue'),
        },
        {
          path: 'essays/:id',
          name: 'DataEssayDetail',
          component: () => import('@/views/data/essay/EssayDetailPage.vue'),
        }
      ]
    },
    {
      path: '/backend',
      children: [
        {
          path: 'push',
          name: 'BackendPush',
          component: () => import('@/views/backend/push/PushListPage.vue'),
        },
        {
          path: 'push/:id',
          name: 'BackendPushEdit',
          component: () => import('@/views/backend/push/PushDetailPage.vue'),
        },
        {
          path: 'push/create',
          name: 'BackendPushCreate',
          component: () => import('@/views/backend/push/PushCreatePage.vue'),
        },
        {
          path: 'sys',
          name: 'BackendSys',
          component: () => import('@/views/backend/system/SysListPage.vue'),
        },
        {
          path: 'sys/:id',
          name: 'BackendSysEdit',
          component: () => import('@/views/backend/system/SysDetailPage.vue'),
        },
        {
          path: 'sys/create',
          name: 'BackendSysCreate',
          component: () => import('@/views/backend/system/SysCreatePage.vue'),
        },
        {
          path: 'sub',
          name: 'SubscriptionList',
          component: () => import('@/views/backend/subscription/SubListPage.vue'),
        },
        {
          path: 'sub/create',
          name: 'SubscriptionCreate',
          component: () => import('@/views/backend/subscription/SubCreatePage.vue'),
        },
      ]
    }
  ],
})

export default router

