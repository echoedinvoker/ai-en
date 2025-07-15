<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <!-- Loading 狀態 -->
    <div v-if="loading" class="p-6 text-center">
      <div class="text-gray-500">載入中...</div>
    </div>

    <!-- Error 狀態 -->
    <div v-else-if="error" class="p-6 text-center">
      <div class="text-red-500">載入失敗：{{ error }}</div>
      <button @click="$emit('retry')" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        重新載入
      </button>
    </div>

    <!-- Table 區 -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="[
                'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider',
                column.align === 'center' ? 'text-center' :
                column.align === 'right' ? 'text-right' : 'text-left'
              ]"
            >
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <!-- 更新中的提示行 -->
          <tr v-if="fetching && data.length > 0">
            <td :colspan="columns.length" class="px-6 py-2 text-center text-gray-500 bg-blue-50">
              <div class="flex items-center justify-center space-x-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span>更新中...</span>
              </div>
            </td>
          </tr>

          <!-- 資料行 -->
          <tr v-for="(item, index) in data" :key="getRowKey(item, index)" class="hover:bg-gray-50">
            <td
              v-for="column in columns"
              :key="column.key"
              :class="[
                'px-6 py-4 whitespace-nowrap text-sm',
                column.align === 'center' ? 'text-center' :
                column.align === 'right' ? 'text-right' : 'text-left',
                column.textColor || 'text-gray-900'
              ]"
            >
              <!-- 使用 slot 自定義欄位內容 -->
              <slot
                :name="`column-${column.key}`"
                :item="item"
                :value="getColumnValue(item, column.key)"
                :index="index"
              >
                <!-- 預設顯示 -->
                {{ getColumnValue(item, column.key) }}
              </slot>
            </td>
          </tr>

          <!-- 無資料提示 -->
          <tr v-if="data.length === 0 && !fetching">
            <td :colspan="columns.length" class="px-6 py-4 text-center text-gray-500">
              {{ emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination 區域 -->
    <div v-if="showPagination" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- 資料統計 -->
          <div class="text-sm text-gray-700">
            顯示 {{ startRecord }} - {{ endRecord }} 筆，共 {{ totalRecords }} 筆{{ recordName }}
          </div>

          <!-- 每頁筆數選擇 -->
          <div v-if="showPageSizeSelector" class="flex items-center space-x-2">
            <label class="text-sm text-gray-700">每頁顯示：</label>
            <select
              :value="pageSize"
              @change="$emit('page-size-change', Number($event.target.value))"
              class="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option v-for="size in pageSizeOptions" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
            <span class="text-sm text-gray-700">筆</span>
          </div>
        </div>

        <!-- 分頁按鈕 -->
        <div class="flex items-center space-x-2">
          <button
            @click="$emit('page-change', 1)"
            :disabled="currentPage === 1"
            class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            首頁
          </button>

          <button
            @click="$emit('page-change', currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一頁
          </button>

          <div class="flex space-x-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="$emit('page-change', page)"
              :class="[
                'px-3 py-1 text-sm border rounded',
                page === currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="$emit('page-change', currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一頁
          </button>

          <button
            @click="$emit('page-change', totalPages)"
            :disabled="currentPage === totalPages"
            class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            末頁
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定義 Props 介面
interface Column {
  key: string
  title: string
  align?: 'left' | 'center' | 'right'
  textColor?: string
}

interface Props {
  // 表格資料
  data: any[]
  columns: Column[]

  // 狀態
  loading?: boolean
  error?: string
  fetching?: boolean

  // 分頁相關
  showPagination?: boolean
  currentPage?: number
  pageSize?: number
  totalRecords?: number
  showPageSizeSelector?: boolean
  pageSizeOptions?: number[]

  // 其他設定
  emptyText?: string
  recordName?: string
  rowKey?: string | ((item: any, index: number) => string | number)
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: '',
  fetching: false,
  showPagination: true,
  currentPage: 1,
  pageSize: 10,
  totalRecords: 0,
  showPageSizeSelector: true,
  pageSizeOptions: () => [5, 10, 20, 50],
  emptyText: '沒有資料',
  recordName: '資料',
  rowKey: 'id'
})

// 定義 Emits
const emit = defineEmits<{
  'page-change': [page: number]
  'page-size-change': [size: number]
  'retry': []
}>()

// 計算屬性
const totalPages = computed(() => Math.ceil(props.totalRecords / props.pageSize))

const startRecord = computed(() => {
  if (props.totalRecords === 0) return 0
  return (props.currentPage - 1) * props.pageSize + 1
})

const endRecord = computed(() => {
  const end = props.currentPage * props.pageSize
  return Math.min(end, props.totalRecords)
})

// 計算可見的頁碼
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = props.currentPage
  const delta = 2 // 當前頁前後顯示的頁數

  let start = Math.max(1, current - delta)
  let end = Math.min(total, current + delta)

  // 確保至少顯示 5 個頁碼（如果總頁數足夠）
  if (end - start < 4) {
    if (start === 1) {
      end = Math.min(total, start + 4)
    } else if (end === total) {
      start = Math.max(1, end - 4)
    }
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// 工具方法
const getColumnValue = (item: any, key: string) => {
  return key.split('.').reduce((obj, k) => obj?.[k], item)
}

const getRowKey = (item: any, index: number) => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(item, index)
  }
  return getColumnValue(item, props.rowKey) || index
}
</script>

