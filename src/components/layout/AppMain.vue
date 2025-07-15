<template>
  <main class="flex-1 overflow-auto">
    <div class="h-full flex flex-col">
      <AppBreadcrumb />
      <RouterView />
    </div>
  </main>
</template>

<script setup lang="ts">
import AppBreadcrumb from '@/components/common/AppBreadcrumb.vue';
</script>

