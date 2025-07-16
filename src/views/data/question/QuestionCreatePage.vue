<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue';
import TabCard from '@/components/common/TabCard.vue';
import QuestionCreateContent from './components/QuestionCreateContent.vue';
import QuestionCreatePoint from './components/QuestionCreatePoint.vue';

const tabs = [
  {
    key: 'content',
    label: '題庫內容',
  },
  {
    key: 'point',
    label: '題庫要點',
  },
]

</script>

<template>
  <PageContainer>
    <TabCard
      :tabs="tabs"
      :default-tab="'content'"
      class="max-w-screen-xl"
    >
      <template #content>
        <QuestionCreateContent />
      </template>
      <template #point>
        <QuestionCreatePoint />
      </template>
    </TabCard>
  </PageContainer>
</template>
