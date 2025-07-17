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

export interface BreadcrumbItem {
  label: string;
  route?: string;
}

const activeParentKey = ref('');
const activeChildKey = ref('');
const expandedItems = ref(new Set<string>());

export function useMenu() {
  const router = useRouter();
  const route = useRoute();

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
        expandedItems.value.add(parent.key);
        return;
      }

      // 檢查是否為子路由（例如 /account/students/123）
      const childMatch = parent.children.find(item => routePath.startsWith(item.route + '/'));
      if (childMatch) {
        activeParentKey.value = parent.key;
        activeChildKey.value = childMatch.key;
        expandedItems.value.add(parent.key);
        return;
      }
    }
  };

  // 生成動態 breadcrumb
  const breadcrumbItems = computed((): BreadcrumbItem[] => {
    if (!menuItems.value) return [];

    const parent = menuItems.value.find(item => item.key === activeParentKey.value);
    const child = parent?.children.find(item => item.key === activeChildKey.value);

    if (!parent || !child) return [];

    const items: BreadcrumbItem[] = [
      { label: parent.label },
      { label: child.label, route: child.route }
    ];

    // 檢查是否為詳細頁面或創建頁面
    const currentPath = route.path;
    const basePath = child.route;

    if (currentPath !== basePath && currentPath.startsWith(basePath + '/')) {
      const remainingPath = currentPath.substring(basePath.length + 1);

      // 根據路由名稱或路徑判斷第三層標題
      if (remainingPath === 'create') {
        items.push({ label: `新增${child.label.replace('管理', '').replace('會員', '')}` });
      } else if (remainingPath.match(/^\d+$/)) {
        // 如果是數字ID，顯示編輯頁面
        items.push({ label: `編輯${child.label.replace('管理', '').replace('會員', '')}` });
      } else if (remainingPath === 'import') {
        items.push({ label: `匯入${child.label.replace('管理', '')}` });
      } else {
        // 其他情況，可以根據路由名稱來判斷
        const routeName = route.name as string;
        if (routeName?.includes('Edit')) {
          items.push({ label: `編輯${child.label.replace('管理', '').replace('會員', '')}` });
        } else if (routeName?.includes('Create')) {
          items.push({ label: `新增${child.label.replace('管理', '').replace('會員', '')}` });
        } else if (routeName?.includes('Detail')) {
          items.push({ label: `詳細資訊` });
        } else {
          items.push({ label: remainingPath });
        }
      }
    }

    return items;
  });

  // 保持原有的 currentBreadcrumb 以維持向後兼容
  const currentBreadcrumb = computed(() => {
    if (!menuItems.value) return { parent: '', child: '' };
    const parent = menuItems.value.find(item => item.key === activeParentKey.value);
    const child = parent?.children.find(item => item.key === activeChildKey.value);
    return {
      parent: parent?.label || '',
      child: child?.label || ''
    };
  });

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
    breadcrumbItems, // 新增的動態 breadcrumb
    currentMenuItem,
    toggleExpanded,
    selectChild,
    setActiveByRoute,
    isExpanded,
    isActive
  };
}

