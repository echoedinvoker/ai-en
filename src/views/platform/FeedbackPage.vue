<template>
  <PageContainer title="回饋分析">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 滿意度分佈圓餅圖 -->
      <Card>
        <template #header>
          <h3 class="text-lg font-semibold">滿意度分佈</h3>
        </template>
        <div ref="pieChartRef" class="w-full h-64"></div>
      </Card>

      <!-- 每月回饋趨勢線圖 -->
      <Card>
        <template #header>
          <h3 class="text-lg font-semibold">每月回饋趨勢</h3>
        </template>
        <div ref="lineChartRef" class="w-full h-64"></div>
      </Card>

      <!-- 回饋類型長條圖 -->
      <Card>
        <template #header>
          <h3 class="text-lg font-semibold">回饋類型統計</h3>
        </template>
        <div ref="barChartRef" class="w-full h-64"></div>
      </Card>

      <!-- 評分分佈直方圖 -->
      <Card>
        <template #header>
          <h3 class="text-lg font-semibold">評分分佈</h3>
        </template>
        <div ref="histogramRef" class="w-full h-64"></div>
      </Card>

      <!-- 部門滿意度散點圖 -->
      <Card class="lg:col-span-2">
        <template #header>
          <h3 class="text-lg font-semibold">部門滿意度 vs 回饋數量</h3>
        </template>
        <div ref="scatterRef" class="w-full h-80"></div>
      </Card>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import PageContainer from '@/components/common/PageContainer.vue'
import Card from '@/components/common/Card.vue'

// 圖表容器引用
const pieChartRef = ref<HTMLElement>()
const lineChartRef = ref<HTMLElement>()
const barChartRef = ref<HTMLElement>()
const histogramRef = ref<HTMLElement>()
const scatterRef = ref<HTMLElement>()

// 假資料
const satisfactionData = [
  { label: '非常滿意', value: 45, color: '#10b981' },
  { label: '滿意', value: 30, color: '#3b82f6' },
  { label: '普通', value: 15, color: '#f59e0b' },
  { label: '不滿意', value: 7, color: '#ef4444' },
  { label: '非常不滿意', value: 3, color: '#dc2626' }
]

const monthlyTrendData = [
  { month: '1月', count: 120 },
  { month: '2月', count: 135 },
  { month: '3月', count: 158 },
  { month: '4月', count: 142 },
  { month: '5月', count: 167 },
  { month: '6月', count: 189 },
  { month: '7月', count: 201 },
  { month: '8月', count: 178 },
  { month: '9月', count: 195 },
  { month: '10月', count: 213 },
  { month: '11月', count: 187 },
  { month: '12月', count: 156 }
]

const feedbackTypeData = [
  { type: '功能建議', count: 89 },
  { type: '錯誤回報', count: 67 },
  { type: '使用體驗', count: 134 },
  { type: '效能問題', count: 45 },
  { type: '介面設計', count: 78 },
  { type: '其他', count: 23 }
]

const ratingData = Array.from({ length: 100 }, () => Math.floor(Math.random() * 5) + 1)

const departmentData = [
  { department: '技術部', satisfaction: 4.2, feedbackCount: 89 },
  { department: '設計部', satisfaction: 4.5, feedbackCount: 67 },
  { department: '產品部', satisfaction: 3.8, feedbackCount: 134 },
  { department: '行銷部', satisfaction: 4.1, feedbackCount: 45 },
  { department: '業務部', satisfaction: 3.9, feedbackCount: 78 },
  { department: '人資部', satisfaction: 4.3, feedbackCount: 56 },
  { department: '財務部', satisfaction: 4.0, feedbackCount: 34 }
]

