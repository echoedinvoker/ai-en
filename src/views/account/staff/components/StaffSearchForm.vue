<template>
  <div class="grid grid-cols-5 gap-4 mb-4">
    <!-- 員工 Email -->
    <BaseInput
      v-model="searchForm.email"
      label="員工 Email"
      placeholder="輸入員工 Email"
      type="email"
    />

    <!-- 員工姓名 -->
    <BaseInput
      v-model="searchForm.name"
      label="員工姓名"
      placeholder="輸入員工姓名"
      type="text"
    />

    <!-- 帳號狀態 -->
    <BaseSelect
      v-model="searchForm.status"
      label="帳號狀態"
      :options="statusOptions"
    />

    <!-- 操作按鈕 -->
    <div class="self-end">
      <IconButton
        @click="handleSearch"
        :disabled="isFetching"
        :icon="Search"
        title="搜尋"
      />
    </div>

    <div></div>

    <div class="self-end justify-items-end">
      <IconButton
        @click="handleAddStaff"
        :icon="UserPlus"
        title="新增員工"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, UserPlus } from 'lucide-vue-next'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import IconButton from '@/components/common/IconButton.vue'
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

