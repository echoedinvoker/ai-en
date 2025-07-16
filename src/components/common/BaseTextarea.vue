<template>
  <div>
    <!-- Label -->
    <label v-if="label" :for="textareaId" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Textarea -->
    <textarea
      :id="textareaId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      :cols="cols"
      :class="textareaClasses"
      :style="{ height: height, resize: resize }"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown="$emit('keydown', $event)"
      @keyup="$emit('keyup', $event)"
    />

    <!-- Character Count -->
    <div v-if="showCharCount && maxlength" class="mt-1 text-right text-sm text-gray-500">
      {{ characterCount }}/{{ maxlength }}
    </div>

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

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  helperText?: string
  maxlength?: number
  minlength?: number
  rows?: number
  cols?: number
  height?: string
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  showCharCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
  required: false,
  rows: 3,
  resize: 'vertical',
  showCharCount: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

// 生成唯一的 textarea ID
const textareaId = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`)

// 字符計數
const characterCount = computed(() => (props.modelValue || '').length)

// 使用表單樣式 composable - 與 BaseInput 完全相同
const { inputClasses, labelClasses, errorClasses } = useFormStyles(props)

// 直接使用 inputClasses，確保與 BaseInput 樣式完全一致
const textareaClasses = computed(() => inputClasses.value)

// 處理輸入事件
const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
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

