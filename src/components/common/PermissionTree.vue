<template>
  <div class="grid grid-cols-4 gap-6">
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
                  :checked="getPermissionValue(`${section.key}.${item.key}.${permission}`)"
                  @update="(value: boolean) => updatePermissionValue(`${section.key}.${item.key}.${permission}`, value)"
                />
              </div>
            </div>
          </template>

          <!-- 單一權限項目 -->
          <template v-else>
            <input
              type="checkbox"
              :checked="getPermissionValue(`${section.key}.${item.key}`)"
              @change="updatePermissionValue(`${section.key}.${item.key}`, ($event.target as HTMLInputElement).checked)"
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
</template>

<script setup lang="ts">
import PermissionCheckbox from '@/views/account/permission/components/PermissionCheckbox.vue'

// Props 定義
interface Props {
  permissionData?: any // 權限資料物件
  permissionTreeConfig: Array<{
    key: string
    title: string
    items: Array<{
      key: string
      label: string
      permissions: string[]
    }>
  }>
  permissionLabels: Record<string, string>
}

// Emits 定義
interface Emits {
  (e: 'update-permission', path: string, value: boolean): void
  (e: 'toggle-all-children', basePath: string, checked: boolean): void
  (e: 'toggle-all-section', sectionKey: string, checked: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 生成權限標籤（包含樹狀結構符號）
const getPermissionLabel = (permission: string, index: number, total: number): string => {
  const label = props.permissionLabels[permission] || permission
  const isLast = index === total - 1
  const prefix = isLast ? '└─' : '├─'
  return `${prefix} ${label}`
}

// 獲取權限值的輔助函數
const getPermissionValue = (path: string): boolean => {
  if (!props.permissionData?.content) return false

  const pathParts = path.split('.')
  let current: any = props.permissionData.content

  for (const part of pathParts) {
    current = current[part]
    if (current === undefined) return false
  }

  return current === true
}

// 更新權限值
const updatePermissionValue = (path: string, value: boolean) => {
  emit('update-permission', path, value)
}

// 檢查某個路徑下的所有子權限是否都被選中
const isAllChildrenChecked = (basePath: string): boolean => {
  if (!props.permissionData?.content) return false

  const pathParts = basePath.split('.')
  const [sectionKey, itemKey] = pathParts
  const section = props.permissionTreeConfig.find(s => s.key === sectionKey)
  const item = section?.items.find(i => i.key === itemKey)

  if (!item || item.permissions.length === 0) return false

  return item.permissions.every(perm => getPermissionValue(`${basePath}.${perm}`))
}

// 切換某個路徑下的所有子權限
const toggleAllChildren = (basePath: string, checked: boolean) => {
  emit('toggle-all-children', basePath, checked)
}

// 檢查整個區塊的所有權限是否都被選中
const isAllSectionChecked = (sectionKey: string): boolean => {
  if (!props.permissionData?.content) return false

  const section = props.permissionTreeConfig.find(s => s.key === sectionKey)
  if (!section) return false

  return section.items.every(item => {
    if (item.permissions.length === 0) {
      // 單一權限項目
      return props.permissionData.content[sectionKey][item.key] === true
    } else {
      // 有子權限的項目
      return isAllChildrenChecked(`${sectionKey}.${item.key}`)
    }
  })
}

// 切換整個區塊的所有權限
const toggleAllSection = (sectionKey: string, checked: boolean) => {
  emit('toggle-all-section', sectionKey, checked)
}
</script>

