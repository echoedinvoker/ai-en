<template>
  <div class="p-6 space-y-6">
    <!-- 標題 -->
    <div class="flex items-center justify-end">
      <button @click="goBack" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 cursor-pointer">
        <ArrowLeft :size="20" />
        返回列表
      </button>
    </div>

    <!-- 錯誤狀態 -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-800">載入失敗: {{ error.message }}</p>
      <button @click="handleRefetch" class="mt-2 text-red-600 hover:text-red-800 underline">
        重新載入
      </button>
    </div>

    <!-- 載入狀態 -->
    <div v-else-if="loading" class="text-center py-8">
      載入中...
    </div>

    <!-- 權限群組表單 -->
    <div v-else-if="permissionData" class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-[2fr_2fr_1fr] gap-6">
        <!-- 第一行: 權限群組名稱 -->
        <FormInput
          :modelValue="permissionData.role"
          type="text"
          label="權限群組名稱"
          @update:modelValue="updateField('role', $event)"
        />
        <div></div>
        <div></div>

        <!-- 第二行: 建立時間, 建立人員 -->
        <FormInput
          :modelValue="permissionData.createdAt"
          type="datetime-local"
          label="建立時間"
          disabled
          @update:modelValue="updateField('createdAt', $event)"
        />
        <FormInput
          :modelValue="permissionData.createdBy"
          type="text"
          label="建立人員"
          disabled
          @update:modelValue="updateField('createdBy', $event)"
        />
        <div></div>

        <!-- 第三行: 最近修改時間, 最近修改人員, LOG(button) -->
        <FormInput
          :modelValue="permissionData.updatedAt"
          type="datetime-local"
          label="最近修改時間"
          disabled
          @update:modelValue="updateField('updatedAt', $event)"
        />
        <FormInput
          :modelValue="permissionData.updatedBy"
          type="text"
          label="最近修改人員"
          disabled
          @update:modelValue="updateField('updatedBy', $event)"
        />
        <div class="flex items-end">
          <button
            @click="viewLogs"
            class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 whitespace-nowrap cursor-pointer -ml-2"
          >
            LOG
          </button>
        </div>

        <!-- 第四行: 帳號狀態(select) -->
        <FormInput
          :modelValue="permissionData.status"
          type="select"
          label="帳號狀態"
          :options="statusOptions"
          @update:modelValue="updateField('status', $event)"
        />
        <div></div>
        <div></div>
      </div>

      <!-- 權限設定區域 - 使用新的樹狀結構組件 -->
      <PermissionTreeSettings />

      <!-- 操作按鈕 -->
      <div class="mt-8 flex justify-end gap-4">
        <button
          @click="handleCancel"
          class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
        >
          取消
        </button>
        <button
          @click="handleSave"
          :disabled="!canSave || saving"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {{ saving ? '儲存中...' : '儲存' }}
        </button>
      </div>
    </div>

    <!-- 無資料狀態 -->
    <div v-else class="bg-white rounded-lg shadow p-6">
      <div class="text-gray-500">無權限群組資料</div>
    </div>

    <!-- 儲存錯誤提示 -->
    <div v-if="saveError" class="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
      <p class="text-red-800">儲存失敗: {{ saveError.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import FormInput from '@/components/common/FormInput.vue'
import PermissionTreeSettings from './components/PermissionTreeSettings.vue'
import { usePermission } from './composables/usePermission'

// 使用 composable
const {
  permissionData,
  loading,
  error,
  saveError,
  saving,
  statusOptions,
  canSave,
  updateField,
  updatePermissionContent,
  handleSave,
  handleCancel,
  goBack,
  refetch
} = usePermission()

// 提供權限資料和更新函數給子組件
provide('permissionData', permissionData)
provide('updatePermissionContent', updatePermissionContent)

// 重新載入資料
const handleRefetch = () => {
  refetch()
}

// 查看 LOG (可根據需求實作)
const viewLogs = () => {
  console.log('查看 LOG')
  // TODO: 實作查看 LOG 功能
}
</script>