// 創建圓餅圖
const createPieChart = () => {
  if (!pieChartRef.value) return

  const width = 300
  const height = 250
  const radius = Math.min(width, height) / 2 - 10

  // 清除舊圖表
  d3.select(pieChartRef.value).selectAll('*').remove()

  const svg = d3.select(pieChartRef.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

  const pie = d3.pie<any>()
    .value(d => d.value)
    .sort(null)

  const arc = d3.arc<any>()
    .innerRadius(0)
    .outerRadius(radius)

  const arcs = svg.selectAll('.arc')
    .data(pie(satisfactionData))
    .enter()
    .append('g')
    .attr('class', 'arc')

  // 添加扇形
  arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => d.data.color)
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('mouseover', function(event, d) {
      d3.select(this).style('opacity', 0.8)
    })
    .on('mouseout', function() {
      d3.select(this).style('opacity', 1)
    })

  // 添加標籤
  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('fill', 'white')
    .text(d => `${d.data.value}%`)

  // 添加圖例
  const legend = svg.selectAll('.legend')
    .data(satisfactionData)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(${radius + 20}, ${-60 + i * 20})`)

  legend.append('rect')
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', d => d.color)

  legend.append('text')
    .attr('x', 20)
    .attr('y', 12)
    .attr('font-size', '12px')
    .text(d => d.label)
}

// 創建線圖
const createLineChart = () => {
  if (!lineChartRef.value) return

  const margin = { top: 20, right: 30, bottom: 40, left: 50 }
  const width = 400 - margin.left - margin.right
  const height = 250 - margin.top - margin.bottom

  d3.select(lineChartRef.value).selectAll('*').remove()

  const svg = d3.select(lineChartRef.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xScale = d3.scaleBand()
    .domain(monthlyTrendData.map(d => d.month))
    .range([0, width])
    .padding(0.1)

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(monthlyTrendData, d => d.count)!])
    .range([height, 0])

  const line = d3.line<any>()
    .x(d => xScale(d.month)! + xScale.bandwidth() / 2)
    .y(d => yScale(d.count))
    .curve(d3.curveMonotoneX)

  // 添加軸
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))

  svg.append('g')
    .call(d3.axisLeft(yScale))

  // 添加線條
  svg.append('path')
    .datum(monthlyTrendData)
    .attr('fill', 'none')
    .attr('stroke', '#3b82f6')
    .attr('stroke-width', 2)
    .attr('d', line)

  // 添加數據點
  svg.selectAll('.dot')
    .data(monthlyTrendData)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.month)! + xScale.bandwidth() / 2)
    .attr('cy', d => yScale(d.count))
    .attr('r', 4)
    .attr('fill', '#3b82f6')
    .style('cursor', 'pointer')
    .on('mouseover', function(event, d) {
      // 顯示提示框
      const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0,0,0,0.8)')
        .style('color', 'white')
        .style('padding', '8px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .text(`${d.month}: ${d.count} 則回饋`)

      tooltip.style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px')
    })
    .on('mouseout', function() {
      d3.selectAll('.tooltip').remove()
    })
}

// 創建長條圖
const createBarChart = () => {
  if (!barChartRef.value) return

  const margin = { top: 20, right: 30, bottom: 60, left: 50 }
  const width = 400 - margin.left - margin.right
  const height = 250 - margin.top - margin.bottom

  d3.select(barChartRef.value).selectAll('*').remove()

  const svg = d3.select(barChartRef.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xScale = d3.scaleBand()
    .domain(feedbackTypeData.map(d => d.type))
    .range([0, width])
    .padding(0.1)

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(feedbackTypeData, d => d.count)!])
    .range([height, 0])

  // 添加軸
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-45)')

  svg.append('g')
    .call(d3.axisLeft(yScale))

  // 添加長條
  svg.selectAll('.bar')
    .data(feedbackTypeData)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.type)!)
    .attr('width', xScale.bandwidth())
    .attr('y', d => yScale(d.count))
    .attr('height', d => height - yScale(d.count))
    .attr('fill', '#10b981')
    .style('cursor', 'pointer')
    .on('mouseover', function(event, d) {
      d3.select(this).attr('fill', '#059669')
    })
    .on('mouseout', function() {
      d3.select(this).attr('fill', '#10b981')
    })

  // 添加數值標籤
  svg.selectAll('.label')
    .data(feedbackTypeData)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => xScale(d.type)! + xScale.bandwidth() / 2)
    .attr('y', d => yScale(d.count) - 5)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .text(d => d.count)
}

// 創建直方圖
const createHistogram = () => {
  if (!histogramRef.value) return

  const margin = { top: 20, right: 30, bottom: 40, left: 50 }
  const width = 400 - margin.left - margin.right
  const height = 250 - margin.top - margin.bottom

  d3.select(histogramRef.value).selectAll('*').remove()

  const svg = d3.select(histogramRef.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xScale = d3.scaleLinear()
    .domain([0.5, 5.5])
    .range([0, width])

  const histogram = d3.histogram()
    .value(d => d as number)
    .domain(xScale.domain() as [number, number])
    .thresholds(xScale.ticks(5))

  const bins = histogram(ratingData)

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)!])
    .range([height, 0])

  // 添加軸
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).tickFormat(d => `${d}星`))

  svg.append('g')
    .call(d3.axisLeft(yScale))

  // 添加長條
  svg.selectAll('.bar')
    .data(bins)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.x0!))
    .attr('width', d => Math.max(0, xScale(d.x1!) - xScale(d.x0!) - 1))
    .attr('y', d => yScale(d.length))
    .attr('height', d => height - yScale(d.length))
    .attr('fill', '#f59e0b')
    .style('cursor', 'pointer')
    .on('mouseover', function(event, d) {
      d3.select(this).attr('fill', '#d97706')
    })
    .on('mouseout', function() {
      d3.select(this).attr('fill', '#f59e0b')
    })
}

// 創建散點圖
const createScatterPlot = () => {
  if (!scatterRef.value) return

  const margin = { top: 20, right: 30, bottom: 60, left: 80 }
  const width = 600 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom

  d3.select(scatterRef.value).selectAll('*').remove()

  const svg = d3.select(scatterRef.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(departmentData, d => d.feedbackCount)! * 1.1])
    .range([0, width])

  const yScale = d3.scaleLinear()
    .domain([3.5, 5])
    .range([height, 0])

  // 添加軸
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))

  svg.append('g')
    .call(d3.axisLeft(yScale))

  // 添加軸標籤
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('滿意度評分')

  svg.append('text')
    .attr('transform', `translate(${width / 2}, ${height + margin.bottom - 10})`)
    .style('text-anchor', 'middle')
    .text('回饋數量')

  // 添加散點
  svg.selectAll('.dot')
    .data(departmentData)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.feedbackCount))
    .attr('cy', d => yScale(d.satisfaction))
    .attr('r', 8)
    .attr('fill', '#8b5cf6')
    .attr('stroke', '#7c3aed')
    .attr('stroke-width', 2)
    .style('cursor', 'pointer')
    .on('mouseover', function(event, d) {
      d3.select(this).attr('r', 12)

      const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0,0,0,0.8)')
        .style('color', 'white')
        .style('padding', '8px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .html(`<strong>${d.department}</strong><br/>滿意度: ${d.satisfaction}<br/>回饋數: ${d.feedbackCount}`)

      tooltip.style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 10) + 'px')
    })
    .on('mouseout', function() {
      d3.select(this).attr('r', 8)
      d3.selectAll('.tooltip').remove()
    })

  // 添加部門標籤
  svg.selectAll('.label')
    .data(departmentData)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => xScale(d.feedbackCount) + 12)
    .attr('y', d => yScale(d.satisfaction) + 4)
    .attr('font-size', '10px')
    .attr('fill', '#374151')
    .text(d => d.department)
}

onMounted(() => {
  // 延遲執行以確保 DOM 元素已渲染
  setTimeout(() => {
    createPieChart()
    createLineChart()
    createBarChart()
    createHistogram()
    createScatterPlot()
  }, 100)
})
</script>

<style scoped>
/* 圖表容器樣式 */
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 響應式調整 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

