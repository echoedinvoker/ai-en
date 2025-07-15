<template>
  <div>
    <!-- Label -->
    <label v-if="label" :for="selectId" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Select -->
    <select
      :id="selectId"
      :value="modelValue"
      :disabled="disabled"
      :class="inputClasses"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <!-- Placeholder Option -->
      <option
        v-if="placeholder"
        value=""
        disabled
        :selected="!modelValue"
      >
        {{ placeholder }}
      </option>

      <!-- Options -->
      <option
        v-for="option in options"
        :key="getOptionValue(option)"
        :value="getOptionValue(option)"
        :disabled="getOptionDisabled(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>

    <!-- Error Message -->
    <p v-if="error" :class="errorClasses">{{ error }}</p>

    <!-- Helper Text -->
    <p v-if="helperText && !error" class="mt-1 text-sm text-gray-500">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormStyles } from '@/composables/useFormStyles'

// 選項類型定義
interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  label?: string
  placeholder?: string
  options: Option[] | string[] | number[]
  disabled?: boolean
  required?: boolean
  error?: string
  helperText?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  options: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number, option?: Option]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

// 生成唯一的 select ID
const selectId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

const { inputClasses, labelClasses, errorClasses } = useFormStyles(props)

// 獲取選項值
const getOptionValue = (option: Option | string | number): string | number => {
  if (typeof option === 'object') {
    return option.value
  }
  return option
}

// 獲取選項標籤
const getOptionLabel = (option: Option | string | number): string => {
  if (typeof option === 'object') {
    return option.label
  }
  return String(option)
}

// 獲取選項是否禁用
const getOptionDisabled = (option: Option | string | number): boolean => {
  if (typeof option === 'object') {
    return option.disabled || false
  }
  return false
}

// 處理選擇變更
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value

  // 轉換為適當的類型
  const convertedValue = isNaN(Number(value)) ? value : Number(value)

  // 找到對應的選項
  const selectedOption = props.options.find(option =>
    getOptionValue(option) === convertedValue
  )

  emit('update:modelValue', convertedValue)
  emit('change', convertedValue, typeof selectedOption === 'object' ? selectedOption : undefined)
}

// 處理失焦事件
const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// 處理聚焦事件
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>

