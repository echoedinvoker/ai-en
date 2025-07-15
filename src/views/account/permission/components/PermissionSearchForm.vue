<template>
  <div class="grid grid-cols-5 gap-4 mb-4">
    <!-- 權限群組名稱 -->
    <FormInput
      v-model="searchForm.role"
      type="text"
      label="權限群組名稱"
      placeholder="輸入權限群組名稱"
    />

    <!-- 帳號狀態 -->
    <FormInput
      v-model="searchForm.status"
      type="select"
      label="帳號狀態"
      :options="statusOptions"
    />

    <!-- 空白欄位 -->
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

    <div></div>

    <!-- 操作按鈕 -->
    <div class="self-end justify-items-end">
      <button
        @click="handleAddPermission"
        class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
        title="新增權限群組"
      >
        <Plus :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus, RotateCcw } from 'lucide-vue-next'
import FormInput from '@/components/common/FormInput.vue'
import { usePermissionList } from '../composables/usePermissionList'

// 使用 composable 獲取搜尋相關功能
const {
  searchForm,
  isFetching,
  handleSearch,
  handleReset,
  handleAddPermission,
} = usePermissionList()

// 狀態選項配置
const statusOptions = [
  { value: 'ALL', label: 'ALL' },
  { value: 'active', label: '啟用中' },
  { value: 'suspended', label: '停權中' },
  { value: 'reserved', label: '保留' }
]
</script>

