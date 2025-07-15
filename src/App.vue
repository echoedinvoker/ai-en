<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppMain from '@/components/layout/AppMain.vue';
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <!-- 主要內容區域 -->
    <div class="flex-1 flex overflow-hidden">

      <AppSidebar />
      <AppMain />

    </div>
  </div>
</template>
