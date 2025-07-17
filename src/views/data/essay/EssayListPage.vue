<template>
  <PageContainer>
    <Card class="mb-4">
      <EssaySearchForm />
    </Card>

    <DataTable
      :data="essays"
      :columns="tableColumns"
      :loading="isLoading"
      :fetching="isFetching"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total-records="totalRecords"
      record-name="題庫"
      empty-text="沒有符合條件的題庫資料"
      @page-change="goToPage"
      @page-size-change="handlePageSizeChange"
      @retry="refetch"
    >
      <!-- 自定義操作欄位 -->
      <template #column-actions="{ item }">
        <button
          @click="handleClickDetail(item)"
          class="text-blue-600 hover:text-blue-900 focus:outline-none p-1 rounded hover:bg-blue-50 cursor-pointer"
          title="詳細內容">
          <FileText :size="22" />
        </button>
      </template>
    </DataTable>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue'
import Card from '@/components/common/Card.vue';
import DataTable from '@/components/common/DataTable.vue';
import EssaySearchForm from './components/EssaySearchForm.vue';
import { useEssayList }from './composables/useEssayList';
import { computed } from 'vue';
import { FileText } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const {
  pagination,
  totalRecords,
  isLoading,
  isFetching,
  handlePageSizeChange,
  refetch,
  goToPage,
  essays
} = useEssayList()
const router = useRouter()

const tableColumns = computed(() => [
  { key: 'id', title: '作文ID', align: 'center' as const },
  { key: 'name', title: '作文名稱' },
  { key: 'author', title: '作文擁有者' },
  { key: 'aiScore', title: 'AI批閱分數', align: 'center' as const },
  { key: 'teacherScore', title: '教師批閱分數', align: 'center' as const },
  { key: 'actions', title: '操作', align: 'center' as const }
])

const handleClickDetail = (item: any) => {
  router.push(`/data/essays/${item.id}`)
}
</script>
