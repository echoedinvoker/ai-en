<template>
  <PageContainer v-if="essayDetail">

    <EssayDetailInfo />

    <!-- 作文內容文本區域 -->
    <div class="max-w-screen-xl">
      <BaseTextarea
        :model-value="essayDetail.content"
        label="作文內容"
        placeholder="輸入作文內容"
        :rows="10"
        class="col-span-2"
        disabled
      />
    </div>

    <EssaySuggestions />

    <EssayWritingFeedback />

  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue'
import EssayDetailInfo from './components/EssayDetailInfo.vue'
import EssaySuggestions from './components/EssaySuggestions.vue'
import EssayWritingFeedback from './components/EssayWritingFeedback.vue'
import BaseTextarea from '@/components/common/BaseTextarea.vue'
import { useEssayDetail } from './composables/useEssayDetail'

const { essayDetail } = useEssayDetail()
</script>

