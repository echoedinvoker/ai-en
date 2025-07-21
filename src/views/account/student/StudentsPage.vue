<template>
  <PageContainer>
    <!-- 功能區 -->
    <Card>
      <!-- 搜尋表單 -->
      <StudentSearchForm />
    </Card>

    <!-- 使用 DataTable 組件 -->
    <DataTable
      :data="students"
      :columns="tableColumns"
      :loading="isFetching && students.length === 0"
      :fetching="isFetching"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total-records="totalRecords"
      :sort-field="sorting.field"
      :sort-order="sorting.order"
      record-name="學生資料"
      empty-text="沒有符合條件的學生資料"
      @page-change="goToPage"
      @page-size-change="handlePageSizeChange"
      @sort-change="handleSortChange"
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
import StudentSearchForm from './components/StudentSearchForm.vue'
import { useStudentsList } from './composables/useStudentsList'
import PageContainer from '@/components/common/PageContainer.vue'
import IconButton from '@/components/common/IconButton.vue'

// 使用 composable
const {
  pagination,
  sorting,
  students,
  totalRecords,
  isFetching,
  handleEdit,
  goToPage,
  handlePageSizeChange,
  handleSortChange,
  getStatusClass,
  getStatusText,
  refetch,
} = useStudentsList()

// 定義表格欄位 - 設定哪些欄位可排序
const tableColumns = computed(() => [
  { key: 'email', title: 'Email', sortable: true },
  { key: 'name', title: '姓名', sortable: true },
  { key: 'status', title: '帳號狀態', align: 'center' as const, sortable: true },
  { key: 'actions', title: '操作', align: 'center' as const }  // 操作欄位不可排序
])
</script>

