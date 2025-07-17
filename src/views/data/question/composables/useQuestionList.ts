import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionBankListQuery } from './useQuestionQuery'
import type { QuestionBankListResponse, QuestionBankItem, QuestionBankSearchParams } from '../data/mockQuestionList'
import { useDataTable } from '@/composables/useDataTable'
import { watch } from 'vue'

export interface SearchForm {
  id: string  // 改為 string 型別，因為表單輸入是文字
  name: string
  source: string
  status: string
}

const data = ref<QuestionBankListResponse | null>(null)

// 模塊級別的狀態（單例模式）
const searchForm = ref<SearchForm>({
  id: '',
  name: '',
  source: '',
  status: 'ALL',
})

const activeSearchForm = ref<SearchForm>({
  id: '',
  name: '',
  source: '',
  status: 'ALL',
})

export function useQuestionBankList() {
  const router = useRouter()
  const dataTable = useDataTable(data)

  // 構建查詢參數
  const queryParams = computed<QuestionBankSearchParams>(() => ({
    id: activeSearchForm.value.id ? Number(activeSearchForm.value.id) : undefined,  // 轉換為數字
    name: activeSearchForm.value.name || undefined,
    source: activeSearchForm.value.source || undefined,
    status: activeSearchForm.value.status === 'ALL' ? undefined : activeSearchForm.value.status,
    page: dataTable.pagination.value.currentPage,
    pageSize: dataTable.pagination.value.pageSize,
  }))

  // 使用 Query 獲取資料
  const {
    data: queryResult,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuestionBankListQuery(queryParams)

  watch(queryResult, (newData) => {
    if (newData) {
      data.value = newData
    }
  }, { immediate: true })

  // 從 Query 結果中提取資料
  const questionBanks = computed(() => queryResult.value?.data || [])

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
      source: '',
      status: 'ALL',
    }
    activeSearchForm.value = { ...searchForm.value }
    dataTable.pagination.value.currentPage = 1
  }

  // 題庫操作
  const handleAddQuestionBank = () => {
    router.push('/data/questions/create')
  }

  const handleImportQuestionBank = () => {
    router.push('/data/questions/import')
  }

  const handleEdit = (questionBank: QuestionBankItem) => {
    router.push(`/data/questions/${questionBank.id}`)
  }

  // 狀態工具函數
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'unpublished':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return '上架中'
      case 'unpublished':
        return '未上架'
      case 'archived':
        return '已下架'
      default:
        return '未知'
    }
  }

  return {
    ...dataTable,

    // 狀態（現在是共享的）
    searchForm,
    activeSearchForm,

    // Query 狀態
    questionBanks,
    isLoading,
    isError,
    error,
    isFetching,

    // 方法
    handleSearch,
    handleReset,
    handleAddQuestionBank,
    handleImportQuestionBank,
    handleEdit,
    getStatusClass,
    getStatusText,
    refetch,
  }
}
