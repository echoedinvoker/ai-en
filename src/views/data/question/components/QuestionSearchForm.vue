<template>
  <div class="grid grid-cols-5 gap-4">
    <!-- 題庫ID -->
    <div>
      <BaseInput v-model="searchForm.id" type="text" label="題庫ID" placeholder="輸入題庫ID" />
    </div>

    <!-- 題庫名稱 -->
    <div>
      <BaseInput v-model="searchForm.name" type="text" label="題庫名稱" placeholder="輸入題庫名稱" />
    </div>

    <!-- 題庫出處 -->
    <div>
      <BaseSelect v-model="searchForm.source" label="題庫出處" :options="sourceOptions" />
    </div>

    <!-- 上架狀態 -->
    <div>
      <BaseSelect v-model="searchForm.status" label="上架狀態" :options="statusOptions" />
    </div>

    <!-- 搜尋按鈕 -->
    <div class="self-end">
      <IconButton @click="handleSearch" :disabled="isFetching" :icon="Search" title="搜尋" />
    </div>

    <div class="flex items-center space-x-2 flex-shrink-0">
      <!-- 新增題庫按鈕 -->
      <IconButton @click="handleAddQuestionBank" :icon="BookPlus" title="新增題庫" />

      <IconButton @click="handleImportQuestionBank" :icon="FileUp" title="匯入題庫" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, BookPlus, FileUp } from 'lucide-vue-next'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import { useQuestionBankList } from '../composables/useQuestionList'
import IconButton from '@/components/common/IconButton.vue'

// 使用 composable 獲取搜尋相關功能
const { searchForm, isFetching, handleSearch, handleAddQuestionBank, handleImportQuestionBank } =
  useQuestionBankList()

// 題庫出處選項配置
const sourceOptions = [
  { value: '', label: '全部' },
  { value: '康軒出版社', label: '康軒出版社' },
  { value: '翰林出版社', label: '翰林出版社' },
  { value: 'ETS官方', label: 'ETS官方' },
  { value: '劍橋大學出版社', label: '劍橋大學出版社' },
  { value: '語言訓練測驗中心', label: '語言訓練測驗中心' },
  { value: '商務印書館', label: '商務印書館' },
  { value: '三民書局', label: '三民書局' },
  { value: '南一書局', label: '南一書局' },
  { value: '龍騰文化', label: '龍騰文化' },
  { value: '大考中心', label: '大考中心' },
  { value: '東華書局', label: '東華書局' },
]

// 狀態選項配置
const statusOptions = [
  { value: 'ALL', label: 'ALL' }, // 改為 'ALL'
  { value: 'published', label: '上架中' },
  { value: 'unpublished', label: '未上架' },
  { value: 'archived', label: '已下架' },
]
</script>
