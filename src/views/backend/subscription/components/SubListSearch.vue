<template>
    <Card class="mb-4">
      <div class="grid grid-cols-3 gap-4">
        <BaseInput
          v-model="searchForm.name"
          label="訂閱項目查詢"
          placeholder="輸入訂閱項目名稱"
        />
        <BaseSelect
          v-model="searchForm.status"
          label="訂閱項目狀態"
          placeholder="選擇訂閱項目狀態"
          :options="statusOptions"
        />
        <div class="self-end flex gap-2">
          <IconButton
            @click="handleSearch"
            :icon="Search"
            title="搜尋"
          />
        </div>
        <div class="justify-self-start">
          <IconButton
            @click="handleCreate"
            :icon="TicketPlus"
            title="新增訂閱項目"
          />
        </div>
      </div>

    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/common/Card.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseSelect from '@/components/common/BaseSelect.vue';
import IconButton from '@/components/common/IconButton.vue';
import { useRouter } from 'vue-router';
import { useSubList } from '../composables/useSubList';
import { Search, TicketPlus } from 'lucide-vue-next';

const router = useRouter()

const {
  searchForm,
  handleSearch,
} = useSubList()

const statusOptions = [
  { label: 'ALL', value: 'ALL' },
  { label: '啟用', value: 'enabled' },
  { label: '停用', value: 'disabled' }
]

const handleCreate = () => {
  router.push(`/backend/sub/create`);
}
</script>
