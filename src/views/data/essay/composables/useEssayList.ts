import { computed, ref } from "vue";
import type { EssayListResponse, EssaySearchParams } from "../data/mockEssayList";
import { useEssayListQuery } from "./useEssayQuery";
import { useDataTable } from "@/composables/useDataTable";
import { watch } from "vue";

export interface SearchForms {
  id: string;
  name: string;
  author: string;
}

const data = ref<EssayListResponse | null>(null);

const searchForm = ref<SearchForms>({
  id: '',
  name: '',
  author: '',
});

const activeSearchForm = ref<SearchForms>({
  id: '',
  name: '',
  author: '',
});

export function useEssayList() {
  const dataTable = useDataTable(data);

  // 構建查詢參數
  const queryParams = computed<EssaySearchParams>(() => ({
    id: activeSearchForm.value.id || undefined, // 保持為字串，不要轉換為數字
    name: activeSearchForm.value.name || undefined,
    author: activeSearchForm.value.author || undefined,
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
  } = useEssayListQuery(queryParams);

  watch(queryResult, (newData) => {
    if (newData) {
      data.value = newData;
    }
  }, { immediate: true });

  const essays = computed(() => queryResult.value?.data || []);

  // 搜尋操作
  const handleSearch = () => {
    activeSearchForm.value = { ...searchForm.value }
    dataTable.pagination.value.currentPage = 1
  }

  // 重置搜尋
  const handleReset = () => {
    searchForm.value = {
      id: '',
      name: '',
      author: '',
    }
    activeSearchForm.value = { ...searchForm.value }
    dataTable.pagination.value.currentPage = 1
  }

  return {
    ...dataTable,
    searchForm,
    activeSearchForm,
    queryParams,
    essays,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    handleSearch,
    handleReset,
  };
}


