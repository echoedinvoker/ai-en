<template>
    <!-- 作文詳細資訊卡片 -->
    <Card class="max-w-screen-xl">
      <div class="grid grid-cols-3 gap-4">
        <BaseInput
          :model-value="essayDetail?.id"
          type="text"
          label="作文ID"
          placeholder="輸入作文ID"
          disabled
        />
        <BaseInput
          :model-value="essayDetail?.name"
          type="text"
          label="作文名稱"
          placeholder="輸入作文名稱"
          disabled
        />
        <div></div>

        <BaseInput
          :model-value="essayDetail?.author"
          type="text"
          label="作文擁有者"
          placeholder="輸入作文擁有者"
          disabled
        />
        <BaseInput
          :model-value="essayDetail?.owner"
          type="text"
          label="試題擁有者"
          placeholder="輸入試題擁有者"
          disabled
        />
        <div></div>

        <BaseInput
          :model-value="essayDetail?.aiScore"
          type="text"
          label="AI批閱分數"
          placeholder="輸入AI批閱分數"
          disabled
        />
        <BaseInput
          v-if="essayDetail?.teacherScore"
          :model-value="essayDetail.teacherScore"
          type="text"
          label="教師批閱分數"
          placeholder="輸入教師批閱分數"
          disabled
        />
        <div v-else></div>
      </div>
    </Card>
</template>

<script setup lang="ts">
import { useEssayDetail } from '../composables/useEssayDetail'
import Card from '@/components/common/Card.vue';
import BaseInput from '@/components/common/BaseInput.vue';

const { essayDetail } = useEssayDetail()
</script>
