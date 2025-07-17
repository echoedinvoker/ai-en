<template>
    <!-- 文法改錯 -->
    <div class="max-w-screen-xl">
      <h3 class="text-lg font-semibold mb-4">文法改錯建議</h3>
      <div class="space-y-4">
        <Card
          v-if="essayDetail"
          v-for="(suggestion, index) in essayDetail.suggestions"
          :key="index"
          class="p-4"
        >
          <div class="space-y-3">
            <!-- 建議者標籤 -->
            <div class="flex items-center gap-2">
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {{ suggestion.suggestedBy }}
              </span>
            </div>

            <!-- 原始內容 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">原始內容</label>
              <div class="p-3 bg-red-50 border border-red-200 rounded-md">
                <span class="text-red-800">{{ suggestion.originalContent }}</span>
              </div>
            </div>

            <!-- 修正建議 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">修正建議</label>
              <div class="p-3 bg-green-50 border border-green-200 rounded-md">
                <span class="text-green-800">{{ suggestion.correctedContent }}</span>
              </div>
            </div>
          </div>
        </Card>

        <!-- 無建議時的提示 -->
        <div v-if="essayDetail?.suggestions.length === 0" class="text-center py-8 text-gray-500">
          目前沒有文法改錯建議
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { useEssayDetail } from '../composables/useEssayDetail'
import Card from '@/components/common/Card.vue'

const { essayDetail } = useEssayDetail()
</script>
