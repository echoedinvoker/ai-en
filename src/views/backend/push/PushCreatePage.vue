<template>
  <PageContainer>
    <Card class="max-w-screen-xl">
      <div class="flex gap-6">
        <div class="grow-3 grid grid-cols-[4fr_4fr_1fr] gap-x-8 gap-y-4">
          <!-- 推播名稱 -->
          <BaseInput label="推播名稱 (信件標題)" placeholder="請輸入推播名稱" />
          <!-- 推播圖片 -->
          <BaseInput label="推播圖片" placeholder="請輸入推播圖片 URL" />
          <!-- 上傳圖片按鈕 -->
          <div class="self-end -mb-1">
            <IconButton :icon="CloudUpload" :icon-size="32" title="上傳圖片" />
          </div>

          <!-- 推播訊息 -->
          <BaseTextarea label="推播訊息" placeholder="請輸入推播訊息" class="col-span-2" />
          <div></div>

          <!-- 推播時間 -->
          <BaseInput label="推播時間" placeholder="請選擇推播時間" type="datetime-local" />

          <!-- 推播週期 -->
          <div class="row-span-3 col-span-2">
            <h5 class="text-sm font-semibold text-gray-900 mb-4">推播週期</h5>
            <div class="grid grid-cols-2 gap-2">
              <!-- 星期選擇 -->
              <CheckboxGroup
                v-model="formData.period!.week"
                :label-map="weekLabelMap"
                container-height="9rem"
              />

              <!-- 時間週期選擇 -->
              <CheckboxGroup
                v-model="formData.period!.time"
                :label-map="timeLabelMap"
                container-height="9rem"
              />
            </div>
          </div>
          <!-- 推播族群 -->
          <BaseSelect
            v-model="formData.target"
            label="推播族群"
            placeholder="請選擇推播族群"
            :options="targetOptions"
          />
          <!-- 推播狀態 -->
          <BaseSelect
            v-model="formData.status"
            label="推播狀態"
            placeholder="請選擇推播狀態"
            :options="statusOptions"
          />
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <!-- 操作按鈕 -->
          <div class="col-span-2 mt-8 flex justify-end gap-4">
            <!-- 取消按鈕 -->
            <IconButton
              :icon="X"
              title="取消"
              :iconSize="32"
              variant="secondary"
              @click="handleCancel"
            />

            <!-- 儲存按鈕 -->
            <IconButton
              :icon="Save"
              title="儲存"
              :iconSize="32"
              variant="primary"
            />
          </div>
        </div>
        <!-- 圖片預覽區域 -->
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
import BaseTextarea from '@/components/common/BaseTextarea.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import CheckboxGroup from '@/components/common/CheckboxGroup.vue'
import IconButton from '@/components/common/IconButton.vue'
import { CloudUpload, Save, X } from 'lucide-vue-next'
import { ref } from 'vue'
import type { PushDetail } from './data/mockPushDetail'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref<Partial<PushDetail>>({
  name: '',
  message: '',
  image: '',
  publishTime: '',
  target: 'ALL',
  period: {
    week: {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
    time: {
      everyday: false,
      everyThreeDays: false,
      everyFiveDays: false,
      everyWeek: false,
      everyTenDays: false,
      everyMonth: false,
    },
  },
  status: 'enabled',
})

// 選項配置
const targetOptions = [
  { value: 'ALL', label: '全部' },
  { value: '僅學生', label: '僅學生' },
  { value: '僅教師', label: '僅教師' },
]

const statusOptions = [
  { value: 'enabled', label: '啟用' },
  { value: 'disabled', label: '停用' },
]

// Label 對應表
const weekLabelMap = {
  mon: '星期一',
  tue: '星期二',
  wed: '星期三',
  thu: '星期四',
  fri: '星期五',
  sat: '星期六',
  sun: '星期日',
}

const timeLabelMap = {
  everyday: '每天',
  everyThreeDays: '每三天',
  everyFiveDays: '每五天',
  everyWeek: '每週',
  everyTenDays: '每十天',
  everyMonth: '每月',
}

// 處理取消操作
const handleCancel = () => {
  router.back()
}
</script>
