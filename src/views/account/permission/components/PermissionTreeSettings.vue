<template>
  <div class="mt-8">
    <h3 class="text-lg font-medium text-gray-900 mb-6">權限設定</h3>

    <!-- 加入載入狀態檢查 -->
    <div v-if="!permissionData" class="text-center py-8">
      <div class="text-gray-500">載入中...</div>
    </div>

    <div v-else class="grid grid-cols-4 gap-6">
      <!-- 會員帳號管理 -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="text-md font-medium text-gray-800 mb-4 text-center border-b border-gray-300 pb-2">
          會員帳號管理
        </h4>
        <div class="space-y-2">
          <!-- 教師會員 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('memberManagement.teacherMember')"
              @change="toggleAllChildren('memberManagement.teacherMember', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">教師會員</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.memberManagement.teacherMember.view ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.teacherMember.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.memberManagement.teacherMember.add ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.teacherMember.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.memberManagement.teacherMember.edit ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.teacherMember.edit', value)"
                />
                <PermissionCheckbox
                  label="└─ 刪除"
                  :checked="permissionData.content.memberManagement.teacherMember.delete ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.teacherMember.delete', value)"
                />
              </div>
            </div>
          </div>

          <!-- 學生會員 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('memberManagement.studentMember')"
              @change="toggleAllChildren('memberManagement.studentMember', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">學生會員</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.memberManagement.studentMember.view ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.studentMember.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.memberManagement.studentMember.add ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.studentMember.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.memberManagement.studentMember.edit ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.studentMember.edit', value)"
                />
                <PermissionCheckbox
                  label="└─ 刪除"
                  :checked="permissionData.content.memberManagement.studentMember.delete ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.studentMember.delete', value)"
                />
              </div>
            </div>
          </div>

          <!-- 管理人員 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('memberManagement.adminMember')"
              @change="toggleAllChildren('memberManagement.adminMember', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">管理人員</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.memberManagement.adminMember.view ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.adminMember.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.memberManagement.adminMember.add ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.adminMember.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.memberManagement.adminMember.edit ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.adminMember.edit', value)"
                />
                <PermissionCheckbox
                  label="└─ 刪除"
                  :checked="permissionData.content.memberManagement.adminMember.delete ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.adminMember.delete', value)"
                />
              </div>
            </div>
          </div>

          <!-- 群組權限 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('memberManagement.groupInfo')"
              @change="toggleAllChildren('memberManagement.groupInfo', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">群組權限</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.memberManagement.groupInfo.view ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.groupInfo.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.memberManagement.groupInfo.add ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.groupInfo.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.memberManagement.groupInfo.edit ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.groupInfo.edit', value)"
                />
                <PermissionCheckbox
                  label="└─ 刪除"
                  :checked="permissionData.content.memberManagement.groupInfo.delete ?? false"
                  @update="(value: boolean) => updatePermission('memberManagement.groupInfo.delete', value)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 資料管理 -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="text-md font-medium text-gray-800 mb-4 text-center border-b border-gray-300 pb-2">
          資料管理
        </h4>
        <div class="space-y-2">
          <!-- 題庫管理 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('dataManagement.questionBank')"
              @change="toggleAllChildren('dataManagement.questionBank', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">題庫管理</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.dataManagement.questionBank.view ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.questionBank.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.dataManagement.questionBank.add ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.questionBank.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.dataManagement.questionBank.edit ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.questionBank.edit', value)"
                />
                <PermissionCheckbox
                  label="├─ 刪除"
                  :checked="permissionData.content.dataManagement.questionBank.delete ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.questionBank.delete', value)"
                />
                <PermissionCheckbox
                  label="├─ 內容"
                  :checked="permissionData.content.dataManagement.questionBank.content ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.questionBank.content', value)"
                />
                <PermissionCheckbox
                  label="└─ 匯入"
                  :checked="permissionData.content.dataManagement.questionBank.import ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.questionBank.import', value)"
                />
              </div>
            </div>
          </div>

          <!-- 班級管理 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('dataManagement.nearbyManagement')"
              @change="toggleAllChildren('dataManagement.nearbyManagement', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">班級管理</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.dataManagement.nearbyManagement.view ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.nearbyManagement.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.dataManagement.nearbyManagement.add ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.nearbyManagement.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.dataManagement.nearbyManagement.edit ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.nearbyManagement.edit', value)"
                />
                <PermissionCheckbox
                  label="├─ 刪除"
                  :checked="permissionData.content.dataManagement.nearbyManagement.delete ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.nearbyManagement.delete', value)"
                />
                <PermissionCheckbox
                  label="└─ 內容"
                  :checked="permissionData.content.dataManagement.nearbyManagement.content ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.nearbyManagement.content', value)"
                />
              </div>
            </div>
          </div>

          <!-- 試題管理 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('dataManagement.examManagement')"
              @change="toggleAllChildren('dataManagement.examManagement', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">試題管理</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.dataManagement.examManagement.view ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.examManagement.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.dataManagement.examManagement.add ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.examManagement.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.dataManagement.examManagement.edit ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.examManagement.edit', value)"
                />
                <PermissionCheckbox
                  label="├─ 刪除"
                  :checked="permissionData.content.dataManagement.examManagement.delete ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.examManagement.delete', value)"
                />
                <PermissionCheckbox
                  label="└─ 內容"
                  :checked="permissionData.content.dataManagement.examManagement.content ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.examManagement.content', value)"
                />
              </div>
            </div>
          </div>

          <!-- 作文管理 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('dataManagement.documentManagement')"
              @change="toggleAllChildren('dataManagement.documentManagement', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">作文管理</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.dataManagement.documentManagement.view ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.documentManagement.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.dataManagement.documentManagement.add ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.documentManagement.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.dataManagement.documentManagement.edit ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.documentManagement.edit', value)"
                />
                <PermissionCheckbox
                  label="├─ 刪除"
                  :checked="permissionData.content.dataManagement.documentManagement.delete ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.documentManagement.delete', value)"
                />
                <PermissionCheckbox
                  label="└─ 內容"
                  :checked="permissionData.content.dataManagement.documentManagement.content ?? false"
                  @update="(value: boolean) => updatePermission('dataManagement.documentManagement.content', value)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 後台設定 -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="text-md font-medium text-gray-800 mb-4 text-center border-b border-gray-300 pb-2">
          後台設定
        </h4>
        <div class="space-y-2">
          <!-- 推薦系統 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('backendSettings.recommendationSystem')"
              @change="toggleAllChildren('backendSettings.recommendationSystem', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">推薦系統</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.backendSettings.recommendationSystem.view ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.recommendationSystem.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.backendSettings.recommendationSystem.add ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.recommendationSystem.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.backendSettings.recommendationSystem.edit ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.recommendationSystem.edit', value)"
                />
                <PermissionCheckbox
                  label="├─ 刪除"
                  :checked="permissionData.content.backendSettings.recommendationSystem.delete ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.recommendationSystem.delete', value)"
                />
                <PermissionCheckbox
                  label="└─ 內容"
                  :checked="permissionData.content.backendSettings.recommendationSystem.content ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.recommendationSystem.content', value)"
                />
              </div>
            </div>
          </div>

          <!-- 系統公告 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('backendSettings.systemAnnouncement')"
              @change="toggleAllChildren('backendSettings.systemAnnouncement', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">系統公告</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.backendSettings.systemAnnouncement.view ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.systemAnnouncement.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.backendSettings.systemAnnouncement.add ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.systemAnnouncement.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.backendSettings.systemAnnouncement.edit ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.systemAnnouncement.edit', value)"
                />
                <PermissionCheckbox
                  label="├─ 刪除"
                  :checked="permissionData.content.backendSettings.systemAnnouncement.delete ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.systemAnnouncement.delete', value)"
                />
                <PermissionCheckbox
                  label="└─ 內容"
                  :checked="permissionData.content.backendSettings.systemAnnouncement.content ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.systemAnnouncement.content', value)"
                />
              </div>
            </div>
          </div>

          <!-- 訂閱設定 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="isAllChildrenChecked('backendSettings.subscriptionSettings')"
              @change="toggleAllChildren('backendSettings.subscriptionSettings', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">訂閱設定</div>
              <div class="ml-4 space-y-1">
                <PermissionCheckbox
                  label="├─ 查詢"
                  :checked="permissionData.content.backendSettings.subscriptionSettings.view ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.subscriptionSettings.view', value)"
                />
                <PermissionCheckbox
                  label="├─ 新增"
                  :checked="permissionData.content.backendSettings.subscriptionSettings.add ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.subscriptionSettings.add', value)"
                />
                <PermissionCheckbox
                  label="├─ 編輯"
                  :checked="permissionData.content.backendSettings.subscriptionSettings.edit ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.subscriptionSettings.edit', value)"
                />
                <PermissionCheckbox
                  label="├─ 刪除"
                  :checked="permissionData.content.backendSettings.subscriptionSettings.delete ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.subscriptionSettings.delete', value)"
                />
                <PermissionCheckbox
                  label="└─ 內容"
                  :checked="permissionData.content.backendSettings.subscriptionSettings.content ?? false"
                  @update="(value: boolean) => updatePermission('backendSettings.subscriptionSettings.content', value)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 平台數據 -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="text-md font-medium text-gray-800 mb-4 text-center border-b border-gray-300 pb-2">
          平台數據
        </h4>
        <div class="space-y-2">
          <!-- 數據模板 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="permissionData.content.platformData.dataTemplate ?? false"
              @change="updatePermission('platformData.dataTemplate', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">數據模板</div>
            </div>
          </div>

          <!-- 功能頁面設定 -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              :checked="permissionData.content.platformData.functionPageSettings ?? false"
              @change="updatePermission('platformData.functionPageSettings', ($event.target as HTMLInputElement).checked)"
              class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-700">功能頁面設定</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PermissionCheckbox from './PermissionCheckbox.vue'
