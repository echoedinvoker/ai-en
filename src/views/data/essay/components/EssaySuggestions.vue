<template>
  <div>
    <h5 class="text-md mb-2 ml-2">文法改錯建議</h5>
    <div class="max-w-screen-xl" v-if="essayDetail">
      <!-- 單一建議按鈕 -->
      <div v-if="essayDetail?.suggestions.length > 0">
        <button
          @click="openSuggestionsDialog"
          class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          <span>查看建議</span>
          <!-- 建議數量標籤 -->
          <span class="bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
            {{ essayDetail.suggestions.length }}
          </span>
        </button>
      </div>

      <!-- 無建議時的提示 -->
      <div v-if="essayDetail?.suggestions.length === 0" class="text-center py-8 text-gray-500">
        目前沒有文法改錯建議
      </div>

      <!-- 所有建議 Dialog with Transition -->
      <Transition name="dialog">
        <div
          v-if="isDialogOpen"
          @keydown.esc="closeDialog"
          @click="closeDialog"
          class="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <div
            class="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl"
            @click.stop
          >
            <!-- Dialog 標題 -->
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-gray-900">
                文法改錯建議 ({{ essayDetail?.suggestions.length || 0 }})
              </h2>
              <button
                @click="closeDialog"
                class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                aria-label="關閉"
              >
                ×
              </button>
            </div>

            <!-- 所有建議列表 -->
            <div class="space-y-6">
              <div
                v-for="(suggestion, index) in essayDetail?.suggestions"
                :key="index"
                class="border border-gray-200 rounded-lg p-4"
              >
                <!-- 建議標題 -->
                <div class="flex items-center gap-3 mb-4">
                  <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {{ index + 1 }}
                  </span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {{ suggestion.suggestedBy }}
                  </span>
                </div>

                <!-- 建議內容 -->
                <div class="grid md:grid-cols-2 gap-4">
                  <!-- 原始內容 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">原始內容</label>
                    <div class="p-3 bg-red-50 border border-red-200 rounded-md">
                      <span class="text-red-800">{{ suggestion.originalContent }}</span>
                    </div>
                  </div>

                  <!-- 修正建議 -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">修正建議</label>
                    <div class="p-3 bg-green-50 border border-green-200 rounded-md">
                      <span class="text-green-800">{{ suggestion.correctedContent }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dialog 按鈕 -->
            <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                @click="closeDialog"
                class="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEssayDetail } from '../composables/useEssayDetail'

const { essayDetail } = useEssayDetail()

// Dialog 狀態管理
const isDialogOpen = ref(false)

// 開啟建議 Dialog
const openSuggestionsDialog = () => {
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

<style scoped>
/* Dialog transition 效果 */
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.1s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px); /* 進入前和離開後無 blur */
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  backdrop-filter: blur(8px); /* 完全顯示時有 blur */
}

/* 為 dialog 內容添加縮放效果 */
.dialog-enter-from .bg-white,
.dialog-leave-to .bg-white {
  transform: scale(0.9);
}

.dialog-enter-to .bg-white,
.dialog-leave-from .bg-white {
  transform: scale(1);
}

.dialog-enter-active .bg-white,
.dialog-leave-active .bg-white {
  transition: transform 0.3s ease;
}
</style>

