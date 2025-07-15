import { ref, computed } from 'vue';

// 菜單項目類型定義
export interface MenuItem {
  key: string;
  label: string;
  children: Array<{
    key: string;
    label: string;
    route: string;
  }>;
}

// 將菜單資料定義在函數外部，實現全域共享狀態
const menuItems = ref<MenuItem[]>([
  {
    key: 'account-management',
    label: '會員帳號管理',
    children: [
      { key: 'teacher-member', label: '教師會員', route: '/account/teachers' },
      { key: 'student-member', label: '學生會員', route: '/account/students' },
      { key: 'admin-member', label: '管理人員', route: '/account/admins' },
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
]);

// 當前選中的項目狀態
const activeParentKey = ref('account-management');
const activeChildKey = ref('teacher-member');

// 展開的菜單項目狀態
const expandedItems = ref(new Set([activeParentKey.value]));

export function useMenu() {
  // 計算當前的 breadcrumb
  const currentBreadcrumb = computed(() => {
    const parent = menuItems.value.find(item => item.key === activeParentKey.value);
    const child = parent?.children.find(item => item.key === activeChildKey.value);
    return {
      parent: parent?.label || '',
      child: child?.label || ''
    };
  });

  // 計算當前選中項目的完整資訊
  const currentMenuItem = computed(() => {
    const parent = menuItems.value.find(item => item.key === activeParentKey.value);
    const child = parent?.children.find(item => item.key === activeChildKey.value);
    return {
      parent,
      child,
      route: child?.route || ''
    };
  });

  // 切換菜單項目展開狀態
  const toggleExpanded = (key: string) => {
    if (expandedItems.value.has(key)) {
      expandedItems.value.delete(key);
    } else {
      expandedItems.value.add(key);
    }
  };

  // 選擇子項目
  const selectChild = (parentKey: string, childKey: string) => {
    activeParentKey.value = parentKey;
    activeChildKey.value = childKey;

    // 確保選中項目的父級是展開的
    if (!expandedItems.value.has(parentKey)) {
      expandedItems.value.add(parentKey);
    }
  };

  // 根據路由設置當前選中項目
  const setActiveByRoute = (route: string) => {
    for (const parent of menuItems.value) {
      const child = parent.children.find(item => item.route === route);
      if (child) {
        selectChild(parent.key, child.key);
        break;
      }
    }
  };

  // 檢查項目是否展開
  const isExpanded = (key: string) => expandedItems.value.has(key);

  // 檢查項目是否為當前選中
  const isActive = (parentKey: string, childKey: string) => {
    return activeParentKey.value === parentKey && activeChildKey.value === childKey;
  };

  return {
    // 狀態
    menuItems,
    activeParentKey,
    activeChildKey,
    expandedItems,

    // 計算屬性
    currentBreadcrumb,
    currentMenuItem,

    // 方法
    toggleExpanded,
    selectChild,
    setActiveByRoute,
    isExpanded,
    isActive
  };
}

