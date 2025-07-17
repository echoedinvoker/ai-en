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
    <Card v-else-if="sysDetail" class="max-w-screen-xl">
      <div class="flex gap-6">
        <div class="grow-3 grid grid-cols-[4fr_4fr_1fr] gap-x-8 gap-y-4">
          <BaseInput v-model="sysDetail.name" label="公告名稱" placeholder="請輸入公告名稱" />
          <BaseInput
            v-model="sysDetail.imageUrl"
            label="公告圖片"
            placeholder="請輸入公告圖片 URL"
          />
          <div class="self-end -mb-1">
            <IconButton :icon="CloudUpload" :icon-size="32" title="上傳圖片" />
          </div>

          <BaseTextarea
            v-model="sysDetail.message"
            label="公告訊息"
            placeholder="請輸入公告訊息"
            class="col-span-2"
          />
          <div></div>

          <BaseInput
            v-model="sysDetail.upTime"
            label="上線時間"
            placeholder="請輸入上線時間"
            type="datetime-local"
          />
          <BaseInput
            v-model="sysDetail.downTime"
            label="下線時間"
            placeholder="請輸入下線時間"
            type="datetime-local"
          />
          <div></div>

          <BaseSelect
            v-model="sysDetail.appearTiming"
            label="出現時機"
            :options="[
              { label: '登入時', value: 'login' },
              { label: '遊戲中', value: 'inGame' },
              { label: '登出時', value: 'logout' },
            ]"
          />
          <BaseSelect
            v-model="sysDetail.appearLocation"
            label="出現位置"
            :options="[
              { label: '草稿', value: 'draft' },
              { label: '已發布', value: 'published' },
              { label: '已下線', value: 'offline' },
            ]"
          />
          <div></div>

          <BaseInput v-model="sysDetail.createdAt" label="建立時間" disabled />
          <BaseInput v-model="sysDetail.createdBy" label="建立人員" disabled />
          <div></div>

          <BaseInput v-model="sysDetail.updatedAt" label="最近修改時間" disabled />
          <BaseInput v-model="sysDetail.updatedBy" label="最近修改人員" disabled />
          <div class="flex items-end">
            <BaseButton variant="slate" class="-ml-2"> LOG </BaseButton>
          </div>

          <BaseSelect
            v-model="sysDetail.status"
            label="公告狀態"
            :options="[
              { label: '草稿', value: 'draft' },
              { label: '已發布', value: 'published' },
              { label: '已下線', value: 'offline' },
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

          <!-- 操作按鈕 -->
          <div class="col-span-2 mt-8 flex justify-end gap-4">
            <!-- 取消按鈕：次要動作，使用較淡的顏色 -->
            <IconButton
              @click="handleCancel"
              :disabled="updating"
              :icon="X"
              title="取消"
              :iconSize="32"
              variant="secondary"
            />
            <!-- 儲存按鈕：主要動作，使用強調色 -->
            <IconButton
              @click="handleSave"
              :disabled="updating"
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
import Card from '@/components/common/Card.vue'
import PageContainer from '@/components/common/PageContainer.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseTextarea from '@/components/common/BaseTextarea.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import IconButton from '@/components/common/IconButton.vue'
import { CloudUpload, X, Save } from 'lucide-vue-next'
import { useSysDetail } from './composables/useSysDetail'
import { useRouter } from 'vue-router'

const { sysDetail, loading, error, updateSysDetail, updating } = useSysDetail()

const router = useRouter()

const handleSave = () => {
  if (sysDetail.value) {
    updateSysDetail(sysDetail.value) // 傳遞 sysDetail 資料給 mutation 函數
  }
}

const handleCancel = () => {
  router.back()
}
</script>
