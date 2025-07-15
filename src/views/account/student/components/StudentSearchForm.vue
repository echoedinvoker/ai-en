<template>
  <div class="grid grid-cols-4 gap-4 mb-4">
    <!-- 學生 Email -->
    <FormInput
      v-model="searchForm.email"
      type="email"
      label="學生 Email"
      placeholder="輸入學生 Email"
    />

    <!-- 學生姓名 -->
    <FormInput
      v-model="searchForm.name"
      type="text"
      label="學生姓名"
      placeholder="輸入學生姓名"
    />

    <!-- 帳號狀態 -->
    <FormInput
      v-model="searchForm.status"
      type="select"
      label="帳號狀態"
      :options="statusOptions"
    />

    <!-- 操作按鈕 -->
    <div class="flex items-end space-x-2">
      <button
        @click="handleSearch"
        :disabled="isFetching"
        class="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        title="搜尋"
      >
        <Search :size="20" />
      </button>
      <button
        @click="handleAddStudent"
        class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
        title="新增學生"
      >
        <Plus :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus } from 'lucide-vue-next'
import FormInput from '@/components/common/FormInput.vue'
import { useStudentsList } from '../composables/useStudentsList'

// 使用 composable 獲取搜尋相關功能
const {
  searchForm,
  isFetching,
  handleSearch,
  handleAddStudent,
} = useStudentsList()

// 狀態選項配置
const statusOptions = [
  { value: 'ALL', label: '全部' },
  { value: 'active', label: '啟用中' },
  { value: 'suspended', label: '停權中' },
  { value: 'reserved', label: '保留' }
]
</script>

