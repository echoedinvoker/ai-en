<template>
  <PageContainer>
    <Card class="max-w-screen-xl">
      <div class="flex gap-6">
        <div class="grow-3 grid grid-cols-[4fr_4fr_1fr] gap-x-8 gap-y-4">
          <BaseInput v-model="formData.name" label="訂閱項目名稱" placeholder="請輸入訂閱項目名稱" />
          <BaseInput
            v-model="formData.imageUrl"
            label="訂閱項目圖片"
            placeholder="請輸入訂閱項目圖片 URL"
          />
          <div class="self-end -mb-1">
            <IconButton :icon="CloudUpload" :icon-size="32" title="上傳圖片" />
          </div>

          <BaseTextarea
            v-model="formData.message"
            label="訂閱項目內容訊息"
            placeholder="請輸入訂閱項目內容訊息"
            class="col-span-2"
          />
          <div></div>

          <BaseInput
            v-model="formData.amount"
            label="訂閱金額"
            placeholder="請輸入訂閱金額"
            type="number"
          />
          <div class="flex flex-col gap-2">
            <h5 class="text-sm text-gray-900">訂閱週期</h5>
            <div class="flex items-center">
              <BaseSelect
                v-model="periodDays"
                :options="Array.from({ length: 30 }, (_, i) => (i + 1))"
                class="ml-2 w-14"
              />
              <span class="ml-2 text-sm text-gray-500">天</span>
              <BaseSelect
                v-model="periodMonths"
                :options="Array.from({ length: 11 }, (_, i) => (i + 1))"
                class="ml-2 w-14"
              />
              <span class="ml-2 text-sm text-gray-500">月</span>
              <BaseSelect
                v-model="periodYears"
                :options="Array.from({ length: 5 }, (_, i) => (i + 1))"
                class="ml-2 w-14"
              />
              <span class="ml-2 text-sm text-gray-500">年</span>
            </div>
          </div>
          <div></div>

          <BaseInput
            v-model="formData.stripeUrl"
            label="金流串接網址"
            placeholder="請輸入金流串接網址"
          />
          <div></div>
          <div></div>

          <BaseSelect
            v-model="formData.status"
            label="訂閱項目狀態"
            :options="[
              { label: '啟用中', value: 'enabled' },
              { label: '已停用', value: 'disabled' },
            ]"
          />
          <div></div>
          <div></div>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>

          <div class="col-span-2 mt-8 flex justify-end gap-4">
            <!-- 取消按鈕：次要動作，使用較淡的顏色 -->
            <IconButton
              @click="handleCancel"
              :icon="X"
              title="取消"
              :iconSize="32"
              variant="secondary"
            />
            <!-- 儲存按鈕：主要動作，使用強調色 -->
            <IconButton
              :icon="Save"
              title="儲存"
              :iconSize="32"
              variant="primary"
            />
          </div>

        </div>
        <div class="grow-1 flex flex-col">
          <div
            class="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
          >
            <div class="flex flex-col items-center text-gray-400">
              <svg class="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-xs">No Image</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue'
import Card from '@/components/common/Card.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseTextarea from '@/components/common/BaseTextarea.vue'
import IconButton from '@/components/common/IconButton.vue'
import { X, Save, CloudUpload } from 'lucide-vue-next'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { SubDetail } from './data/mockSubDetail'
import { computed } from 'vue'

const router = useRouter()

const formData: Ref<Partial<SubDetail>> = ref({
  name: '',
  imageUrl: '',
  message: '',
  amount: 0,
  period: 0,
  stripeUrl: '',
  status: 'enabled',
})

const handleCancel = () => {
  router.back()
}

const periodDays = computed({
  get: () => {
    if (!formData.value?.period) return 0
    return Math.floor((formData.value.period % 1) * 30) // 小數部分轉為天數
  },
  set: (value: number) => {
    if (formData.value) {
      const months = Math.floor(formData.value.period || 0)
      const years = Math.floor(months / 12)
      const remainingMonths = months % 12
      formData.value.period = years * 12 + remainingMonths + (value / 30)
    }
  }
})

const periodMonths = computed({
  get: () => {
    if (!formData.value?.period) return 0
    return Math.floor(formData.value.period) % 12
  },
  set: (value: number) => {
    if (formData.value) {
      const years = Math.floor((formData.value.period || 0) / 12)
      const days = ((formData.value.period || 0) % 1) * 30
      formData.value.period = years * 12 + value + (days / 30)
    }
  }
})

const periodYears = computed({
  get: () => {
    if (!formData.value?.period) return 0
    return Math.floor(formData.value.period / 12)
  },
  set: (value: number) => {
    if (formData.value) {
      const months = Math.floor(formData.value.period || 0) % 12
      const days = ((formData.value.period || 0) % 1) * 30
      formData.value.period = value * 12 + months + (days / 30)
    }
  }
})
</script>
