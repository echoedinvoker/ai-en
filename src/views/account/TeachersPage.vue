<template>
  <div class="p-6 space-y-6">
    <!-- 功能區 -->
    <div class="bg-white rounded-lg shadow p-6">
      <!-- 搜尋表單 -->
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">教師 Email</label>
          <input v-model="searchForm.email" type="email" placeholder="輸入教師 Email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">教師姓名</label>
          <input v-model="searchForm.name" type="text" placeholder="輸入教師姓名"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">帳號狀態</label>
          <select v-model="searchForm.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10">
            <option value="ALL">全部</option>
            <option value="active">啟用中</option>
            <option value="suspended">停權中</option>
            <option value="reserved">保留</option>
          </select>
        </div>

        <div class="flex items-end space-x-2">
          <button @click="handleSearch" :disabled="isFetching"
            class="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="搜尋">
            <Search :size="20" />
          </button>
          <button @click="handleAddTeacher"
            class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
            title="新增教師">
            <Plus :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- 使用 DataTable 組件 -->
    <DataTable
      :data="teachers"
      :columns="tableColumns"
      :loading="isLoading"
      :fetching="isFetching"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total-records="totalRecords"
      record-name="教師資料"
      empty-text="沒有符合條件的教師資料"
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
        <button @click="handleEdit(item)"
          class="text-blue-600 hover:text-blue-900 focus:outline-none p-1 rounded hover:bg-blue-50 cursor-pointer"
          title="編輯">
          <Edit2 :size="16" />
        </button>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Search, Plus, Edit2 } from 'lucide-vue-next'
import DataTable from '@/components/common/DataTable.vue'
import { useTeachersList } from '@/composables/useTeachersList'

// 使用 composable
const {
  searchForm,
  pagination,
  teachers,
  totalRecords,
  isLoading,
  error,
  isFetching,
  handleSearch,
  handleAddTeacher,
  handleEdit,
  goToPage,
  handlePageSizeChange,
  getStatusClass,
  getStatusText,
  refetch,
} = useTeachersList()

// 定義表格欄位
const tableColumns = computed(() => [
  { key: 'email', title: 'Email' },
  { key: 'name', title: '姓名' },
  { key: 'classCount', title: '班級數量', align: 'center' as const },
  { key: 'studentCount', title: '學生數量', align: 'center' as const },
  { key: 'status', title: '帳號狀態', align: 'center' as const },
  { key: 'actions', title: '操作', align: 'center' as const }
])
</script>

