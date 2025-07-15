<template>
  <div :class="cardClasses">
    <!-- 預設插槽用於放置內容 -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // 是否移除預設的 padding
  noPadding?: boolean
  // 自定義額外的 CSS 類別
  class?: string
  // 陰影變體
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  noPadding: false,
  class: '',
  shadow: 'md'
})

// 計算最終的 CSS 類別
const cardClasses = computed(() => {
  const baseClasses = 'bg-white rounded-lg'
  const paddingClass = props.noPadding ? '' : 'p-6'
  const shadowClass = props.shadow === 'none' ? '' : `shadow${props.shadow === 'md' ? '' : `-${props.shadow}`}`

  return [
    baseClasses,
    paddingClass,
    shadowClass,
    props.class
  ].filter(Boolean).join(' ')
})
</script>

