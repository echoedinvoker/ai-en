<template>
  <div class="relative inline-block">
    <button
      @click="$emit('click')"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      :disabled="disabled"
      :class="[
        'px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant as keyof typeof variants] ?? variants.default
      ]"
    >
      <component :is="icon" :size="iconSize" />
    </button>

    <!-- 自定義 tooltip -->
    <div
      v-if="title && showTooltip"
      class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded whitespace-nowrap z-50 pointer-events-none"
    >
      {{ title }}
      <!-- 箭頭 -->
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { ref } from 'vue'

// 控制 tooltip 顯示狀態
const showTooltip = ref(false)

const variants = {
  default: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400 focus:ring-gray-400',
  primary: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600 focus:ring-blue-400',
  secondary: 'text-gray-700 border border-gray-300 hover:bg-gray-50',
  success: 'bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 focus:ring-green-400',
  danger: 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 focus:ring-red-400',
  // 表格操作按鈕樣式 - 適用於所有表格中的操作按鈕
  'table-action': 'text-blue-600 border-transparent hover:text-blue-900 hover:bg-blue-50 focus:ring-blue-400 p-1',
}

defineProps<{
  icon: Component
  iconSize?: number
  variant?: keyof typeof variants
  disabled?: boolean
  title?: string
}>()

defineEmits<{
  click: []
}>()
</script>

