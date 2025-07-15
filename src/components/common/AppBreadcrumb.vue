<template>
  <!-- Breadcrumb -->
  <div class="bg-white border-b border-gray-200 px-6 py-4">
    <nav class="flex items-center space-x-2 text-sm text-gray-500">
      <span class="font-medium text-gray-700">{{ currentBreadcrumb.parent }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="font-medium text-gray-900">{{ currentBreadcrumb.child }}</span>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from '@/composables/useMenu';

const { currentBreadcrumb } = useMenu();
</script>
