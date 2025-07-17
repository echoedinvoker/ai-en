<template>
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('update', ($event.target as HTMLInputElement)?.checked)"
      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span class="text-xs text-gray-600 font-mono">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  checked: boolean
}

defineProps<Props>()
defineEmits<{
  update: [value: boolean]
}>()
</script>

