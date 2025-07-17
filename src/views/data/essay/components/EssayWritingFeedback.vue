<template>
  <div class="max-w-screen-xl">
    <h3 class="text-lg font-semibold mb-4">寫作回饋</h3>
    <Card class="p-6" v-if="essayDetail">
      <!-- 整體進度圓形圖 -->
      <div class="flex justify-center mb-8">
        <CircleProgressBar :progress="essayDetail.writingFeedback.progress" />
      </div>

      <!-- 詳細回饋區塊 -->
      <div class="space-y-6">
        <!-- 字彙回饋 -->
        <div class="border-b pb-4">
          <h4 class="text-md font-semibold mb-3 text-blue-600">字彙 (Vocabulary)</h4>
          <div class="mb-3">
            <LineProgressBar :score="essayDetail.writingFeedback.vocabulary.score" color="blue" />
          </div>
          <div class="grid grid-cols-3 gap-4 mb-3">
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
          </div>
          <p class="text-sm text-gray-700">{{ essayDetail.writingFeedback.vocabulary.summary }}</p>
        </div>

        <!-- 文法回饋 -->
        <div class="border-b pb-4">
          <h4 class="text-md font-semibold mb-3 text-green-600">文法 (Grammar)</h4>
          <div class="mb-3">
            <LineProgressBar :score="essayDetail.writingFeedback.grammar.score" color="green" />
          </div>
          <div class="grid grid-cols-3 gap-4 mb-3">
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
          </div>
          <p class="text-sm text-gray-700">{{ essayDetail.writingFeedback.grammar.summary }}</p>
        </div>

        <!-- 內容回饋 -->
        <div class="border-b pb-4">
          <h4 class="text-md font-semibold mb-3 text-purple-600">內容 (Content)</h4>
          <div class="mb-3">
            <LineProgressBar :score="essayDetail.writingFeedback.content.score" color="purple" />
          </div>
          <p class="text-sm text-gray-700">{{ essayDetail.writingFeedback.content.summary }}</p>
        </div>

        <!-- 組織回饋 -->
        <div>
          <h4 class="text-md font-semibold mb-3 text-orange-600">組織 (Organization)</h4>
          <div class="mb-3">
            <LineProgressBar
              :score="essayDetail.writingFeedback.organization.score"
              color="orange"
            />
          </div>
          <p class="text-sm text-gray-700">
            {{ essayDetail.writingFeedback.organization.summary }}
          </p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/common/Card.vue'
import CircleProgressBar from '@/components/common/CircleProgressBar.vue'
import LineProgressBar from '@/components/common/LineProgressBar.vue'
import { useEssayDetail } from '../composables/useEssayDetail'

const { essayDetail } = useEssayDetail()
</script>
