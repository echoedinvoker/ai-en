<template>
  <PageContainer>
    <!-- 功能區 -->
    <Card>
      <!-- 搜尋表單 -->
      <StaffSearchForm />
    </Card>

    <!-- 使用 DataTable 組件 -->
    <DataTable
      :data="staff"
      :columns="tableColumns"
      :loading="isFetching && staff.length === 0"
      :fetching="isFetching"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total-records="totalRecords"
      record-name="員工資料"
      empty-text="沒有符合條件的員工資料"
      @page-change="goToPage"
      @page-size-change="handlePageSizeChange"
      @retry="refetch"
    >
      <!-- 自定義角色欄位 -->
      <template #column-role="{ value }">
        <span :class="getRoleClass(value)" class="px-2 py-1 text-xs font-medium rounded-full">
          {{ getRoleText(value) }}
        </span>
      </template>

      <!-- 自定義狀態欄位 -->
      <template #column-status="{ value }">
        <span :class="getStatusClass(value)" class="px-2 py-1 text-xs font-medium rounded-full">
          {{ getStatusText(value) }}
        </span>
      </template>

      <!-- 自定義操作欄位 -->
      <template #column-actions="{ item }">
        <button @click="handleEdit(item)"
          class="text-blue-600 hover:text-blue-900 focus:outline-none p-1 rounded hover:bg-blue-50 cursor-pointer"
          title="編輯">
          <Edit2 :size="16" />
        </button>
      </template>
    </DataTable>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Edit2 } from 'lucide-vue-next'
import Card from '@/components/common/Card.vue'
import DataTable from '@/components/common/DataTable.vue'
import StaffSearchForm from './components/StaffSearchForm.vue'
import { useStaffList } from './composables/useStaffList'
import PageContainer from '@/components/common/PageContainer.vue'

// 使用 composable
const {
  pagination,
  staff,
  totalRecords,
  isLoading,
  isFetching,
  handleEdit,
  goToPage,
  handlePageSizeChange,
  getStatusClass,
  getStatusText,
  getRoleClass,
  getRoleText,
  refetch,
} = useStaffList()

// 定義表格欄位
const tableColumns = computed(() => [
  { key: 'email', title: 'Email' },
  { key: 'name', title: '姓名' },
  { key: 'role', title: '角色', align: 'center' as const },
  { key: 'status', title: '帳號狀態', align: 'center' as const },
  { key: 'actions', title: '操作', align: 'center' as const }
])
</script>

