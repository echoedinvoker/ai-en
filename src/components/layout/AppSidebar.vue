<template>
  <!-- 側邊欄 -->
  <aside class="w-64 bg-gray-900 transition-all duration-300 flex flex-col h-full">
    <!-- 固定的 Logo 區域 -->
    <div class="p-4 flex-shrink-0">
      <img src="@/assets/logo.svg" alt="Logo" class="h-8 w-auto" />
    </div>

    <!-- 可滾動的導航選單區域 -->
    <div class="flex-1 overflow-y-auto p-4">
      <NavigationMenu />
    </div>

  </aside>
</template>

<script setup lang="ts">
import NavigationMenu from '@/components/common/NavigationMenu.vue';
</script>

