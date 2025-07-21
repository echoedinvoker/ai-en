<template>
  <div class="relative" :style="{ height: `${size}px` }">
    <svg ref="svgRef" class="w-full h-full"></svg>
    <!-- 中心文字 -->
    <div class="absolute inset-0 flex items-center justify-center">
      <slot>
        <span class="text-4xl font-bold text-gray-800">
          {{ Math.round(animatedProgress * 100) }}%
        </span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as d3 from 'd3'

interface Props {
  progress: number // 0-1 之間的進度值
  size?: number // 圓形大小
  strokeWidth?: number // 線條寬度
  color?: string // 進度條顏色
  backgroundColor?: string // 背景圓圈顏色
  duration?: number // 動畫持續時間 (ms)
}

const props = withDefaults(defineProps<Props>(), {
  size: 256,
  strokeWidth: 8,
  color: '#3b82f6',
  backgroundColor: '#e5e7eb',
  duration: 1000
})

const svgRef = ref<SVGElement>()
const animatedProgress = ref(0)

let svg: d3.Selection<SVGElement, unknown, null, undefined>
let backgroundCircle: d3.Selection<SVGCircleElement, unknown, null, undefined>
let progressCircle: d3.Selection<SVGCircleElement, unknown, null, undefined>

const radius = 50
const circumference = 2 * Math.PI * radius

const initializeD3 = () => {
  if (!svgRef.value) return

  // 清除現有內容
  d3.select(svgRef.value).selectAll('*').remove()

  svg = d3.select(svgRef.value)
    .attr('viewBox', '0 0 120 120')

  // 背景圓圈
  backgroundCircle = svg.append('circle')
    .attr('cx', 60)
    .attr('cy', 60)
    .attr('r', radius)
    .attr('stroke', props.backgroundColor)
    .attr('stroke-width', props.strokeWidth)
    .attr('fill', 'none')

  // 進度圓圈
  progressCircle = svg.append('circle')
    .attr('cx', 60)
    .attr('cy', 60)
    .attr('r', radius)
    .attr('stroke', props.color)
    .attr('stroke-width', props.strokeWidth)
    .attr('fill', 'none')
    .attr('stroke-dasharray', circumference)
    .attr('stroke-dashoffset', circumference) // 初始為完全隱藏
    .attr('stroke-linecap', 'round')
    .attr('transform', 'rotate(-90 60 60)') // 從頂部開始
}

const animateProgress = (targetProgress: number) => {
  if (!progressCircle) return

  // 動畫進度條
  progressCircle
    .transition()
    .duration(props.duration)
    .ease(d3.easeCubicOut) // 修正：使用正確的函數名稱
    .attr('stroke-dashoffset', circumference - (circumference * targetProgress))

  // 動畫中心文字數字
  const startProgress = animatedProgress.value
  const progressTween = d3.interpolate(startProgress, targetProgress)

  d3.select({} as any)
    .transition()
    .duration(props.duration)
    .ease(d3.easeCubicOut) // 修正：使用正確的函數名稱
    .tween('progress', function() {
      return function(t) {
        animatedProgress.value = progressTween(t)
      }
    })
}

onMounted(() => {
  initializeD3()
  // 組件載入後開始動畫
  setTimeout(() => {
    animateProgress(props.progress)
  }, 100)
})

// 監聽 progress 變化
watch(() => props.progress, (newProgress) => {
  animateProgress(newProgress)
})

// 監聽其他 props 變化，重新初始化
watch([
  () => props.color,
  () => props.backgroundColor,
  () => props.strokeWidth
], () => {
  initializeD3()
  animateProgress(props.progress)
})
</script>

