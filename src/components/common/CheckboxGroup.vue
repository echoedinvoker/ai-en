<template>
  <div class="flex flex-col flex-wrap gap-5" :style="{ height: containerHeight }">
    <div
      v-for="(value, key) in modelValue"
      :key="key"
      class="flex items-center gap-1"
    >
      <input
        type="checkbox"
        :id="String(key)"
        class="w-5 h-5"
        :checked="value"
        @change="updateValue(key, ($event.target as HTMLInputElement).checked)"
      />
      <label :for="String(key)" class="text-sm text-gray-900">
        {{ labelMap?.[key] || key }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  // 資料物件，key 為 checkbox id，value 為 boolean 狀態
  modelValue: Record<string, boolean>
  // 可選的 label 對應表，用於自訂顯示文字
  labelMap?: Record<string, string>
  // 容器高度，預設為 auto
  containerHeight?: string
}

interface Emits {
  (e: 'update:modelValue', value: Record<string, boolean>): void
}

const props = withDefaults(defineProps<Props>(), {
  containerHeight: 'auto'
})

const emit = defineEmits<Emits>()

// 更新單個 checkbox 的值
const updateValue = (key: string, checked: boolean) => {
  const newValue = { ...props.modelValue }
  newValue[key] = checked
  emit('update:modelValue', newValue)
}
</script>

