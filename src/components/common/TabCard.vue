<template>
  <div>
    <!-- Tab 導航區域 - 按鈕型式，與 card 分離 -->
    <div class="mb-2">
      <nav class="flex space-x-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="handleTabClick(tab.key)"
          :class="tabButtonClasses(tab.key)"
          :disabled="tab.disabled"
          type="button"
        >
          <!-- Tab 圖標 -->
          <component
            v-if="tab.icon"
            :is="tab.icon"
            class="w-4 h-4 mr-2"
          />
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Card 容器 - 完整圓角 -->
    <div :class="cardClasses">
      <!-- Tab 內容區域 -->
      <div :class="contentClasses">
        <!-- 具名插槽用於各個 tab 的內容 -->
        <slot
          :name="activeTab"
          :activeTab="activeTab"
        />

        <!-- 預設插槽作為後備內容 -->
        <slot v-if="!hasNamedSlot(activeTab)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

interface Tab {
  key: string
  label: string
  icon?: any
  disabled?: boolean
}

interface Props {
  tabs: Tab[]
  defaultTab?: string
  noPadding?: boolean
  class?: string
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: '',
  noPadding: false,
  class: '',
  shadow: 'md'
})

const emit = defineEmits<{
  tabChange: [tabKey: string]
}>()

const slots = useSlots()
const activeTab = ref(props.defaultTab || props.tabs[0]?.key || '')

const setActiveTab = (tabKey: string) => {
  activeTab.value = tabKey
  emit('tabChange', tabKey)
}

const hasNamedSlot = (slotName: string) => {
  return !!slots[slotName]
}

// Card 樣式：完整圓角，因為與 tab 分離
const cardClasses = computed(() => {
  const baseClasses = 'bg-white rounded-lg border border-gray-200'
  const shadowClass = props.shadow === 'none' ? '' : `shadow${props.shadow === 'md' ? '' : `-${props.shadow}`}`

  return [
    baseClasses,
    shadowClass,
    props.class
  ].filter(Boolean).join(' ')
})

const contentClasses = computed(() => {
  return props.noPadding ? '' : 'p-6'
})

// Tab 按鈕樣式：獨立按鈕型式
const tabButtonClasses = (tabKey: string) => {
  const isActive = activeTab.value === tabKey
  const tab = props.tabs.find(t => t.key === tabKey)

  const baseClasses = `
    flex items-center px-4 py-2 text-sm font-medium
    rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  `

  // 禁用狀態
  if (tab?.disabled) {
    return `${baseClasses}
      bg-gray-100 text-gray-400 cursor-not-allowed
      border border-gray-200
    `
  }

  // 活躍狀態
  if (isActive) {
    return `${baseClasses}
      bg-blue-600 text-white shadow-sm
      hover:bg-blue-700
      border border-blue-600
    `
  }

  // 非活躍狀態
  return `${baseClasses}
    bg-white text-gray-700 border border-gray-300
    hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400
    shadow-sm
  `
}

const handleTabClick = (tabKey: string) => {
  const tab = props.tabs.find(t => t.key === tabKey)
  if (tab && !tab.disabled) {
    setActiveTab(tabKey)
  }
}
</script>

