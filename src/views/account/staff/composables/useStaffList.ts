import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStaffListQuery } from './useStaffQuery'
import type { StaffListItem, StaffSearchParams } from '../data/mockStaffList'

export interface SearchForm {
  email: string
  name: string
  role: string
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
  role: 'ALL',
  status: 'ALL',
})

const activeSearchForm = ref<SearchForm>({
  email: '',
  name: '',
  role: 'ALL',
  status: 'ALL',
})

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
})

export function useStaffList() {
  const router = useRouter()

  // 構建查詢參數
  const queryParams = computed<StaffSearchParams>(() => ({
    email: activeSearchForm.value.email || undefined,
    name: activeSearchForm.value.name || undefined,
    role: activeSearchForm.value.role === 'ALL' ? undefined : activeSearchForm.value.role,
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
  } = useStaffListQuery(queryParams)

  // 從 Query 結果中提取資料
  const staff = computed(() => queryResult.value?.data || [])
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
      role: 'ALL',
      status: 'ALL',
    }
    activeSearchForm.value = { ...searchForm.value }
    pagination.value.currentPage = 1
  }

  // 員工操作
  const handleAddStaff = () => {
    console.log('新增員工')
  }

  const handleEdit = (staffMember: StaffListItem) => {
    router.push(`/account/staff/${staffMember.id}`)
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

  // 角色工具函數
  const getRoleClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'teacher':
        return 'bg-blue-100 text-blue-800'
      case 'assistant':
        return 'bg-cyan-100 text-cyan-800'
      case 'manager':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return '管理員'
      case 'teacher':
        return '教師'
      case 'assistant':
        return '助理'
      case 'manager':
        return '經理'
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
    staff,
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
    handleAddStaff,
    handleEdit,
    goToPage,
    handlePageSizeChange,
    getStatusClass,
    getStatusText,
    getRoleClass,
    getRoleText,
    refetch,
  }
}

