<template>
  <div class="grid grid-cols-2 gap-6">
    <BaseTextarea
      label="題目要點"
      type="text"
      placeholder="請輸入題目的核心要點，例如：主題、關鍵概念、重點內容等"
    />
    <div></div>

    <BaseTextarea
      label="題目作文內容要點"
      type="text"
      placeholder="請描述作文題目的內容要點，例如：寫作主題、文體要求、字數限制等"
    />
    <div></div>

    <BaseTextarea
      label="題目圖片1要點"
      type="text"
      placeholder="請描述第一張圖片的重點內容，例如：圖片主題、關鍵元素、相關資訊等"
    />
    <div></div>

    <BaseTextarea
      label="題目圖片2要點"
      type="text"
      placeholder="請描述第二張圖片的重點內容，例如：圖片主題、關鍵元素、相關資訊等"
    />
    <div></div>

    <BaseTextarea
      label="題目圖片3要點"
      type="text"
      placeholder="請描述第三張圖片的重點內容，例如：圖片主題、關鍵元素、相關資訊等"
    />
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
</template>

<script setup lang="ts">
import BaseTextarea from '@/components/common/BaseTextarea.vue'
import IconButton from '@/components/common/IconButton.vue'
import { X, Save } from 'lucide-vue-next'
</script>

