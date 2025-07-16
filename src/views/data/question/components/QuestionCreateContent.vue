<template>
  <div class="flex gap-3">
    <div class="grow-2 grid grid-cols-[5fr_5fr_1fr] gap-4">
      <BaseInput label="題庫ID" type="text" placeholder="例如：TOEFL-001" />
      <BaseInput
        label="題庫完整名稱"
        type="text"
        placeholder="例如：TOEFL Writing Task 1 - Academic Discussion"
      />
      <div></div>

      <BaseInput label="題庫短名稱" type="text" placeholder="例如：TOEFL-W1" />
      <BaseInput label="題庫出處" type="text" placeholder="例如：ETS Official Guide 2024" />
      <div></div>

      <BaseInput label="內容說明文" type="text" placeholder="簡述題目內容與要求" />
      <BaseInput label="題庫圖片(最多匯入3張圖片)" type="text" placeholder="圖片檔案名稱或路徑" />
      <div class="self-end -mb-1">
        <IconButton :icon="CloudUpload" title="新增題庫圖片" :iconSize="32" />
      </div>

      <BaseTextarea
        label="範文"
        placeholder="請輸入完整範文內容，包含題目要求、寫作指導和範例答案..."
        type="text"
        class="col-span-2"
      />
      <div></div>

      <BaseSelect
        label="上架狀態"
        :options="[
          { value: 'ALL', label: 'ALL' },
          { value: 'published', label: '上架中' },
          { value: 'unpublished', label: '未上架' },
          { value: 'archived', label: '已下架' },
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

      <div></div>
      <div class="flex justify-end gap-6">
        <!-- 取消按鈕：次要動作，使用較淡的顏色 -->
        <IconButton :icon="X" title="取消" :iconSize="32" variant="secondary" />
        <!-- 儲存按鈕：主要動作，使用強調色 -->
        <IconButton :icon="Save" title="儲存" :iconSize="32" variant="primary" />
      </div>
    </div>
    <div class="grow-1 flex flex-col gap-2 justify-center align-center">
      <div
        v-for="index in 3"
        :key="index"
        class="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
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
</template>

<script setup lang="ts">
import BaseInput from '@/components/common/BaseInput.vue'
import BaseTextarea from '@/components/common/BaseTextarea.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import IconButton from '@/components/common/IconButton.vue'
import { CloudUpload, X, Save } from 'lucide-vue-next'
</script>
