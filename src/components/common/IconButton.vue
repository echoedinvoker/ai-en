<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :title="title"
    :class="[
      // 基礎樣式
      'px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
      // 變體樣式
      variants[variant] ?? variants.default
    ]"
  >
    <component :is="icon" :size="iconSize" />
  </button>
</template>

<script setup lang="ts">
// 定義變體樣式
const variants = {
  default: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400 focus:ring-gray-400',
  primary: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600 focus:ring-blue-400',
  success: 'bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 focus:ring-green-400',
  danger: 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 focus:ring-red-400'
}

defineProps({
  // 圖標組件
  icon: {
    type: Object,
    required: true
  },
  // 圖標大小
  iconSize: {
    type: Number,
    default: 22
  },
  // 按鈕變體
  variant: {
    type: String,
    default: 'default'
  },
  // 禁用狀態
  disabled: {
    type: Boolean,
    default: false
  },
  // 提示文字
  title: {
    type: String,
    default: ''
  }
})

// 定義事件
defineEmits(['click'])
</script>

