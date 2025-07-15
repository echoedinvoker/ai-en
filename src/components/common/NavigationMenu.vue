<template>
  <nav class="space-y-2">
    <!-- 遍歷大項目 -->
    <div v-for="item in menuItems" :key="item.key" class="space-y-1">
      <!-- 大項目標題 -->
      <button @click="toggleExpanded(item.key)"
        class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium
        text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors cursor-pointer"
        :class="{ 'bg-gray-800 text-white': expandedItems.has(item.key) }">
        <span>{{ item.label }}</span>
        <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-90': expandedItems.has(item.key) }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- 小項目列表 -->
      <div v-show="expandedItems.has(item.key)" class="ml-4 space-y-1">
        <button v-for="child in item.children" :key="child.key"
          @click="selectChild(item.key, child.key)"
          class="w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-blue-300 rounded-md transition-colors cursor-pointer"
          :class="{
            'bg-blue-900 text-blue-300 font-medium':
              activeParentKey === item.key && activeChildKey === child.key,
          }">
          {{ child.label }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useMenu } from '@/composables/useMenu';

const { menuItems, expandedItems, activeParentKey, selectChild, activeChildKey, toggleExpanded } = useMenu();
</script>

