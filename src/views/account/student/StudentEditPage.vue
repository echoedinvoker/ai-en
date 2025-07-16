<template>
  <PageContainer>
    <!-- 標題 -->
    <div class="flex items-center justify-end">
      <button @click="goBack" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 cursor-pointer">
        <ArrowLeft :size="20" />
        返回列表
      </button>
    </div>

    <!-- 錯誤狀態 -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-800">載入失敗: {{ error.message }}</p>
      <button @click="handleRefetch" class="mt-2 text-red-600 hover:text-red-800 underline">
        重新載入
      </button>
    </div>

    <!-- 載入狀態 -->
    <div v-else-if="loading" class="text-center py-8">
      載入中...
    </div>

    <!-- 學生表單 -->
    <StudentForm v-else-if="studentData" />

    <!-- 儲存錯誤提示 -->
    <div v-if="saveError" class="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
      <p class="text-red-800">儲存失敗: {{ saveError.message }}</p>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import StudentForm from './components/StudentForm.vue'
import { useStudent } from './composables/useStudent'
import PageContainer from '@/components/common/PageContainer.vue'

// 使用 composable
const {
  studentData,
  loading,
  error,
  saveError,
  goBack,
  refetch
} = useStudent()

const handleRefetch = () => {
  refetch()
}
</script>

