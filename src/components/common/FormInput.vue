<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- 文字輸入框 -->
    <input
      v-if="type !== 'select'"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="handleInput"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />

    <!-- 下拉選單 -->
    <select
      v-else
      :value="modelValue"
      :disabled="disabled"
      :class="inputClasses"
      @change="handleInput"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- 錯誤訊息 -->
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue?: string | number
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  options?: Option[] // 用於 select 類型
  height?: string // 自定義高度
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur'): void
  (e: 'focus'): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  height: 'h-10'
})

const emit = defineEmits<Emits>()

// 動態計算 input 樣式類別
const inputClasses = computed(() => {
  const baseClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${props.height}`

  if (props.disabled) {
    return `${baseClasses} border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed`
  }

  if (props.error) {
    return `${baseClasses} border-red-300 focus:ring-red-500 focus:border-red-500`
  }

  return `${baseClasses} border-gray-300 focus:ring-blue-500 focus:border-blue-500`
})

// 處理輸入事件
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}
</script>

