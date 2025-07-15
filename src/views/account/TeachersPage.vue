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
          <!-- 搜尋按鈕 -->
          <button @click="handleSearch" :disabled="isFetching"
            class="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="搜尋">
            <Search :size="20" />
          </button>
          <!-- 新增按鈕 -->
          <button @click="handleAddTeacher"
            class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
            title="新增教師">
            <Plus :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Loading 狀態 -->
    <div v-if="isLoading" class="bg-white rounded-lg shadow p-6 text-center">
      <div class="text-gray-500">載入中...</div>
    </div>

    <!-- Error 狀態 -->
    <div v-else-if="isError" class="bg-white rounded-lg shadow p-6 text-center">
      <div class="text-red-500">載入失敗：{{ error }}</div>
      <button @click="refetch" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        重新載入
      </button>
    </div>

    <!-- Table 區 -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                姓名
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                班級數量
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                學生數量
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                帳號狀態
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- 載入中的行 -->
            <tr v-if="isFetching && teachers.length > 0">
              <td colspan="6" class="px-6 py-2 text-center text-gray-500 bg-blue-50">
                <div class="flex items-center justify-center space-x-2">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span>更新中...</span>
                </div>
              </td>
            </tr>

            <tr v-for="teacher in teachers" :key="teacher.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ teacher.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ teacher.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ teacher.classCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ teacher.studentCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(teacher.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ getStatusText(teacher.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button @click="handleEdit(teacher)"
                  class="text-blue-600 hover:text-blue-900 focus:outline-none p-1 rounded hover:bg-blue-50 cursor-pointer"
                  title="編輯">
                  <Edit2 :size="16" />
                </button>
              </td>
            </tr>

            <tr v-if="teachers.length === 0 && !isFetching">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                沒有符合條件的教師資料
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination 區域 -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-700">
              顯示 {{ startRecord }} - {{ endRecord }} 筆，共 {{ totalRecords }} 筆教師資料
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-700">每頁顯示：</label>
              <select v-model="pagination.pageSize" @change="handlePageSizeChange"
                class="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span class="text-sm text-gray-700">筆</span>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <button @click="goToPage(1)" :disabled="pagination.currentPage === 1"
              class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              首頁
            </button>

            <button @click="goToPage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1"
              class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              上一頁
            </button>

            <div class="flex space-x-1">
              <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
                'px-3 py-1 text-sm border rounded',
                page === pagination.currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:bg-gray-50',
              ]">
                {{ page }}
              </button>
            </div>

            <button @click="goToPage(pagination.currentPage + 1)" :disabled="pagination.currentPage === totalPages"
              class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              下一頁
            </button>

            <button @click="goToPage(totalPages)" :disabled="pagination.currentPage === totalPages"
              class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              末頁
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus, Edit2 } from 'lucide-vue-next'
import { useTeachersList } from '@/composables/useTeachersList'

// 使用 composable 獲取所有需要的狀態和方法
const {
  // 表單狀態
  searchForm,
  pagination,

  // 資料狀態
  teachers,
  totalRecords,
  totalPages,
  startRecord,
  endRecord,
  visiblePages,

  // Query 狀態
  isLoading,
  isError,
  error,
  isFetching,

  // 方法
  handleSearch,
  handleAddTeacher,
  handleEdit,
  goToPage,
  handlePageSizeChange,
  getStatusClass,
  getStatusText,
  refetch,
} = useTeachersList()
</script>

