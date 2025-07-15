<template>
  <div class="grid grid-cols-5 gap-4 mb-4">
    <!-- 員工 Email -->
    <FormInput
      v-model="searchForm.email"
      type="email"
      label="員工 Email"
      placeholder="輸入員工 Email"
    />

    <!-- 員工姓名 -->
    <FormInput
      v-model="searchForm.name"
      type="text"
      label="員工姓名"
      placeholder="輸入員工姓名"
    />

    <!-- 帳號狀態 -->
    <FormInput
      v-model="searchForm.status"
      type="select"
      label="帳號狀態"
      :options="statusOptions"
    />

    <!-- 操作按鈕 -->
    <div class="self-end">
      <button
        @click="handleSearch"
        :disabled="isFetching"
        class="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        title="搜尋"
      >
        <Search :size="20" />
      </button>
    </div>

    <div class="self-end justify-items-end">
      <button
        @click="handleAddStaff"
        class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
        title="新增員工"
      >
        <Plus :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus, RotateCcw } from 'lucide-vue-next'
import FormInput from '@/components/common/FormInput.vue'
import { useStaffList } from '../composables/useStaffList'

// 使用 composable 獲取搜尋相關功能
const {
  searchForm,
  isFetching,
  handleSearch,
  handleAddStaff,
} = useStaffList()

// 狀態選項配置
const statusOptions = [
  { value: 'ALL', label: 'ALL' },
  { value: 'active', label: '啟用中' },
  { value: 'suspended', label: '停權中' },
  { value: 'reserved', label: '保留' }
]
</script>

