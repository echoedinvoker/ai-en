<template>
  <div>
    <Card class="p-6" v-if="essayDetail">
      <!-- 整體進度圓形圖 -->
      <div class="flex justify-center mb-8">
        <CircleProgressBar :progress="essayDetail.writingFeedback.progress" />
      </div>

      <!-- 詳細回饋區塊 -->
      <div class="space-y-4">
        <!-- 字彙回饋 -->
        <div class="border border-gray-200 rounded-lg">
          <button
            @click="toggleAccordion('vocabulary')"
            class="w-full p-4 text-left flex gap-4 items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <!-- 修改為並排顯示 -->
            <div class="flex-1 grid grid-cols-2 gap-2">
              <h4 class="text-md font-semibold text-blue-600">字彙 (Vocabulary)</h4>
              <LineProgressBar
                class="flex-1"
              :score="essayDetail.writingFeedback.vocabulary.score" color="blue" />
            </div>
            <svg
              :class="{ 'rotate-180': activeAccordion === 'vocabulary' }"
              class="w-5 h-5 text-gray-500 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- 展開內容 -->
          <div
            v-if="activeAccordion === 'vocabulary'"
            class="px-4 pb-4 border-t border-gray-200"
          >
            <div class="space-y-4">
              <div>
                <span class="text-sm text-gray-600">字彙/字數</span>
                <div class="font-semibold">
                  {{ essayDetail.writingFeedback.vocabulary.numVocabulary }}/{{
                    essayDetail.writingFeedback.vocabulary.wordCount
                  }}
                </div>
              </div>
              <div>
                <span class="text-sm text-gray-600">拼字錯誤</span>
                <div class="font-semibold">
                  {{ essayDetail.writingFeedback.vocabulary.spellingErrors }}
                </div>
              </div>
              <div>
                <span class="text-sm text-gray-600">字彙等級</span>
                <LineProgressBar
                  :score="essayDetail.writingFeedback.vocabulary.vocabularyLevel"
                  :max-score="6"
                  color="blue"
                  size="sm"
                />
              </div>
              <!-- 修改：添加 alert 樣式和上方 margin -->
              <p class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                {{ essayDetail.writingFeedback.vocabulary.summary }}
              </p>
            </div>
          </div>
        </div>

        <!-- 文法回饋 -->
        <div class="border border-gray-200 rounded-lg">
          <button
            @click="toggleAccordion('grammar')"
            class="w-full p-4 text-left flex gap-4 items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div class="flex-1 grid grid-cols-2 gap-2">
              <h4 class="text-md font-semibold text-green-600">文法 (Grammar)</h4>
              <LineProgressBar
                class="flex-1"
                :score="essayDetail.writingFeedback.grammar.score" color="green" />
            </div>
            <svg
              :class="{ 'rotate-180': activeAccordion === 'grammar' }"
              class="w-5 h-5 text-gray-500 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- 展開內容 -->
          <div
            v-if="activeAccordion === 'grammar'"
            class="px-4 pb-4 border-t border-gray-200"
          >
            <div class="space-y-4">
              <div>
                <span class="text-sm text-gray-600">型態</span>
                <LineProgressBar
                  :score="essayDetail.writingFeedback.grammar.form"
                  color="green"
                  size="sm"
                />
              </div>
              <div>
                <span class="text-sm text-gray-600">介係詞</span>
                <LineProgressBar
                  :score="essayDetail.writingFeedback.grammar.preposition"
                  color="green"
                  size="sm"
                />
              </div>
              <div>
                <span class="text-sm text-gray-600">標點符號</span>
                <LineProgressBar
                  :score="essayDetail.writingFeedback.grammar.punctuation"
                  color="green"
                  size="sm"
                />
              </div>
              <!-- 修改：添加 alert 樣式和上方 margin -->
              <p class="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                {{ essayDetail.writingFeedback.grammar.summary }}
              </p>
            </div>
          </div>
        </div>

        <!-- 內容回饋 -->
        <div class="border border-gray-200 rounded-lg">
          <button
            @click="toggleAccordion('content')"
            class="w-full p-4 text-left flex gap-4 items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div class="flex-1 grid grid-cols-2 gap-2">
              <h4 class="text-md font-semibold text-purple-600">內容 (Content)</h4>
              <LineProgressBar :score="essayDetail.writingFeedback.content.score" color="purple" />
            </div>
            <svg
              :class="{ 'rotate-180': activeAccordion === 'content' }"
              class="w-5 h-5 text-gray-500 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- 展開內容 -->
          <div
            v-if="activeAccordion === 'content'"
            class="px-4 pb-4 border-t border-gray-200"
          >
            <!-- 修改：添加 alert 樣式和上方 margin -->
            <p class="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-md text-sm text-purple-800">
              {{ essayDetail.writingFeedback.content.summary }}
            </p>
          </div>
        </div>

        <!-- 組織回饋 -->
        <div class="border border-gray-200 rounded-lg">
          <button
            @click="toggleAccordion('organization')"
            class="w-full p-4 text-left flex gap-4 items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div class="flex-1 grid grid-cols-2 gap-2">
              <h4 class="text-md font-semibold text-orange-600">組織 (Organization)</h4>
              <LineProgressBar
                :score="essayDetail.writingFeedback.organization.score"
                color="orange"
              />
            </div>
            <svg
              :class="{ 'rotate-180': activeAccordion === 'organization' }"
              class="w-5 h-5 text-gray-500 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- 展開內容 -->
          <div
            v-if="activeAccordion === 'organization'"
            class="px-4 pb-4 border-t border-gray-200"
          >
            <!-- 修改：添加 alert 樣式和上方 margin -->
            <p class="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-md text-sm text-orange-800">
              {{ essayDetail.writingFeedback.organization.summary }}
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/common/Card.vue'
import CircleProgressBar from '@/components/common/CircleProgressBar.vue'
import LineProgressBar from '@/components/common/LineProgressBar.vue'
import { useEssayDetail } from '../composables/useEssayDetail'

const { essayDetail } = useEssayDetail()

// Accordion 狀態管理
type AccordionType = 'vocabulary' | 'grammar' | 'content' | 'organization'
const activeAccordion = ref<AccordionType | null>(null)

// 切換 accordion 狀態，一次只能展開一個
const toggleAccordion = (type: AccordionType) => {
  activeAccordion.value = activeAccordion.value === type ? null : type
}
</script>

