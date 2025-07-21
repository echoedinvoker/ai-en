<template>
  <div class="flex flex-col h-full">
    <!-- 固定標題 - 不受滾動影響 -->
    <h5 class="mb-3 ml-2 text-md flex-shrink-0">寫作回饋</h5>

    <!-- 可滾動的內容區域 -->
    <div class="flex-1 overflow-y-auto">
      <Card class="p-6" v-if="essayDetail">
        <!-- 整體進度圓形圖 -->
        <div class="flex justify-center mb-8">
          <CircleProgressBar :progress="essayDetail.writingFeedback.progress" />
        </div>

        <!-- 詳細回饋區塊 -->
        <div class="space-y-4">
          <!-- 字彙回饋 -->
          <Accordion v-model="activeAccordions.vocabulary">
            <template #header>
              <div class="grid grid-cols-2 gap-2">
                <h4 class="text-md font-semibold text-blue-600">字彙 (Vocabulary)</h4>
                <LineProgressBar
                  class="flex-1"
                  :score="essayDetail.writingFeedback.vocabulary.score"
                  color="blue"
                />
              </div>
            </template>

            <template #content>
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
                <p class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                  {{ essayDetail.writingFeedback.vocabulary.summary }}
                </p>
              </div>
            </template>
          </Accordion>

          <!-- 文法回饋 -->
          <Accordion v-model="activeAccordions.grammar">
            <template #header>
              <div class="grid grid-cols-2 gap-2">
                <h4 class="text-md font-semibold text-green-600">文法 (Grammar)</h4>
                <LineProgressBar
                  class="flex-1"
                  :score="essayDetail.writingFeedback.grammar.score"
                  color="green"
                />
              </div>
            </template>

            <template #content>
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
                <p class="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                  {{ essayDetail.writingFeedback.grammar.summary }}
                </p>
              </div>
            </template>
          </Accordion>

          <!-- 內容回饋 -->
          <Accordion v-model="activeAccordions.content">
            <template #header>
              <div class="grid grid-cols-2 gap-2">
                <h4 class="text-md font-semibold text-purple-600">內容 (Content)</h4>
                <LineProgressBar
                  :score="essayDetail.writingFeedback.content.score"
                  color="purple"
                />
              </div>
            </template>

            <template #content>
              <p class="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-md text-sm text-purple-800">
                {{ essayDetail.writingFeedback.content.summary }}
              </p>
            </template>
          </Accordion>

          <!-- 組織回饋 -->
          <Accordion v-model="activeAccordions.organization">
            <template #header>
              <div class="grid grid-cols-2 gap-2">
                <h4 class="text-md font-semibold text-orange-600">組織 (Organization)</h4>
                <LineProgressBar
                  :score="essayDetail.writingFeedback.organization.score"
                  color="orange"
                />
              </div>
            </template>

            <template #content>
              <p class="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-md text-sm text-orange-800">
                {{ essayDetail.writingFeedback.organization.summary }}
              </p>
            </template>
          </Accordion>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Card from '@/components/common/Card.vue'
import CircleProgressBar from '@/components/common/CircleProgressBar.vue'
import LineProgressBar from '@/components/common/LineProgressBar.vue'
import Accordion from '@/components/common/Accordion.vue'
import { useEssayDetail } from '../composables/useEssayDetail'

const { essayDetail } = useEssayDetail()

// 管理多個 accordion 狀態
const activeAccordions = reactive({
  vocabulary: false,
  grammar: false,
  content: false,
  organization: false
})
</script>

