<template>
  <PageContainer v-if="essayDetail" class="max-w-screen-xl h-screen overflow-hidden">
    <div class="flex flex-col h-full">
      <!-- 主要內容區域 -->
      <div class="flex gap-6 flex-1">
        <!-- 左側區域 -->
        <div class="flex-1 grow-3 flex flex-col space-y-4">
          <EssayDetailInfo1 />

          <BaseTextarea
            :model-value="essayDetail.content"
            placeholder="輸入作文內容"
            :rows="15"
            disabled
          />

          <EssayDetailInfo2 />
        </div>

        <!-- 右側區域 -->
        <div class="flex-1 grow-2 flex flex-col h-full">
          <div class="flex-1 flex flex-col gap-6 overflow-hidden">
            <EssaySuggestions class="flex-shrink-0" />
            <!-- EssayWritingFeedback 容器設定 overflow-y-auto -->
            <div class="flex-1 overflow-y-auto">
              <EssayWritingFeedback />
            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作按鈕 - 整個頁面水平中心 -->
      <div class="mt-6 flex justify-center gap-4">
        <IconButton
          :icon="X"
          title="取消"
          :iconSize="32"
          variant="secondary"
        />
        <IconButton
          :icon="Save"
          title="儲存"
          :iconSize="32"
          variant="primary"
        />
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue'
import EssayDetailInfo1 from './components/EssayDetailInfo1.vue'
import EssayDetailInfo2 from './components/EssayDetailInfo2.vue'
import EssaySuggestions from './components/EssaySuggestions.vue'
import EssayWritingFeedback from './components/EssayWritingFeedback.vue'
import BaseTextarea from '@/components/common/BaseTextarea.vue'
import IconButton from '@/components/common/IconButton.vue'
import { X, Save } from 'lucide-vue-next'
import { useEssayDetail } from './composables/useEssayDetail'

const { essayDetail } = useEssayDetail()
</script>

