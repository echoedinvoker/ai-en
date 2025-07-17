import { computed, ref, watch } from "vue";
import type { SubListResponse, SubSearchParams } from "../data/mockSubList";
import { useSubListQuery } from "./useSubQUery";
import { useDataTable } from "@/composables/useDataTable";

export interface SearchForms {
  name: string;
  status: 'enabled' | 'disabled' | 'ALL';
}

const data = ref<SubListResponse | null>(null);

// 全域共享狀態
const searchForm = ref<SearchForms>({
  name: '',
  status: 'ALL',
});

const activeSearchForm = ref<SearchForms>({
  name: '',
  status: 'ALL',
});

export function useSubList() {
  const dataTable = useDataTable(data);

  // 構建查詢參數
  const queryParams = computed<SubSearchParams>(() => ({
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
  } = useSubListQuery(queryParams);

  // 監聽查詢結果變化，更新本地資料
  watch(queryResult, (newData) => {
    if (newData) {
      data.value = newData;
    }
  }, { immediate: true });

  // 計算屬性 - 訂閱方案列表資料
  const subscriptions = computed(() => data.value?.data || []);

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
    subscriptions, // 訂閱方案列表資料
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    handleSearch,
    handleReset,
  };
}

