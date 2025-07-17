import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentsListQuery } from './useStudentsQuery'
import type { StudentListResponse, StudentListItem, StudentSearchParams } from '../data/mockStudentsList'
import { useDataTable } from '@/composables/useDataTable'
import { watch } from 'vue'

export interface SearchForm {
  email: string
  name: string
  status: string
}

const data = ref<StudentListResponse | null>(null)

// 模塊級別的狀態（單例模式）
const searchForm = ref<SearchForm>({
  email: '',
  name: '',
  status: 'ALL',
})

const activeSearchForm = ref<SearchForm>({
  email: '',
  name: '',
  status: 'ALL',
})

export function useStudentsList() {
  const router = useRouter()
  const dataTable = useDataTable(data)

  // 構建查詢參數
  const queryParams = computed<StudentSearchParams>(() => ({
    email: activeSearchForm.value.email || undefined,
    name: activeSearchForm.value.name || undefined,
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
  } = useStudentsListQuery(queryParams)

  // refresh data when query result changes
  watch(queryResult, (newData) => {
    if (newData) {
      data.value = newData
    }
  }, { immediate: true })

  // 從 Query 結果中提取資料
  const students = computed(() => queryResult.value?.data || [])

  // 搜尋操作
  const handleSearch = () => {
    activeSearchForm.value = { ...searchForm.value }
    dataTable.pagination.value.currentPage = 1
  }

  // 重置搜尋
  const handleReset = () => {
    searchForm.value = {
      email: '',
      name: '',
      status: 'ALL',
    }
    activeSearchForm.value = { ...searchForm.value }
    dataTable.pagination.value.currentPage = 1
  }

  // 學生操作
  const handleAddStudent = () => {
    console.log('新增學生')
  }

  const handleEdit = (student: StudentListItem) => {
    router.push(`/account/students/${student.id}`)
  }

  // 狀態工具函數
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '啟用中'
      case 'suspended':
        return '停權中'
      case 'reserved':
        return '保留'
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
    students,
    isError,
    error,
    isFetching,

    // 方法
    handleSearch,
    handleReset,
    handleAddStudent,
    handleEdit,
    getStatusClass,
    getStatusText,
    refetch,
  }
}

