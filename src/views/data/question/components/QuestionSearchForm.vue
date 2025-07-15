<template>
  <div class="space-y-4 mb-4">
    <div class="flex items-center justify-between mb-4">
      <!-- 第一行：題庫ID、題庫名稱、搜尋按鈕 -->
      <div class="grid grid-cols-3 gap-4">
        <!-- 題庫ID -->
        <div>
          <FormInput v-model="searchForm.id" type="text" label="題庫ID" placeholder="輸入題庫ID" />
        </div>

        <!-- 題庫名稱 -->
        <div>
          <FormInput v-model="searchForm.name" type="text" label="題庫名稱" placeholder="輸入題庫名稱" />
        </div>

        <!-- 搜尋按鈕 -->
        <div class="self-end">
          <button @click="handleSearch" :disabled="isFetching"
            class="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md
            hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2
            focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200 flex items-center
            justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="搜尋">
            <Search :size="20" />
          </button>
        </div>

        <!-- 第二行：題庫出處、上架狀態 -->
          <!-- 題庫出處 -->
          <div>
            <FormInput v-model="searchForm.source" type="select" label="題庫出處" :options="sourceOptions" />
          </div>

          <!-- 上架狀態 -->
          <div>
            <FormInput v-model="searchForm.status" type="select" label="上架狀態" :options="statusOptions" />
          </div>
      </div>
      <!-- 右側按鈕組 -->
      <div class="flex items-center space-x-2 flex-shrink-0">
        <!-- 新增題庫按鈕 -->
        <button @click="handleAddQuestionBank"
          class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
          title="新增題庫">
          <Plus :size="20" />
        </button>

        <!-- 匯入題庫按鈕 -->
        <button @click="handleImportQuestionBank"
          class="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
          title="匯入題庫">
          <Upload :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus, Upload } from 'lucide-vue-next'
import FormInput from '@/components/common/FormInput.vue'
import { useQuestionBankList } from '../composables/useQuestionList'

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
  { value: 'ALL', label: 'ALL' },  // 改為 'ALL'
  { value: 'published', label: '上架中' },
  { value: 'unpublished', label: '未上架' },
  { value: 'archived', label: '已下架' },
]
</script>
