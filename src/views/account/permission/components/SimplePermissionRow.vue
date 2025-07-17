<template>
  <div class="flex items-center justify-between py-2 border-b border-gray-100">
    <span class="text-sm font-medium text-gray-700 w-32">{{ title }}</span>
    <div class="flex items-center">
      <label class="flex items-center gap-2">
        <input
          type="checkbox"
          :checked="value"
          @change="$emit('update', ($event.target as HTMLInputElement)?.checked)"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="text-sm text-gray-600">啟用</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  value: boolean
}

defineProps<Props>()
defineEmits<{
  update: [value: boolean]
}>()
</script>

