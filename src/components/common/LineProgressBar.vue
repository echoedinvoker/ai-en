<template>
  <div class="flex items-center gap-2">
    <!-- 分數顯示 -->
    <span v-if="showScore" class="font-semibold whitespace-nowrap">
      <span ref="scoreTextRef">{{ animated ? 0 : displayScore }}</span>/{{ maxScore }}
    </span>

    <!-- D3 進度條容器 -->
    <div class="flex-1" :style="{ minWidth: '100px' }">
      <svg ref="svgRef" :width="svgWidth" :height="svgHeight"></svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import * as d3 from 'd3'

interface Props {
  score?: number
  maxScore?: number
  progress?: number
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red'
  size?: 'sm' | 'md' | 'lg'
  showScore?: boolean
  animated?: boolean // 新增：是否啟用動畫
  duration?: number  // 新增：動畫持續時間(ms)
}

const props = withDefaults(defineProps<Props>(), {
  maxScore: 10,
  color: 'blue',
  size: 'md',
  showScore: true,
  animated: true,
  duration: 1000
})

const svgRef = ref<SVGElement>()
const scoreTextRef = ref<HTMLElement>()
const svgWidth = ref(200)
const svgHeight = computed(() => {
  const heights = { sm: 8, md: 12, lg: 16 }
  return heights[props.size]
})

// 計算顯示分數
const displayScore = computed(() => {
  return props.score !== undefined ? props.score : 0
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

// 顏色映射
const colors = {
  blue: '#3b82f6',
  green: '#10b981',
  purple: '#8b5cf6',
  orange: '#f59e0b',
  red: '#ef4444'
}

// 初始化 D3 進度條
const initProgressBar = () => {
  if (!svgRef.value) return

  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove() // 清除舊內容

  // 更新 SVG 寬度以適應容器
  const containerWidth = svgRef.value.parentElement?.clientWidth || 200
  svgWidth.value = containerWidth

  // 背景條
  svg.append('rect')
    .attr('class', 'bg-bar')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', svgWidth.value)
    .attr('height', svgHeight.value)
    .attr('rx', svgHeight.value / 2)
    .attr('fill', '#e5e7eb')

  // 進度條
  const progressBar = svg.append('rect')
    .attr('class', 'progress-bar')
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', svgHeight.value)
    .attr('rx', svgHeight.value / 2)
    .attr('fill', colors[props.color])

  // 根據是否啟用動畫設置初始寬度
  if (props.animated) {
    progressBar.attr('width', 0)
  } else {
    progressBar.attr('width', (percentage.value / 100) * svgWidth.value)
  }
}

// 更新進度條動畫
const updateProgressBar = () => {
  if (!svgRef.value) return

  const svg = d3.select(svgRef.value)
  const progressBar = svg.select('.progress-bar')
  const targetWidth = (percentage.value / 100) * svgWidth.value

  if (props.animated) {
    // 進度條動畫
    progressBar
      .transition()
      .duration(props.duration)
      .ease(d3.easeQuadOut)
      .attr('width', targetWidth)

    // 分數文字動畫
    if (props.showScore && scoreTextRef.value) {
      const textElement = d3.select(scoreTextRef.value)
      textElement
        .transition()
        .duration(props.duration)
        .ease(d3.easeQuadOut)
        .tween('text', function() {
          const interpolate = d3.interpolateNumber(0, displayScore.value)
          return function(t) {
            this.textContent = Math.round(interpolate(t)).toString()
          }
        })
    }
  } else {
    // 無動畫直接設置
    progressBar.attr('width', targetWidth)
  }
}

// 監聽尺寸變化
const handleResize = () => {
  nextTick(() => {
    initProgressBar()
    updateProgressBar()
  })
}

onMounted(() => {
  initProgressBar()
  updateProgressBar()

  // 監聽窗口大小變化
  window.addEventListener('resize', handleResize)
})

// 監聽 props 變化
watch([() => props.score, () => props.progress, () => props.color], () => {
  updateProgressBar()
})

watch(() => props.size, () => {
  initProgressBar()
  updateProgressBar()
})

// 清理事件監聽器
import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

