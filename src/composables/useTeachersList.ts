import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeachersListQuery } from './useTeachersQuery'
import type { TeacherListItem, TeacherSearchParams } from '@/data/mockTeachers'

export interface SearchForm {
  email: string
  name: string
  status: string
}

export interface Pagination {
  currentPage: number
  pageSize: number
}

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

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
})

export function useTeachersList() {
  const router = useRouter()

  // 構建查詢參數
  const queryParams = computed<TeacherSearchParams>(() => ({
    email: activeSearchForm.value.email || undefined,
    name: activeSearchForm.value.name || undefined,
    status: activeSearchForm.value.status === 'ALL' ? undefined : activeSearchForm.value.status,
    page: pagination.value.currentPage,
    pageSize: pagination.value.pageSize,
  }))

  // 使用 Query 獲取資料
  const {
    data: queryResult,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useTeachersListQuery(queryParams)

  // 從 Query 結果中提取資料
  const teachers = computed(() => queryResult.value?.data || [])
  const totalRecords = computed(() => queryResult.value?.total || 0)
  const totalPages = computed(() => Math.ceil(totalRecords.value / pagination.value.pageSize))

  const startRecord = computed(() => {
    if (totalRecords.value === 0) return 0
    return (pagination.value.currentPage - 1) * pagination.value.pageSize + 1
  })

  const endRecord = computed(() => {
    const end = pagination.value.currentPage * pagination.value.pageSize
    return Math.min(end, totalRecords.value)
  })

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
    console.log('更新分頁大小:', newPageSize)
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
      email: '',
      name: '',
      status: 'ALL',
    }
    activeSearchForm.value = { ...searchForm.value }
    pagination.value.currentPage = 1
  }

  // 教師操作
  const handleAddTeacher = () => {
    console.log('新增教師')
  }

  const handleEdit = (teacher: TeacherListItem) => {
    router.push(`/account/teachers/${teacher.id}`)
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
    // 狀態（現在是共享的）
    searchForm,
    activeSearchForm,
    pagination,

    // Query 狀態
    teachers,
    totalRecords,
    totalPages,
    startRecord,
    endRecord,
    visiblePages,
    isLoading,
    isError,
    error,
    isFetching,

    // 方法
    handleSearch,
    handleReset,
    handleAddTeacher,
    handleEdit,
    goToPage,
    handlePageSizeChange,
    getStatusClass,
    getStatusText,
    refetch,
  }
}

