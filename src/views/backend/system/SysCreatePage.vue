<template>
  <PageContainer>
    <Card class="max-w-screen-xl">
      <div class="flex gap-6">
        <div class="grow-3 grid grid-cols-[4fr_4fr_1fr] gap-x-8 gap-y-4">
          <BaseInput v-model="formData.name" label="公告名稱" placeholder="請輸入公告名稱" />
          <BaseInput
            v-model="formData.imageUrl"
            label="公告圖片"
            placeholder="請輸入公告圖片 URL"
          />
          <div class="self-end -mb-1">
            <IconButton :icon="CloudUpload" :icon-size="32" title="上傳圖片" />
          </div>

          <BaseTextarea
            v-model="formData.message"
            label="公告訊息"
            placeholder="請輸入公告訊息"
            class="col-span-2"
          />
          <div></div>

          <BaseInput
            v-model="formData.upTime"
            label="上線時間"
            placeholder="請輸入上線時間"
            type="datetime-local"
          />
          <BaseInput
            v-model="formData.downTime"
            label="下線時間"
            placeholder="請輸入下線時間"
            type="datetime-local"
          />
          <div></div>

          <BaseSelect
            v-model="formData.appearTiming"
            label="出現時機"
            :options="[
              { label: '僅一次', value: 'once' },
              { label: '每次登入', value: 'everyLogin' },
            ]"
          />
          <BaseSelect
            v-model="formData.appearLocation"
            label="出現位置"
            :options="[
              { label: '首頁', value: 'home' },
              { label: '每一頁', value: 'everyPage' },
            ]"
          />
          <div></div>

          <BaseSelect
            v-model="formData.status"
            label="狀態"
            :options="[
              { label: '啟用', value: 'enable' },
              { label: '停用', value: 'disable' },
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
import { type SysDetail } from './data/mockSysDetail'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData: Ref<Partial<SysDetail>> = ref({
  name: '',
  imageUrl: '',
  message: '',
  upTime: '',
  downTime: '',
  appearTiming: 'once',
  appearLocation: 'home',
  status: 'enable',
})

const handleCancel = () => {
  router.back()
}
</script>
