<template>
  <Card class="mb-4">
    <div class="grid grid-cols-3 gap-4">
      <BaseInput v-model="searchForm.name" type="text" label="系統公告查詢"
      placeholder="請輸入要查詢的系統公告名稱" />
      <BaseSelect v-model="searchForm.status" label="公告狀態" placeholder="請選擇系統公告狀態" :options="statusOptions" />
      <div class="self-end flex gap-2">
        <IconButton @click="handleSearch" :icon="Search" title="搜尋" />
      </div>
      <div class="justify-self-start">
        <IconButton @click="handleAddPush" :icon="MessageCirclePlus" title="新增系統公告" />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/common/Card.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import IconButton from '@/components/common/IconButton.vue';
import { MessageCirclePlus, Search } from 'lucide-vue-next';
import { useSysList } from '../composables/useSysList';
import { useRouter } from 'vue-router';

const router = useRouter()

const {
  searchForm,
  handleSearch,
} = useSysList()


const handleAddPush = () => {
  router.push(`/backend/sys/create`)
}

// 狀態選項
const statusOptions = [
  { label: 'ALL', value: 'ALL' },
  { label: '啟用', value: 'enabled' },
  { label: '停用', value: 'disabled' }
]
</script>
