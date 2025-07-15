<template>
  <!-- 側邊欄 -->
  <aside class="w-64 bg-white border-r border-gray-200 transition-all duration-300">
    <div class="p-4">
      <nav class="space-y-2">
        <!-- 遍歷大項目 -->
        <div v-for="item in menuItems" :key="item.key" class="space-y-1">
          <!-- 大項目標題 -->
          <button @click="toggleExpanded(item.key)"
            class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium
            text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            :class="{ 'bg-gray-100': expandedItems.has(item.key) }">
            <span>{{ item.label }}</span>
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-90': expandedItems.has(item.key) }" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- 小項目列表 -->
          <div v-show="expandedItems.has(item.key)" class="ml-4 space-y-1">
            <button v-for="child in item.children" :key="child.key" @click="selectChild(item.key, child.key)"
              class="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors cursor-pointer"
              :class="{
                'bg-blue-100 text-blue-700 font-medium':
                  activeParentKey === item.key && activeChildKey === child.key,
              }">
              {{ child.label }}
            </button>
          </div>
        </div>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useMenu } from '@/composables/useMenu';

const { menuItems, expandedItems, activeParentKey, selectChild, activeChildKey, toggleExpanded } = useMenu();
</script>
