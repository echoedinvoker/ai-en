<template>
  <div v-if="teacherData" class="bg-white rounded-lg shadow p-6">
    <div class="grid grid-cols-[2fr_2fr_1fr] gap-6">
      <!-- 第一行 -->
      <FormInput
        :value="teacherData.email"
        type="email"
        label="教師 Email"
        disabled
        @update:modelValue="updateField('email', $event)"
      />
      <FormInput
        :value="teacherData.name"
        type="text"
        label="教師姓名"
        @update:modelValue="updateField('name', $event)"
      />
      <div></div>

      <!-- 第二行 -->
      <FormInput
        :value="teacherData.subscriptionStartDate"
        type="date"
        label="本次訂閱開始日期"
        disabled
        @update:modelValue="updateField('subscriptionStartDate', $event)"
      />
      <FormInput
        :value="teacherData.subscriptionEndDate"
        type="date"
        label="本次訂閱結束日期"
        disabled
        @update:modelValue="updateField('subscriptionEndDate', $event)"
      />
      <div class="flex items-end">
        <button
          @click="$emit('subscription-history')"
          class="px-4 py-2 bg-gray-600 text-white border border-gray-600 rounded-md hover:bg-gray-700 hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-200 whitespace-nowrap cursor-pointer -ml-2"
        >
          訂閱紀錄
        </button>
      </div>

      <!-- 第三行 -->
      <FormInput
        :value="teacherData.subscriptionAmount"
        type="number"
        label="本次訂閱付費金額"
        disabled
        @update:modelValue="updateField('subscriptionAmount', $event)"
      />
      <FormInput
        :value="teacherData.manualEndDate"
        type="date"
        label="人為訂閱結束日期"
        @update:modelValue="updateField('manualEndDate', $event)"
      />
      <div></div>

      <!-- 第四行 -->
      <FormInput
        :value="teacherData.refundStatus"
        type="text"
        label="本次訂閱退費情形"
        disabled
        @update:modelValue="updateField('refundStatus', $event)"
      />
      <div></div>
      <div></div>

      <!-- 第五行 -->
      <FormInput
        :value="teacherData.trialEssayCount"
        type="number"
        label="開通試用作文次數"
        @update:modelValue="updateField('trialEssayCount', $event)"
      />
      <FormInput
        :value="teacherData.usedTrialEssayCount"
        type="number"
        label="已使用試用作文次數"
        disabled
        @update:modelValue="updateField('usedTrialEssayCount', $event)"
      />
      <div></div>

      <!-- 第六行 -->
      <FormInput
        :value="teacherData.createdAt"
        type="datetime-local"
        label="建立時間"
        disabled
        @update:modelValue="updateField('createdAt', $event)"
      />
      <FormInput
        :value="teacherData.createdBy"
        type="text"
        label="建立人員"
        disabled
        @update:modelValue="updateField('createdBy', $event)"
      />
      <div></div>

      <!-- 第七行 -->
      <FormInput
        :value="teacherData.updatedAt"
        type="datetime-local"
        label="最近修改時間"
        disabled
        @update:modelValue="updateField('updatedAt', $event)"
      />
      <FormInput
        :value="teacherData.updatedBy"
        type="text"
        label="最近修改人員"
        disabled
        @update:modelValue="updateField('updatedBy', $event)"
      />
      <div class="flex items-end">
        <button
          @click="$emit('view-logs')"
          class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 whitespace-nowrap cursor-pointer -ml-2"
        >
          LOG
        </button>
      </div>

      <!-- 第八行 -->
      <FormInput
        :value="teacherData.status"
        type="select"
        label="帳號狀態"
        :options="statusOptions"
        @update:modelValue="updateField('status', $event)"
      />
      <div></div>
      <div></div>

      <!-- 操作按鈕 -->
      <div class="col-span-2 mt-8 flex justify-end gap-4">
        <button
          @click="$emit('cancel')"
          class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
        >
          取消
        </button>
        <button
          @click="$emit('save')"
          :disabled="!canSave || saving"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {{ saving ? '儲存中...' : '儲存' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from './FormInput.vue'
import { useTeacher } from '@/composables/useTeacher'

// 使用 composable
const {
  teacherData,
  statusOptions,
  canSave,
  saving,
  updateField
} = useTeacher()

// 定義 emits
defineEmits<{
  save: []
  cancel: []
  'subscription-history': []
  'view-logs': []
}>()
</script>
