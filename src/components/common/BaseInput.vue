<template>
  <div>
    <!-- Label -->
    <label v-if="label" :for="inputId" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Input -->
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :max="max"
      :min="min"
      :step="step"
      :class="inputClasses"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown="$emit('keydown', $event)"
      @keyup="$emit('keyup', $event)"
    />

    <!-- Error Message -->
    <p v-if="error" :class="errorClasses">{{ error }}</p>

    <!-- Helper Text -->
    <p v-if="helperText && !error" :class="helperTextClasses">
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormStyles } from '@/composables/useFormStyles'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' |
  'datetime-local' | 'month' | 'week' | 'color' | 'file'
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  helperText?: string
  maxlength?: number
  minlength?: number
  max?: number | string
  min?: number | string
  step?: number | string
  height?: string
  dense?: boolean // 新增 dense 屬性
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  dense: false // 預設為 false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

// 生成唯一的 input ID
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const { inputClasses, labelClasses, errorClasses, helperTextClasses } = useFormStyles(props)

// 處理輸入事件
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
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

