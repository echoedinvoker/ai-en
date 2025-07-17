<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p class="text-gray-600">數據分析總覽</p>
    </div>

    <!-- 統計卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.title" class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
          </div>
          <div :class="stat.color" class="p-3 rounded-full">
            <component :is="stat.icon" class="w-6 h-6 text-white" />
          </div>
        </div>
        <div class="mt-4 flex items-center">
          <span :class="stat.changeColor" class="text-sm font-medium">
            {{ stat.change }}
          </span>
          <span class="text-sm text-gray-500 ml-2">vs last month</span>
        </div>
      </div>
    </div>

    <!-- 圖表區域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- 折線圖 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">用戶增長趨勢</h3>
        <div ref="lineChartRef" class="w-full h-64"></div>
      </div>

      <!-- 長條圖 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">月度收入</h3>
        <div ref="barChartRef" class="w-full h-64"></div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 圓餅圖 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">用戶分佈</h3>
        <div ref="pieChartRef" class="w-full h-64"></div>
      </div>

      <!-- 散點圖 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">性能指標</h3>
        <div ref="scatterChartRef" class="w-full h-64"></div>
      </div>

      <!-- 甜甜圈圖 -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">設備類型</h3>
        <div ref="donutChartRef" class="w-full h-64"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-vue-next'

// 統計數據
const stats = ref([
  {
    title: '總用戶數',
    value: '12,345',
    change: '+12.5%',
    changeColor: 'text-green-600',
    color: 'bg-blue-500',
    icon: Users
  },
  {
    title: '月收入',
    value: '$45,678',
    change: '+8.2%',
    changeColor: 'text-green-600',
    color: 'bg-green-500',
    icon: DollarSign
  },
  {
    title: '訂單數',
    value: '1,234',
    change: '-2.4%',
    changeColor: 'text-red-600',
    color: 'bg-yellow-500',
    icon: ShoppingCart
  },
  {
    title: '轉換率',
    value: '3.45%',
    change: '+5.1%',
    changeColor: 'text-green-600',
    color: 'bg-purple-500',
    icon: TrendingUp
  }
])

// 圖表 refs
const lineChartRef = ref<HTMLElement>()
const barChartRef = ref<HTMLElement>()
const pieChartRef = ref<HTMLElement>()
const scatterChartRef = ref<HTMLElement>()
const donutChartRef = ref<HTMLElement>()

// 假數據
const lineData = [
  { date: '2024-01', value: 100 },
  { date: '2024-02', value: 150 },
  { date: '2024-03', value: 200 },
  { date: '2024-04', value: 180 },
  { date: '2024-05', value: 250 },
  { date: '2024-06', value: 300 },
  { date: '2024-07', value: 280 },
  { date: '2024-08', value: 350 },
  { date: '2024-09', value: 400 },
  { date: '2024-10', value: 380 },
  { date: '2024-11', value: 450 },
  { date: '2024-12', value: 500 }
]

const barData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 }
]

const pieData = [
  { label: '新用戶', value: 45 },
  { label: '回訪用戶', value: 35 },
  { label: '活躍用戶', value: 20 }
]

const scatterData = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 10 + 2
}))

const donutData = [
  { label: '桌面', value: 60 },
  { label: '手機', value: 30 },
  { label: '平板', value: 10 }
]

// 創建折線圖
const createLineChart = () => {
  if (!lineChartRef.value) return

  const container = d3.select(lineChartRef.value)
  container.selectAll('*').remove()

  const margin = { top: 20, right: 30, bottom: 40, left: 50 }
  const width = lineChartRef.value.clientWidth - margin.left - margin.right
  const height = 256 - margin.top - margin.bottom

  const svg = container
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // 解析日期
  const parseDate = d3.timeParse('%Y-%m')
  const data = lineData.map(d => ({
    date: parseDate(d.date)!,
    value: d.value
  }))

  // 比例尺
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.date) as [Date, Date])
    .range([0, width])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)!])
    .range([height, 0])

  // 線條生成器
  const line = d3.line<{ date: Date; value: number }>()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value))
    .curve(d3.curveMonotoneX)

  // 添加軸
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b')))

  g.append('g')
    .call(d3.axisLeft(yScale))

  // 添加線條
  g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#3b82f6')
    .attr('stroke-width', 2)
    .attr('d', line)

  // 添加數據點
  g.selectAll('.dot')
    .data(data)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.date))
    .attr('cy', d => yScale(d.value))
    .attr('r', 4)
    .attr('fill', '#3b82f6')
}

