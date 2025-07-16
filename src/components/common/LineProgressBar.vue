<template>
  <div class="flex items-center gap-2">
    <!-- 分數顯示 -->
    <span v-if="showScore" class="font-semibold whitespace-nowrap">
      {{ score }}/{{ maxScore }}
    </span>

    <!-- 進度條容器 -->
    <div
      class="flex-1 rounded-full transition-all duration-500"
      :style="containerStyle"
    >
      <div
        class="rounded-full transition-all duration-500"
        :style="progressStyle"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  score?: number
  maxScore?: number
  progress?: number
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
  size?: 'sm' | 'md' | 'lg'
  showScore?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxScore: 10,
  color: 'blue',
  size: 'md',
  showScore: true
})

// 計算進度百分比
const percentage = computed(() => {
  if (props.progress !== undefined) {
    return Math.min(Math.max(props.progress * 100, 0), 100)
  }
  if (props.score !== undefined && props.maxScore) {
    return Math.min(Math.max((props.score / props.maxScore) * 100, 0), 100)
  }
  return 0
})

// 容器樣式 (背景和高度)
const containerStyle = computed(() => {
  const heights = {
    sm: '8px',
    md: '12px',
    lg: '16px'
  }

  return {
    backgroundColor: '#e5e7eb', // gray-200
    height: heights[props.size],
    minWidth: '100px' // 確保有最小寬度
  }
})

// 進度條樣式
const progressStyle = computed(() => {
  const colors = {
    blue: '#3b82f6',   // blue-500
    green: '#10b981',  // green-500
    purple: '#8b5cf6', // purple-500
    orange: '#f59e0b', // orange-500
    red: '#ef4444'     // red-500
  }

  return {
    backgroundColor: colors[props.color],
    width: `${percentage.value}%`,
    height: '100%'
  }
})
</script>
