<template>
  <PageContainer>
    <p>請選擇欲匯入的Excel xlsx檔案</p>
    <IconButton :icon="CloudUpload" :iconSize="32" title="匯入Excel檔案" />

    <p class="mt-12">匯入60筆題庫成功!!</p>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue';
import IconButton from '@/components/common/IconButton.vue';
import { CloudUpload } from 'lucide-vue-next';
</script>
