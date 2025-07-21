<template>
  <PageContainer>
    <!-- 功能區 -->
    <Card>
      <PermissionSearchForm />
    </Card>

    <!-- 使用 DataTable 組件 -->
    <DataTable
      :data="permissions"
      :columns="tableColumns"
      :loading="isFetching && permissions.length === 0"
      :fetching="isFetching"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total-records="totalRecords"
      record-name="權限群組"
      empty-text="沒有符合條件的權限群組"
      @page-change="goToPage"
      @page-size-change="handlePageSizeChange"
      @retry="refetch"
    >
      <!-- 自定義狀態欄位 -->
      <template #column-status="{ value }">
        <span :class="getStatusClass(value)" class="px-2 py-1 text-xs font-medium rounded-full">
          {{ getStatusText(value) }}
        </span>
      </template>

      <!-- 自定義操作欄位 -->
      <template #column-actions="{ item }">
        <IconButton
          :icon="Edit2"
          :icon-size="16"
          variant="table-action"
          title="編輯"
          @click="handleEdit(item)"
        />
      </template>
    </DataTable>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Edit2 } from 'lucide-vue-next'
import Card from '@/components/common/Card.vue'
import DataTable from '@/components/common/DataTable.vue'
import PermissionSearchForm from './components/PermissionSearchForm.vue'
import { usePermissionList } from './composables/usePermissionList'
import PageContainer from '@/components/common/PageContainer.vue'
import IconButton from '@/components/common/IconButton.vue'

// 使用 composable
const {
  pagination,
  permissions,
  totalRecords,
  isLoading,
  isFetching,
  handleEdit,
  goToPage,
  handlePageSizeChange,
  getStatusClass,
  getStatusText,
  refetch,
} = usePermissionList()

// 定義表格欄位
const tableColumns = computed(() => [
  { key: 'role', title: '群組名稱' },
  { key: 'name', title: '名稱' },
  { key: 'number', title: '群組人數', align: 'center' as const },
  { key: 'status', title: '群組狀態', align: 'center' as const },
  { key: 'actions', title: '操作', align: 'center' as const }
])
</script>

