<template>
    <!-- 作文詳細資訊卡片 -->
    <Card class="max-w-screen-xl">
      <div class="grid grid-cols-3 gap-4">
        <BaseInput
          :model-value="essayDetail?.createdAt"
          type="text"
          label="繳交時間"
          placeholder="輸入繳交時間"
          dense
          disabled
        />
        <BaseInput
          :model-value="essayDetail?.createdBy"
          type="text"
          label="建立人員"
          placeholder="輸入建立人員"
          dense
          disabled
        />
        <div></div>

        <BaseInput
          :model-value="essayDetail?.updatedAt"
          type="text"
          label="最近修改時間"
          placeholder="輸入最近修改時間"
          dense
          disabled
        />
        <BaseInput
          :model-value="essayDetail?.updatedBy"
          type="text"
          label="最近修改人員"
          placeholder="輸入最近修改人員"
          dense
          disabled
        />
        <div class="flex items-end">
          <BaseButton variant="slate" class="-ml-2"> LOG </BaseButton>
        </div>
      </div>
    </Card>
</template>

<script setup lang="ts">
import { useEssayDetail } from '../composables/useEssayDetail'
import Card from '@/components/common/Card.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';

const { essayDetail } = useEssayDetail()
</script>
