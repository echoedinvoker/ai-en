<template>
  <div class="grid grid-cols-3 gap-4">
    <div>
      <BaseInput v-model="searchForm.id"
      type="text" label="作文ID" placeholder="輸入作文ID" />
    </div>

    <div>
      <BaseInput v-model="searchForm.name"
      type="text" label="作文名稱" placeholder="輸入作文名稱" />
    </div>

    <div class="self-end">
      <IconButton
        @click="handleSearch"
        :icon="Search"
        title="搜尋"
      >
      </IconButton>
    </div>

    <div>
      <BaseInput v-model="searchForm.author"
      type="text" label="作文擁有者" placeholder="輸入作文擁有者" />
    </div>
 </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next';
import BaseInput from '@/components/common/BaseInput.vue';
import IconButton from '@/components/common/IconButton.vue';
import { useEssayList } from '../composables/useEssayList';

const {
  searchForm,
  handleSearch
} = useEssayList();
</script>
