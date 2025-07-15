import { fetchMenuItems } from '@/data/menuData';
import { useQuery } from '@tanstack/vue-query';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

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

// 當前選中的項目狀態
const activeParentKey = ref('account-management');
const activeChildKey = ref('teacher-member');

// 展開的菜單項目狀態
const expandedItems = ref(new Set([activeParentKey.value]));

export function useMenu() {
  const router = useRouter();

  // 使用 TanStack Query 獲取菜單資料
  const {
    data: menuItems,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['menu-items'],
    queryFn: fetchMenuItems,
  });

  // 計算當前的 breadcrumb
  const currentBreadcrumb = computed(() => {
    if (!menuItems.value) return { parent: '', child: '' };
    const parent = menuItems.value.find(item => item.key === activeParentKey.value);
    const child = parent?.children.find(item => item.key === activeChildKey.value);
    return {
      parent: parent?.label || '',
      child: child?.label || ''
    };
  });

  // 計算當前選中項目的完整資訊
  const currentMenuItem = computed(() => {
    if (!menuItems.value) return { parent: null, child: null, route: '' };
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

    // 找到對應的子項目並進行導航
    if (!menuItems.value) return;
    const parent = menuItems.value.find(item => item.key === parentKey);
    const child = parent?.children.find(item => item.key === childKey);

    if (child?.route) {
      router.push({ path: child.route }); // 使用 route 屬性進行導航
    }
  };

  // 根據路由設置當前選中項目
  const setActiveByRoute = (route: string) => {
    if (!menuItems.value) return;
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

