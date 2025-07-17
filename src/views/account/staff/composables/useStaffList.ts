import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStaffListQuery } from './useStaffQuery'
import type { StaffListItem, StaffListResponse, StaffSearchParams } from '../data/mockStaffList'
import { useDataTable } from '@/composables/useDataTable'
import { watch } from 'vue'

export interface SearchForm {
  email: string
  name: string
  role: string
  status: string
}

const data = ref<StaffListResponse | null>(null)

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

export function useStaffList() {
  const router = useRouter()
  const dataTable = useDataTable(data)

  // 構建查詢參數
  const queryParams = computed<StaffSearchParams>(() => ({
    email: activeSearchForm.value.email || undefined,
    name: activeSearchForm.value.name || undefined,
    role: activeSearchForm.value.role === 'ALL' ? undefined : activeSearchForm.value.role,
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
  } = useStaffListQuery(queryParams)

  watch(queryResult, (newData) => {
    if (newData) {
      data.value = newData
    }
  }, { immediate: true })

  // 從 Query 結果中提取資料
  const staff = computed(() => queryResult.value?.data || [])

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
      role: 'ALL',
      status: 'ALL',
    }
    activeSearchForm.value = { ...searchForm.value }
    dataTable.pagination.value.currentPage = 1
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
    ...dataTable,

    // 狀態（現在是共享的）
    searchForm,
    activeSearchForm,

    // Query 狀態
    staff,
    isLoading,
    isError,
    error,
    isFetching,

    // 方法
    handleSearch,
    handleReset,
    handleAddStaff,
    handleEdit,
    getStatusClass,
    getStatusText,
    getRoleClass,
    getRoleText,
    refetch,
  }
}