// 創建長條圖
const createBarChart = () => {
  if (!barChartRef.value) return

  const container = d3.select(barChartRef.value)
  container.selectAll('*').remove()

  const margin = { top: 20, right: 30, bottom: 40, left: 50 }
  const width = barChartRef.value.clientWidth - margin.left - margin.right
  const height = 256 - margin.top - margin.bottom

  const svg = container
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // 比例尺
  const xScale = d3.scaleBand()
    .domain(barData.map(d => d.month))
    .range([0, width])
    .padding(0.1)

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(barData, d => d.revenue)!])
    .range([height, 0])

  // 添加軸
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale))

  g.append('g')
    .call(d3.axisLeft(yScale).tickFormat(d => `$${d / 1000}k`))

  // 添加長條
  g.selectAll('.bar')
    .data(barData)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => xScale(d.month)!)
    .attr('width', xScale.bandwidth())
    .attr('y', d => yScale(d.revenue))
    .attr('height', d => height - yScale(d.revenue))
    .attr('fill', '#10b981')
}

// 創建圓餅圖
const createPieChart = () => {
  if (!pieChartRef.value) return

  const container = d3.select(pieChartRef.value)
  container.selectAll('*').remove()

  const width = pieChartRef.value.clientWidth
  const height = 256
  const radius = Math.min(width, height) / 2 - 20

  const svg = container
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)

  const color = d3.scaleOrdinal(['#3b82f6', '#10b981', '#f59e0b'])

  const pie = d3.pie<{ label: string; value: number }>()
    .value(d => d.value)

  const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
    .innerRadius(0)
    .outerRadius(radius)

  const arcs = g.selectAll('.arc')
    .data(pie(pieData))
    .enter().append('g')
    .attr('class', 'arc')

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(i.toString()))

  // 添加標籤
  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('fill', 'white')
    .text(d => `${d.data.label}\n${d.data.value}%`)
}

// 創建散點圖
const createScatterChart = () => {
  if (!scatterChartRef.value) return

  const container = d3.select(scatterChartRef.value)
  container.selectAll('*').remove()

  const margin = { top: 20, right: 30, bottom: 40, left: 50 }
  const width = scatterChartRef.value.clientWidth - margin.left - margin.right
  const height = 256 - margin.top - margin.bottom

  const svg = container
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)

  // 比例尺
  const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width])

  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])

  // 添加軸
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale))

  g.append('g')
    .call(d3.axisLeft(yScale))

  // 添加散點
  g.selectAll('.dot')
    .data(scatterData)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .attr('r', d => d.size)
    .attr('fill', '#8b5cf6')
    .attr('opacity', 0.6)
}

// 創建甜甜圈圖
const createDonutChart = () => {
  if (!donutChartRef.value) return

  const container = d3.select(donutChartRef.value)
  container.selectAll('*').remove()

  const width = donutChartRef.value.clientWidth
  const height = 256
  const radius = Math.min(width, height) / 2 - 20

  const svg = container
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const g = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)

  const color = d3.scaleOrdinal(['#ef4444', '#f97316', '#eab308'])

  const pie = d3.pie<{ label: string; value: number }>()
    .value(d => d.value)

  const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
    .innerRadius(radius * 0.5)
    .outerRadius(radius)

  const arcs = g.selectAll('.arc')
    .data(pie(donutData))
    .enter().append('g')
    .attr('class', 'arc')

  arcs.append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(i.toString()))

  // 添加標籤
  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px')
    .attr('fill', 'white')
    .text(d => `${d.data.value}%`)

  // 中心文字
  g.append('text')
    .attr('text-anchor', 'middle')
    .attr('font-size', '16px')
    .attr('font-weight', 'bold')
    .attr('fill', '#374151')
    .text('設備')
}

onMounted(() => {
  // 需要先安裝 D3.js: npm install d3 @types/d3
  createLineChart()
  createBarChart()
  createPieChart()
  createScatterChart()
  createDonutChart()

  // 響應式調整
  window.addEventListener('resize', () => {
    createLineChart()
    createBarChart()
    createPieChart()
    createScatterChart()
    createDonutChart()
  })
})
</script>

