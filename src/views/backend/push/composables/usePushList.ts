import { computed, ref } from "vue";
import type { PushSearchParams } from "../data/mockPushList";
import { usePushListQuery } from "./usePushQuery";

export interface SearchForms {
  name: string;
  status: 'enabled' | 'disabled' | 'ALL';
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
}

// 全域共享狀態
const searchForm = ref<SearchForms>({
  name: '',
  status: 'ALL',
});

const activeSearchForm = ref<SearchForms>({
  name: '',
  status: 'ALL',
});

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
});

export function usePushList() {
  // 構建查詢參數
  const queryParams = computed<PushSearchParams>(() => ({
    name: activeSearchForm.value.name || undefined,
    status: activeSearchForm.value.status || undefined,
    page: pagination.value.currentPage,
    pageSize: pagination.value.pageSize,
  }))

  const {
    data: queryResult,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = usePushListQuery(queryParams);

  // 計算屬性
  const pushes = computed(() => queryResult.value?.data || []);
  const totalRecords = computed(() => queryResult.value?.total || 0);
  const totalPages = computed(() => Math.ceil(totalRecords.value / pagination.value.pageSize));

  const startRecord = computed(() => {
    if (totalRecords.value === 0) return 0;
    return (pagination.value.currentPage - 1) * pagination.value.pageSize + 1;
  })

  const endRecord = computed(() => {
    if (totalRecords.value === 0) return 0;
    return Math.min(pagination.value.currentPage * pagination.value.pageSize, totalRecords.value);
  });

  // 分頁按鈕計算
  const visiblePages = computed(() => {
    const current = pagination.value.currentPage
    const total = totalPages.value
    const pages: number[] = []

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, current - 2)
      const end = Math.min(total, current + 2)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }

    return pages
  })

  // 分頁操作
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value && page !== pagination.value.currentPage) {
      pagination.value.currentPage = page
    }
  }

  const handlePageSizeChange = (newPageSize: number) => {
    pagination.value.pageSize = newPageSize
    pagination.value.currentPage = 1
  }

  // 搜尋操作
  const handleSearch = () => {
    activeSearchForm.value = { ...searchForm.value }
    pagination.value.currentPage = 1
  }

  // 重置搜尋
  const handleReset = () => {
    searchForm.value = {
      name: '',
      status: 'ALL',
    }
    activeSearchForm.value = { ...searchForm.value }
    pagination.value.currentPage = 1
  }

  return {
    searchForm,
    activeSearchForm,
    pagination,
    queryParams,
    pushes, // 推播列表資料
    totalRecords,
    totalPages,
    startRecord,
    endRecord,
    visiblePages,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    handlePageSizeChange,
    handleSearch,
    handleReset,
    goToPage,
  };
}

