<template>
  <Card>
    <h2 class="text-md font-semibold mb-2">文法改錯建議</h2>
    <div class="max-w-screen-xl" v-if="essayDetail">
      <!-- 建議按鈕區域 -->
      <div v-if="essayDetail?.suggestions.length > 0" class="flex flex-wrap gap-3 mb-1">
        <button
          v-for="(suggestion, index) in essayDetail.suggestions"
          :key="index"
          @click="openSuggestionDialog(index)"
          class="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium transition-colors"
          :title="`建議 ${index + 1}: ${suggestion.suggestedBy}`"
        >
          {{ index + 1 }}
        </button>
      </div>

      <!-- 無建議時的提示 -->
      <div v-if="essayDetail?.suggestions.length === 0" class="text-center py-8 text-gray-500">
        目前沒有文法改錯建議
      </div>

      <!-- 建議詳情 Dialog -->
      <div
        v-if="isDialogOpen && selectedSuggestion"
        @keydown.esc="closeDialog"
        class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
      >
        <div
          class="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl"
          @click.stop
        >
          <!-- Dialog 標題 -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-900">建議 {{ selectedIndex + 1 }}</h2>
            <button
              @click="closeDialog"
              class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="關閉"
            >
              ×
            </button>
          </div>

          <!-- 建議內容 -->
          <div class="space-y-4">
            <!-- 建議者標籤 -->
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {{ selectedSuggestion.suggestedBy }}
              </span>
            </div>

            <!-- 原始內容 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">原始內容</label>
              <div class="p-4 bg-red-50 border border-red-200 rounded-md">
                <span class="text-red-800">{{ selectedSuggestion.originalContent }}</span>
              </div>
            </div>

            <!-- 修正建議 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">修正建議</label>
              <div class="p-4 bg-green-50 border border-green-200 rounded-md">
                <span class="text-green-800">{{ selectedSuggestion.correctedContent }}</span>
              </div>
            </div>
          </div>

          <!-- Dialog 按鈕 -->
          <div class="flex justify-end gap-3 mt-6">
            <button
              @click="closeDialog"
              class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition-colors"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEssayDetail } from '../composables/useEssayDetail'
import Card from '@/components/common/Card.vue'

const { essayDetail } = useEssayDetail()

// Dialog 狀態管理
const isDialogOpen = ref(false)
const selectedIndex = ref(0)

// 計算選中的建議
const selectedSuggestion = computed(() => {
  if (!essayDetail.value?.suggestions || selectedIndex.value < 0) return null
  return essayDetail.value.suggestions[selectedIndex.value]
})

// 開啟建議 Dialog
const openSuggestionDialog = (index: number) => {
  selectedIndex.value = index
  isDialogOpen.value = true
  // 自動聚焦到 dialog 以支援 ESC 鍵關閉
  setTimeout(() => {
    const dialog = document.querySelector('[role="dialog"]') as HTMLElement
    dialog?.focus()
  }, 0)
}

// 關閉 Dialog
const closeDialog = () => {
  isDialogOpen.value = false
}
</script>
