<template>
  <PageContainer>
    <SysListSearch />

    <DataTable
      :columns="tableColumns"
      :data="systems"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total-records="totalRecords"
      :loading="isLoading || isFetching"
      record-name="公告"
      empty-text="沒有符合條件的公告資料"
      @page-change="goToPage"
      @page-size-change="handlePageSizeChange"
      @retry="refetch"
    >
      <!-- 公告訊息欄位 - 限制顯示長度 -->
      <template #column-message="{ item }">
        <div class="max-w-xs">
          <p class="truncate" :title="item.message">
            {{ item.message }}
          </p>
        </div>
      </template>

      <!-- 上線時間欄位 - 僅顯示時間 -->
      <template #column-upTime="{ item }">
        <span class="text-sm text-gray-600">
          {{ formatTime(item.upTime, false) }}
        </span>
      </template>

      <!-- 下線時間欄位 - 僅顯示時間 -->
      <template #column-downTime="{ item }">
        <span class="text-sm text-gray-600">
          {{ formatTime(item.downTime, false) }}
        </span>
      </template>

      <!-- 公告狀態欄位 - 狀態標籤 -->
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
            title="編輯公告"
          >
            <Edit2 :size="16" />
          </button>
        </div>
      </template>
    </DataTable>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue';
import SysListSearch from './components/SysListSearch.vue';
import DataTable from '@/components/common/DataTable.vue';
import { useSysList } from './composables/useSysList';
import type { SysItem } from './data/mockSysList';
import { useRouter } from 'vue-router';
import { Edit2 } from 'lucide-vue-next';
import { formatTime } from '@/utils/dateTime';

const router = useRouter()

const {
  systems,
  pagination,
  totalRecords,
  isLoading,
  isFetching,
  goToPage,
  handlePageSizeChange,
  refetch
} = useSysList()

const tableColumns = [
  { key: 'name', title: '公告名稱' },
  { key: 'message', title: '公告訊息' },
  { key: 'upTime', title: '上線時間' },
  { key: 'downTime', title: '下線時間' },
  { key: 'status', title: '公告狀態' },
  { key: 'actions', title: '操作', align: 'center' as const }
];

// 獲取狀態樣式
const getStatusClass = (status: string) => {
  return status === 'enable'
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800'
}

// 獲取狀態文字
const getStatusText = (status: string) => {
  return status === 'enable' ? '啟用' : '停用'
}

const handleEdit = (item: SysItem) => {
  router.push(`/backend/sys/${item.id}`)
}
</script>

