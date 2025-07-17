<template>
  <!-- Breadcrumb -->
  <div class="bg-white border-b border-gray-200 px-6 py-4">
    <nav class="flex items-center space-x-2 text-sm text-gray-500">
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <!-- 不是最後一項時顯示為可點擊連結 -->
        <router-link
          v-if="index < breadcrumbItems.length - 1 && item.route"
          :to="item.route"
          class="font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          {{ item.label }}
        </router-link>
        <!-- 沒有路由的項目顯示為普通文字 -->
        <span
          v-else-if="index < breadcrumbItems.length - 1"
          class="font-medium text-gray-700"
        >
          {{ item.label }}
        </span>
        <!-- 最後一項顯示為當前頁面 -->
        <span
          v-else
          class="font-medium text-gray-900"
        >
          {{ item.label }}
        </span>

        <!-- 分隔符號（不在最後一項顯示） -->
        <svg
          v-if="index < breadcrumbItems.length - 1"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </template>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from '@/composables/useMenu';

const { breadcrumbItems } = useMenu();
</script>

