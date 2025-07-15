import type { MenuItem } from "@/composables/useMenu";

export const mockMenuItems: MenuItem[] = [
  {
    key: 'account-management',
    label: '會員帳號管理',
    children: [
      { key: 'teacher-member', label: '教師會員', route: '/account/teachers' },
      { key: 'student-member', label: '學生會員', route: '/account/students' },
      { key: 'staff-member', label: '管理人員', route: '/account/staff' },
      { key: 'group-permission', label: '群組權限', route: '/account/permissions' }
    ]
  },
  {
    key: 'data-management',
    label: '資料管理',
    children: [
      { key: 'question-bank', label: '題庫管理', route: '/data/questions' },
      { key: 'class-management', label: '班級管理', route: '/data/classes' },
      { key: 'exam-management', label: '試題管理', route: '/data/exams' },
      { key: 'essay-management', label: '作文管理', route: '/data/essays' }
    ]
  },
  {
    key: 'backend-settings',
    label: '後台設定',
    children: [
      { key: 'push-notification', label: '推播訊息', route: '/backend/notifications' },
      { key: 'system-announcement', label: '系統公告', route: '/backend/announcements' },
      { key: 'subscription-settings', label: '訂閱設定', route: '/backend/subscriptions' }
    ]
  },
  {
    key: 'platform-data',
    label: '平台數據',
    children: [
      { key: 'dashboard', label: '數據儀表板', route: '/platform/dashboard' },
      { key: 'feedback', label: '功能滿意度回饋', route: '/platform/feedback' }
    ]
  }
];

// 未來的 API 函數 - 目前返回假資料
export async function fetchMenuItems(): Promise<MenuItem[]> {
  // TODO: 替換為真實的 API 呼叫
  // return await api.get('/menu-items');

  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMenuItems;
}

