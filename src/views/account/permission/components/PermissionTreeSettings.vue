<template>
  <div class="mt-8">
    <h3 class="text-lg font-medium text-gray-900 mb-6">權限設定</h3>

    <!-- 載入狀態檢查 -->
    <div v-if="!permissionData" class="text-center py-8">
      <div class="text-gray-500">載入中...</div>
    </div>

    <div v-else class="grid grid-cols-4 gap-6">
      <!-- 動態生成權限區塊 -->
      <div
        v-for="section in permissionTreeConfig"
        :key="section.key"
        class="bg-gray-50 rounded-lg p-4"
      >
        <!-- 區塊標題 -->
        <div class="flex items-center gap-2 mb-4 text-center border-b border-gray-300 pb-2">
          <input
            type="checkbox"
            :checked="isAllSectionChecked(section.key)"
            @change="toggleAllSection(section.key, ($event.target as HTMLInputElement).checked)"
            class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <h4 class="text-md font-medium text-gray-800 flex-1">
            {{ section.title }}
          </h4>
        </div>

        <div class="space-y-2">
          <!-- 動態生成權限項目 -->
          <div
            v-for="item in section.items"
            :key="item.key"
            class="flex items-start gap-2"
          >
            <!-- 有子權限的項目 -->
            <template v-if="item.permissions.length > 0">
              <input
                type="checkbox"
                :checked="isAllChildrenChecked(`${section.key}.${item.key}`)"
                @change="toggleAllChildren(`${section.key}.${item.key}`, ($event.target as HTMLInputElement).checked)"
                class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-700">{{ item.label }}</div>
                <div class="ml-4 space-y-1">
                  <PermissionCheckbox
                    v-for="(permission, index) in item.permissions"
                    :key="permission"
                    :label="getPermissionLabel(permission, index, item.permissions.length)"
                    :checked="permissionData.content[section.key][item.key][permission] ?? false"
                    @update="(value: boolean) => updatePermissionContent(`${section.key}.${item.key}.${permission}`, value)"
                  />
                </div>
              </div>
            </template>

            <!-- 單一權限項目 -->
            <template v-else>
              <input
                type="checkbox"
                :checked="permissionData.content[section.key][item.key] ?? false"
                @change="updatePermissionContent(`${section.key}.${item.key}`, ($event.target as HTMLInputElement).checked)"
                class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-700">{{ item.label }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PermissionCheckbox from './PermissionCheckbox.vue'
import { usePermission } from '../composables/usePermission'

// 使用 usePermission composable
const {
  permissionData,
  permissionTreeConfig,
  permissionLabels,
  updatePermissionContent,
  isAllChildrenChecked,
  toggleAllChildren,
  isAllSectionChecked,
  toggleAllSection
} = usePermission()

// 生成權限標籤（包含樹狀結構符號）
const getPermissionLabel = (permission: string, index: number, total: number): string => {
  const label = permissionLabels[permission] || permission
  const isLast = index === total - 1
  const prefix = isLast ? '└─' : '├─'
  return `${prefix} ${label}`
}
</script>

