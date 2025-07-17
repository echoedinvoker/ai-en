<template>
  <PageContainer>
    <!-- Loading 狀態 -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="text-gray-500">載入中...</div>
    </div>

    <!-- Error 狀態 -->
    <div v-else-if="error" class="flex justify-center items-center h-64">
      <div class="text-red-500">載入失敗: {{ error.message }}</div>
    </div>

    <!-- 主要內容 -->
    <Card v-else-if="pushDetail" class="max-w-screen-xl">
      <div class="flex gap-6">
        <div class="grow-3 grid grid-cols-[4fr_4fr_1fr] gap-x-8 gap-y-4">
          <!-- 推播名稱 -->
          <BaseInput
            v-model="formData.name"
            label="推播名稱 (信件標題)"
            placeholder="請輸入推播名稱"
          />

          <!-- 推播圖片 -->
          <BaseInput v-model="formData.image" label="推播圖片" placeholder="請輸入推播圖片 URL" />

          <!-- 上傳圖片按鈕 -->
          <div class="self-end -mb-1">
            <IconButton :icon="CloudUpload" :icon-size="32" title="上傳圖片" />
          </div>

          <!-- 推播訊息 -->
          <BaseTextarea
            v-model="formData.message"
            label="推播訊息"
            placeholder="請輸入推播訊息"
            class="col-span-2"
          />
          <div></div>

          <!-- 推播時間 -->
          <BaseInput
            v-model="formData.publishTime"
            label="推播時間"
            placeholder="請選擇推播時間"
            type="datetime-local"
          />

          <!-- 推播週期 -->
          <div class="row-span-3 col-span-2">
            <h5 class="text-sm font-semibold text-gray-900 mb-4">推播週期</h5>
            <div class="grid grid-cols-2 gap-2">
              <!-- 星期選擇 -->
              <CheckboxGroup
                v-model="formData.period.week"
                :label-map="weekLabelMap"
                container-height="9rem"
              />

              <!-- 時間週期選擇 -->
              <CheckboxGroup
                v-model="formData.period.time"
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
          <div></div>
          <div></div>
          <div></div>
          <div></div>

          <!-- 建立時間 -->
          <BaseInput
            :model-value="formatDateTime(pushDetail.createdAt)"
            label="建立時間"
            disabled
          />

          <!-- 建立人員 -->
          <BaseInput :model-value="pushDetail.createdBy" label="建立人員" disabled />
          <div></div>

          <!-- 最近修改時間 -->
          <BaseInput
            :model-value="formatDateTime(pushDetail.updatedAt)"
            label="最近修改時間"
            disabled
          />

          <!-- 最近修改人員 -->
          <BaseInput :model-value="pushDetail.updatedBy" label="最近修改人員" disabled />

          <!-- LOG 按鈕 -->
          <div class="flex items-end">
            <BaseButton variant="slate" class="-ml-2"> LOG </BaseButton>
          </div>

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
              :disabled="updating"
              @click="handleSave"
            />
          </div>
        </div>

        <!-- 圖片預覽區域 -->
        <div class="grow-1 flex flex-col">
          <div
            class="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
          >
            <!-- 有圖片時顯示圖片 -->
            <img
              v-if="formData.image"
              :src="formData.image"
              :alt="formData.name"
              class="max-w-full max-h-full object-contain"
            />

            <!-- 無圖片時顯示預設內容 -->
            <div v-else class="flex flex-col items-center text-gray-400">
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
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CheckboxGroup from '@/components/common/CheckboxGroup.vue'
import PageContainer from '@/components/common/PageContainer.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseTextarea from '@/components/common/BaseTextarea.vue'
import IconButton from '@/components/common/IconButton.vue'
import Card from '@/components/common/Card.vue'
import { CloudUpload, X, Save } from 'lucide-vue-next'
import { usePushDetail } from './composables/usePushDetail'
import type { PushDetail } from './data/mockPushDetail'
import { formatDateTime, type formatDate } from '@/utils/dateTime'

const router = useRouter()

// 使用 composable 獲取推播詳情和更新功能
const { pushDetail, loading, error, updatePushDetail, updating } = usePushDetail()

// 表單資料
const formData = ref<PushDetail>({
  id: 0,
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
  createdAt: '',
  createdBy: '',
  updatedAt: '',
  updatedBy: '',
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
  sun: '星期日'
}

const timeLabelMap = {
  everyday: '每天',
  everyThreeDays: '每三天',
  everyFiveDays: '每五天',
  everyWeek: '每週',
  everyTenDays: '每十天',
  everyMonth: '每月'
}

// 監聽推播詳情資料變化，同步到表單
watch(
  pushDetail,
  (newDetail) => {
    if (newDetail) {
      formData.value = { ...newDetail }
    }
  },
  { immediate: true },
)

// 處理取消操作
const handleCancel = () => {
  router.back()
}

// 處理儲存操作
const handleSave = () => {
  updatePushDetail(formData.value)
}
</script>
