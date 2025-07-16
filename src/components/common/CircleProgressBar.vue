<template>
  <div class="relative" :style="{ height: `${size}px` }">
    <!-- 背景圓圈 -->
    <svg class="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r="50"
        :stroke="backgroundColor"
        :stroke-width="strokeWidth"
        fill="none"
      />
      <!-- 進度圓圈 -->
      <circle
        cx="60"
        cy="60"
        r="50"
        :stroke="color"
        :stroke-width="strokeWidth"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="circumference - (circumference * progress)"
        stroke-linecap="round"
        class="transition-all duration-500"
      />
    </svg>
    <!-- 中心文字 -->
    <div class="absolute inset-0 flex items-center justify-center">
      <slot>
        <span class="text-4xl font-bold text-gray-800">
          {{ Math.round(progress * 100) }}%
        </span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number // 0-1 之間的進度值
  size?: number // 圓形大小
  strokeWidth?: number // 線條寬度
  color?: string // 進度條顏色
  backgroundColor?: string // 背景圓圈顏色
}

const props = withDefaults(defineProps<Props>(), {
  size: 256,
  strokeWidth: 8,
  color: '#3b82f6',
  backgroundColor: '#e5e7eb'
})

// 計算圓周長 (2 * π * r, r=50)
const circumference = 314
</script>