import { usePermission } from '../composables/usePermission'

// 使用 usePermission composable 獲取權限資料和更新方法
const { permissionData, updatePermissionContent } = usePermission()

// 更新權限的方法，將路徑和值傳遞給 composable
const updatePermission = (path: string, value: boolean) => {
  updatePermissionContent(path, value)
}

// 檢查某個路徑下的所有子權限是否都被選中
const isAllChildrenChecked = (basePath: string): boolean => {
  if (!permissionData.value) return false

  // 根據路徑獲取對應的權限物件
  const pathParts = basePath.split('.')
  let current = permissionData.value.content

  for (const part of pathParts) {
    current = current[part]
    if (!current) return false
  }

  // 檢查所有子權限是否都為 true
  const permissions = ['view', 'add', 'edit', 'delete', 'content', 'import']
  const existingPermissions = permissions.filter(perm => perm in current)

  return existingPermissions.length > 0 && existingPermissions.every(perm => current[perm] === true)
}

// 切換某個路徑下的所有子權限
const toggleAllChildren = (basePath: string, checked: boolean) => {
  if (!permissionData.value) return

  // 根據路徑獲取對應的權限物件
  const pathParts = basePath.split('.')
  let current = permissionData.value.content

  for (const part of pathParts) {
    current = current[part]
    if (!current) return
  }

  // 更新所有存在的子權限
  const permissions = ['view', 'add', 'edit', 'delete', 'content', 'import']
  permissions.forEach(perm => {
    if (perm in current) {
      updatePermission(`${basePath}.${perm}`, checked)
    }
  })
}
</script>
