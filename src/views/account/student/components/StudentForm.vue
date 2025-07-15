<template>
  <div v-if="loading" class="bg-white rounded-lg shadow p-6">
    <div class="text-center">載入中...</div>
  </div>

  <div v-else-if="error" class="bg-white rounded-lg shadow p-6">
    <div class="text-red-500">錯誤: {{ error.message }}</div>
  </div>

  <div v-else-if="studentData" class="bg-white rounded-lg shadow p-6">
    <div class="grid grid-cols-[2fr_2fr_1fr] gap-6">
      <!-- 第一行 -->
      <BaseInput
        :modelValue="studentData.email"
        type="email"
        label="學生 Email"
        disabled
        @update:modelValue="updateField('email', $event)"
      />
      <BaseInput
        :modelValue="studentData.name"
        type="text"
        label="學生姓名"
        @update:modelValue="updateField('name', $event)"
      />
      <div></div>

      <!-- 密碼輸入欄位 (新增在第一行和第二行之間) -->
      <BaseInput
        :modelValue="studentData.password || ''"
        type="password"
        label="密碼"
        @update:modelValue="updateField('password', $event)"
      />
      <div></div>
      <div></div>

      <!-- 第二行 -->
      <BaseInput
        :modelValue="studentData.subscriptionStartDate"
        type="date"
        label="本次訂閱開始日期"
        disabled
        @update:modelValue="updateField('subscriptionStartDate', $event)"
      />
      <BaseInput
        :modelValue="studentData.subscriptionEndDate"
        type="date"
        label="本次訂閱結束日期"
        disabled
        @update:modelValue="updateField('subscriptionEndDate', $event)"
      />
      <div class="flex items-end">
        <BaseButton variant="gray" @click="viewSubscriptionHistory" class="-ml-2">
          訂閱紀錄
        </BaseButton>
      </div>

      <!-- 第三行 -->
      <BaseInput
        :modelValue="studentData.subscriptionAmount"
        type="number"
        label="本次訂閱付費金額"
        disabled
        @update:modelValue="updateField('subscriptionAmount', $event)"
      />
      <BaseInput
        :modelValue="studentData.manualEndDate"
        type="date"
        label="人為訂閱結束日期"
        @update:modelValue="updateField('manualEndDate', $event)"
      />
      <div></div>

      <!-- 第四行 -->
      <BaseInput
        :modelValue="studentData.refundStatus"
        label="本次訂閱退費情形"
        :options="refundStatusOptions"
        @update:modelValue="updateField('refundStatus', $event)"
      />
      <div></div>
      <div></div>

      <!-- 第五行 -->
      <BaseInput
        :modelValue="studentData.trialEssayCount"
        type="number"
        label="開通試用作文次數"
        @update:modelValue="updateField('trialEssayCount', $event)"
      />
      <BaseInput
        :modelValue="studentData.usedTrialEssayCount"
        type="number"
        label="已使用試用作文次數"
        disabled
        @update:modelValue="updateField('usedTrialEssayCount', $event)"
      />
      <div></div>

      <!-- 第六行 - 作文紀錄 -->
      <div class="flex items-center">
        <span class="text-sm text-gray-600">剩餘試用作文: {{ remainingTrialEssays }} 次</span>
      </div>
      <div></div>
      <div></div>

      <!-- 第七行 -->
      <BaseInput
        :modelValue="studentData.createdAt"
        type="datetime-local"
        label="建立時間"
        disabled
        @update:modelValue="updateField('createdAt', $event)"
      />
      <BaseInput
        :modelValue="studentData.createdBy"
        type="text"
        label="建立人員"
        disabled
        @update:modelValue="updateField('createdBy', $event)"
      />
      <div></div>

      <!-- 第八行 -->
      <BaseInput
        :modelValue="studentData.updatedAt"
        type="datetime-local"
        label="最近修改時間"
        disabled
        @update:modelValue="updateField('updatedAt', $event)"
      />
      <BaseInput
        :modelValue="studentData.updatedBy"
        type="text"
        label="最近修改人員"
        disabled
        @update:modelValue="updateField('updatedBy', $event)"
      />
      <div class="flex items-end">
        <BaseButton variant="slate" @click="viewLogs" class="-ml-2"> LOG </BaseButton>
      </div>

      <!-- 第九行 -->
      <BaseSelect
        :modelValue="studentData.status"
        label="帳號狀態"
        :options="statusOptions"
        @update:modelValue="updateField('status', $event)"
      />
      <div></div>
      <div></div>

      <!-- 操作按鈕 -->
      <div class="col-span-2 mt-8 flex justify-end gap-4">
        <BaseButton variant="cancel" size="lg" @click="handleCancel"> 取消 </BaseButton>
        <BaseButton variant="primary" size="lg" :disabled="!canSave || saving" @click="handleSave">
          {{ saving ? '儲存中...' : '儲存' }}
        </BaseButton>
      </div>
    </div>
  </div>

  <div v-else class="bg-white rounded-lg shadow p-6">
    <div class="text-gray-500">無學生資料</div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useStudent } from '../composables/useStudent'

const {
  studentData,
  loading,
  error,
  statusOptions,
  refundStatusOptions,
  canSave,
  saving,
  remainingTrialEssays,
  updateField,
  handleSave,
  handleCancel,
  viewSubscriptionHistory,
  viewLogs,
} = useStudent()
</script>
