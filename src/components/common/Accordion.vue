<template>
  <div class="border border-gray-200 rounded-lg">
    <!-- Accordion Header -->
    <button
      @click="toggle"
      class="w-full p-4 text-left flex gap-4 items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <!-- Header Content Slot -->
      <div class="flex-1">
        <slot name="header" :is-open="isOpen" />
      </div>

      <!-- Toggle Icon -->
      <svg
        :class="{ 'rotate-180': isOpen }"
        class="w-5 h-5 text-gray-500 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Accordion Content with Transition -->
    <transition
      name="accordion"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="isOpen"
        class="accordion-content border-t border-gray-200"
      >
        <div class="px-4 pb-4">
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  modelValue?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  defaultOpen: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'toggle': [isOpen: boolean]
}>()

const internalOpen = ref(props.defaultOpen)

const isOpen = computed(() => {
  return props.modelValue !== undefined ? props.modelValue : internalOpen.value
})

const toggle = () => {
  const newValue = !isOpen.value

  if (props.modelValue !== undefined) {
    emit('update:modelValue', newValue)
  } else {
    internalOpen.value = newValue
  }

  emit('toggle', newValue)
}

watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    internalOpen.value = newValue
  }
})

// 修正的 Transition 動畫處理函數
const onEnter = (el: Element) => {
  const element = el as HTMLElement
  // 設置初始狀態
  element.style.height = '0'
  element.style.overflow = 'hidden'

  // 使用 requestAnimationFrame 確保瀏覽器完成初始渲染
  requestAnimationFrame(() => {
    element.style.height = element.scrollHeight + 'px'
  })
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.overflow = 'visible'
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  // 先設置當前高度
  element.style.height = element.scrollHeight + 'px'
  element.style.overflow = 'hidden'

  // 使用 requestAnimationFrame 確保瀏覽器完成渲染
  requestAnimationFrame(() => {
    element.style.height = '0'
  })
}

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = ''
  element.style.overflow = ''
}
</script>

<style scoped>
/* 關鍵：確保 transition 應用到正確的元素 */
.accordion-content {
  transition: height 0.3s ease-in-out;
  overflow: hidden; /* 防止內容溢出 */
}
</style>

