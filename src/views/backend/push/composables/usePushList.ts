import { computed, ref } from "vue";
import type { PushListResponse, PushSearchParams } from "../data/mockPushList";
import { usePushListQuery } from "./usePushQuery";
import { useDataTable } from "@/composables/useDataTable";
import { watch } from "vue";

export interface SearchForms {
  name: string;
  status: 'enabled' | 'disabled' | 'ALL';
}

const data = ref<PushListResponse | null>(null);

// 全域共享狀態
const searchForm = ref<SearchForms>({
  name: '',
  status: 'ALL',
});

const activeSearchForm = ref<SearchForms>({
  name: '',
  status: 'ALL',
});

export function usePushList() {
  const dataTable = useDataTable(data);

  // 構建查詢參數
  const queryParams = computed<PushSearchParams>(() => ({
    name: activeSearchForm.value.name || undefined,
    status: activeSearchForm.value.status || undefined,
    page: dataTable.pagination.value.currentPage,
    pageSize: dataTable.pagination.value.pageSize,
  }))

  const {
    data: queryResult,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = usePushListQuery(queryParams);

  watch(queryResult, (newData) => {
    if (newData) {
      data.value = newData;
    }
  }, { immediate: true });

  // 計算屬性
  const pushes = computed(() => data.value?.data || []);


  // 搜尋操作
  const handleSearch = () => {
    activeSearchForm.value = { ...searchForm.value }
    dataTable.pagination.value.currentPage = 1
  }

  // 重置搜尋
  const handleReset = () => {
    searchForm.value = {
      name: '',
      status: 'ALL',
    }
    activeSearchForm.value = { ...searchForm.value }
    dataTable.pagination.value.currentPage = 1
  }

  return {
    ...dataTable,
    searchForm,
    activeSearchForm,
    queryParams,
    pushes, // 推播列表資料
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    handleSearch,
    handleReset,
  };
}

