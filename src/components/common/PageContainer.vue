<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  padding?: string
  spacing?: string
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'p-6',
  spacing: 'space-y-6'
})

// 組合樣式類別
const containerClasses = computed(() => [
  props.padding,
  props.spacing
])
</script>
