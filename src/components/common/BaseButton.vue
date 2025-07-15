<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'gray' | 'slate' | 'cancel'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  text?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button',
  text: '',
  loading: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()

// 基礎樣式
const baseClasses = 'rounded-md focus:outline-none transition-all duration-200 whitespace-nowrap cursor-pointer'

// 尺寸樣式
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-2'
  }
  return sizes[props.size]
})

// 變體樣式
const variantClasses = computed(() => {
  if (props.disabled) {
    return 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300'
  }

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white border border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50',
    gray: 'bg-gray-600 text-white border border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50',
    slate: 'bg-slate-600 text-white border border-slate-600 hover:bg-slate-700 hover:border-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50',
    cancel: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-gray-500'
  }
  return variants[props.variant]
})

// 組合所有樣式
const buttonClasses = computed(() => {
  return [
    baseClasses,
    sizeClasses.value,
    variantClasses.value
  ].join(' ')
})
</script>

