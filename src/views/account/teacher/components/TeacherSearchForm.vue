<template>
  <div class="grid grid-cols-5 gap-4">
    <!-- 教師 Email -->
    <BaseInput
      v-model="searchForm.email"
      label="教師 Email"
      placeholder="輸入教師 Email"
      type="email"
    />

    <!-- 教師姓名 -->
    <BaseInput
      v-model="searchForm.name"
      label="教師姓名"
      placeholder="輸入教師姓名"
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
        @click="handleAddTeacher"
        :icon="UserPlus"
        title="增加教師"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, UserPlus } from 'lucide-vue-next'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import { useTeachersList } from '../composables/useTeachersList'
import IconButton from '@/components/common/IconButton.vue'

// 使用 composable 獲取搜尋相關功能
const {
  searchForm,
  isFetching,
  handleSearch,
  handleAddTeacher,
} = useTeachersList()

// 狀態選項配置
const statusOptions = [
  { value: 'ALL', label: 'ALL' },
  { value: 'active', label: '啟用中' },
  { value: 'suspended', label: '停權中' },
  { value: 'reserved', label: '保留' }
]
</script>

