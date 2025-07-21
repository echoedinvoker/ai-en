import type { Ref } from "vue"
import { computed, ref } from "vue"

export interface Pagination {
  currentPage: number
  pageSize: number
}

export interface Sorting {
  field: string
  order: 'asc' | 'desc'
}

export function useDataTable(data: Ref) {
  const pagination = ref<Pagination>({
    currentPage: 1,
    pageSize: 10,
  })

  // 新增排序狀態
  const sorting = ref<Sorting>({
    field: '',
    order: 'asc'
  })

  const totalRecords = computed(() => data.value?.total || 0)
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

  // 排序操作
  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    sorting.value.field = field
    sorting.value.order = order
    // 排序時回到第一頁
    pagination.value.currentPage = 1
  }

  return {
    pagination,
    sorting,
    totalRecords,
    totalPages,
    startRecord,
    endRecord,
    visiblePages,
    goToPage,
    handlePageSizeChange,
    handleSortChange,
  }
}

