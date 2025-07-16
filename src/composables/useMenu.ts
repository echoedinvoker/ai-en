import { fetchMenuItems } from '@/data/menuData';
import { useQuery } from '@tanstack/vue-query';
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export interface MenuItem {
  key: string;
  label: string;
  children: Array<{
    key: string;
    label: string;
    route: string;
  }>;
}

// 移除硬編碼的初始值
const activeParentKey = ref('');
const activeChildKey = ref('');
const expandedItems = ref(new Set<string>());

export function useMenu() {
  const router = useRouter();
  const route = useRoute(); // 獲取當前路由

  const {
    data: menuItems,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['menu-items'],
    queryFn: fetchMenuItems,
  });

  // 根據路由設置當前選中項目
  const setActiveByRoute = (routePath: string) => {
    if (!menuItems.value) return;

    for (const parent of menuItems.value) {
      const child = parent.children.find(item => item.route === routePath);
      if (child) {
        activeParentKey.value = parent.key;
        activeChildKey.value = child.key;
        expandedItems.value.add(parent.key); // 自動展開對應的父項目
        return;
      }
    }
  };

  // 監聽菜單資料載入完成後，根據當前路由設定 active 狀態
  watch(menuItems, (newMenuItems) => {
    if (newMenuItems && route.path) {
      setActiveByRoute(route.path);
    }
  }, { immediate: true });

  // 監聽路由變化
  watch(() => route.path, (newPath) => {
    if (menuItems.value && newPath) {
      setActiveByRoute(newPath);
    }
  });

  const currentBreadcrumb = computed(() => {
    if (!menuItems.value) return { parent: '', child: '' };
    const parent = menuItems.value.find(item => item.key === activeParentKey.value);
    const child = parent?.children.find(item => item.key === activeChildKey.value);
    return {
      parent: parent?.label || '',
      child: child?.label || ''
    };
  });

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

  const toggleExpanded = (key: string) => {
    if (expandedItems.value.has(key)) {
      expandedItems.value.delete(key);
    } else {
      expandedItems.value.add(key);
    }
  };

  const selectChild = (parentKey: string, childKey: string) => {
    activeParentKey.value = parentKey;
    activeChildKey.value = childKey;

    if (!expandedItems.value.has(parentKey)) {
      expandedItems.value.add(parentKey);
    }

    if (!menuItems.value) return;
    const parent = menuItems.value.find(item => item.key === parentKey);
    const child = parent?.children.find(item => item.key === childKey);

    if (child?.route) {
      router.push({ path: child.route });
    }
  };

  const isExpanded = (key: string) => expandedItems.value.has(key);

  const isActive = (parentKey: string, childKey: string) => {
    return activeParentKey.value === parentKey && activeChildKey.value === childKey;
  };

  return {
    menuItems,
    activeParentKey,
    activeChildKey,
    expandedItems,
    currentBreadcrumb,
    currentMenuItem,
    toggleExpanded,
    selectChild,
    setActiveByRoute,
    isExpanded,
    isActive
  };
}
