<template>
  <div class="grid grid-cols-5 gap-4">
    <!-- 權限群組名稱 -->
    <BaseInput
      v-model="searchForm.role"
      label="權限群組名稱"
      placeholder="輸入權限群組名稱"
      type="text"
    />

    <!-- 帳號狀態 -->
    <BaseSelect
      v-model="searchForm.status"
      label="帳號狀態"
      :options="statusOptions"
    />

    <!-- 空白欄位 -->
    <div class="self-end">
      <IconButton
        @click="handleSearch"
        :isDisabled="isFetching"
        :icon="Search"
        title="搜尋"
      />
    </div>

    <div></div>
    <div></div>

    <!-- 操作按鈕 -->
    <div class="justify-items-start">
      <IconButton
        @click="handleAddPermission"
        :icon="ShieldPlus"
        title="新增權限群組"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, ShieldPlus } from 'lucide-vue-next'
import IconButton from '@/components/common/IconButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import { usePermissionList } from '../composables/usePermissionList'
import { useRouter } from 'vue-router'

const router = useRouter()

// 使用 composable 獲取搜尋相關功能
const {
  searchForm,
  isFetching,
  handleSearch,
} = usePermissionList()

// 狀態選項配置
const statusOptions = [
  { value: 'ALL', label: 'ALL' },
  { value: 'active', label: '啟用中' },
  { value: 'suspended', label: '停權中' },
  { value: 'reserved', label: '保留' }
]

const handleAddPermission = () => {
  router.push(`/account/permissions/create`)
}
</script>

