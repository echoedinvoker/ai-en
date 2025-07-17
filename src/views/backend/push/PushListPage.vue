<template>
  <PageContainer>
    <!-- 搜尋表單 -->
    <Card class="mb-4">
      <div class="grid grid-cols-3 gap-4">
        <!-- 推播名稱搜尋 -->
        <div>
          <BaseInput
            v-model="searchForm.name"
            type="text"
            label="推播名稱"
            placeholder="輸入推播名稱"
          />
        </div>

        <!-- 推播狀態搜尋 -->
        <div>
          <BaseSelect
            v-model="searchForm.status"
            label="推播狀態"
            placeholder="選擇推播狀態"
            :options="statusOptions"
          />
        </div>

        <!-- 搜尋和重置按鈕 -->
        <div class="self-end flex gap-2">
          <IconButton
            @click="handleSearch"
            :icon="Search"
            title="搜尋"
          />
        </div>

        <!-- 增加推播按鈕 -->
        <div class="justify-self-start">
          <IconButton
            @click="handleAddPush"
            :icon="MessageCirclePlus"
            title="新增推播"
          />
        </div>
      </div>
    </Card>

    <!-- 資料表格 -->
    <DataTable
      :columns="tableColumns"
      :data="pushes"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total-records="totalRecords"
      :loading="isLoading || isFetching"
      record-name="推播"
      empty-text="沒有符合條件的推播資料"
      @page-change="goToPage"
      @page-size-change="handlePageSizeChange"
      @retry="refetch"
    >
      <!-- 推播訊息欄位 - 限制顯示長度 -->
      <template #column-message="{ item }">
        <div class="max-w-xs">
          <p class="truncate" :title="item.message">
            {{ item.message }}
          </p>
        </div>
      </template>

      <!-- 推播時間欄位 - 格式化顯示 -->
      <template #column-publishTime="{ item }">
        <span class="text-sm text-gray-600">
          {{ formatDateTime(item.publishTime) }}
        </span>
      </template>

      <!-- 推播狀態欄位 - 狀態標籤 -->
      <template #column-status="{ item }">
        <span
          :class="getStatusClass(item.status)"
          class="px-2 py-1 rounded-full text-xs font-medium"
        >
          {{ getStatusText(item.status) }}
        </span>
      </template>

      <!-- 操作欄位 -->
      <template #column-actions="{ item }">
        <div class="flex items-center justify-center">
          <button
            @click="handleEdit(item)"
            class="text-blue-600 hover:text-blue-900 focus:outline-none p-1 rounded hover:bg-blue-50 cursor-pointer"
            title="編輯推播"
          >
            <Edit2 :size="16" />
          </button>
        </div>
      </template>
    </DataTable>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PageContainer from '@/components/common/PageContainer.vue'
import Card from '@/components/common/Card.vue'
import DataTable from '@/components/common/DataTable.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import IconButton from '@/components/common/IconButton.vue'
import { usePushList } from './composables/usePushList'
import { Search, Edit2, MessageCirclePlus } from 'lucide-vue-next'
import type { PushItem } from './data/mockPushList'
import { useRouter } from 'vue-router'

// 使用 composable
const {
  searchForm,
  pagination,
  pushes,
  totalRecords,
  isLoading,
  isFetching,
  handleSearch,
  handlePageSizeChange,
  goToPage,
  refetch
} = usePushList()

const router = useRouter()

// 狀態選項
const statusOptions = [
  { label: 'ALL', value: 'ALL' },
  { label: '啟用', value: 'enabled' },
  { label: '停用', value: 'disabled' }
]

// 表格欄位定義
const tableColumns = computed(() => [
  { key: 'name', title: '推播名稱', width: '200px' },
  { key: 'message', title: '推播訊息', width: '300px' },
  { key: 'publishTime', title: '推播時間', align: 'center' as const, width: '180px' },
  { key: 'status', title: '推播狀態', align: 'center' as const, width: '120px' },
  { key: 'actions', title: '操作', align: 'center' as const, width: '120px' }
])

// 格式化日期時間
const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime)
  return date.toLocaleString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 獲取狀態樣式
const getStatusClass = (status: string) => {
  return status === 'enabled'
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800'
}

// 獲取狀態文字
const getStatusText = (status: string) => {
  return status === 'enabled' ? '啟用' : '停用'
}

// 事件處理函數
const handleAddPush = () => {
  router.push(`/backend/push/create`)
}

const handleEdit = (item: PushItem) => {
  router.push(`/backend/push/${item.id}`)
}

const handleDelete = (item: PushItem) => {
  // TODO: 實現刪除推播功能
  console.log('刪除推播:', item)
}

const handleToggleStatus = (item: PushItem) => {
  // TODO: 實現切換推播狀態功能
  console.log('切換推播狀態:', item)
}
</script>

