<template>
  <div class="mt-8">
    <!-- 載入狀態檢查 -->
    <div v-if="!permissionData" class="text-center py-8">
      <div class="text-gray-500">載入中...</div>
    </div>

    <PermissionTree
      v-else
      :permission-data="permissionData"
      :permission-tree-config="permissionTreeConfig"
      :permission-labels="permissionLabels"
      @update-permission="updatePermissionContent"
      @toggle-all-children="toggleAllChildren"
      @toggle-all-section="toggleAllSection"
    />
  </div>
</template>

<script setup lang="ts">
import PermissionTree from '@/components/common/PermissionTree.vue'
import { usePermission } from '../composables/usePermission'

// 使用 usePermission composable
const {
  permissionData,
  permissionTreeConfig,
  permissionLabels,
  updatePermissionContent,
  toggleAllChildren,
  toggleAllSection
} = usePermission()
</script>

