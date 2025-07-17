<template>
  <PageContainer>
    <SubListSearch />

    <DataTable
      :columns="tableColumns"
      :data="subscriptions"
      :loading="isFetching && subscriptions.length === 0"
      :fetching="isFetching"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total-records="totalRecords"
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
import PageContainer from '@/components/common/PageContainer.vue';
import SubListSearch from './components/SubListSearch.vue';
import DataTable from '@/components/common/DataTable.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSubList } from './composables/useSubList';
import type { SubItem } from './data/mockSubList';
import { Edit2 } from 'lucide-vue-next';

const router = useRouter()

const {
  subscriptions,
  isFetching,
  pagination,
  totalRecords,
  refetch,
  goToPage,
  handlePageSizeChange,
} = useSubList()

const tableColumns = computed(() => [
  { key: 'name', title: '訂閱項目名稱' },
  { key: 'message', title: '訂閱內容訊息' },
  { key: 'amount', title: '訂閱金額' },
  { key: 'period', title: '訂閱時間' },
  { key: 'status', title: '訂閱項目狀態' },
  { key: 'actions', title: '操作', align: 'center' as const }
]);

const getStatusClass = (status: string) => {
  return status === 'enabled'
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
  return status === 'enabled' ? '啟用' : '停用'
}

const handleEdit = (item: SubItem) => {
  router.push(`/backend/push/${item.id}`)
}
</script>
