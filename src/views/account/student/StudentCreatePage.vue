<template>
  <PageContainer>
    <Card class="max-w-screen-xl">
      <div class="grid grid-cols-3 gap-x-8 gap-y-4">
        <!-- 第一行: 學生email, 學生姓名 -->
        <BaseInput
          v-model="formData.email"
          label="學生 Email"
          placeholder="請輸入學生 Email"
          type="email"
        />
        <BaseInput
          v-model="formData.name"
          label="學生姓名"
          placeholder="請輸入學生姓名"
        />
        <div></div>

        <!-- 第二行: 密碼 -->
        <BaseInput
          v-model="formData.password"
          label="密碼"
          placeholder="請輸入密碼"
          type="password"
        />
        <div></div>
        <div></div>

        <!-- 第三行: 帳號狀態 -->
        <BaseSelect
          v-model="formData.status"
          label="帳號狀態"
          :options="[
            { label: '啟用', value: 'active' },
            { label: '暫停', value: 'suspended' },
            { label: '保留', value: 'reserved' },
          ]"
        />
        <div></div>
        <div></div>

        <!-- 按鈕區域 -->
        <div class="col-span-2 mt-8 flex justify-end gap-4">
          <!-- 取消按鈕 -->
          <IconButton
            @click="handleCancel"
            :icon="X"
            title="取消"
            :iconSize="32"
            variant="secondary"
          />
          <!-- 建立按鈕 -->
          <IconButton
            @click="handleCreate"
            :icon="Save"
            title="建立學生"
            :iconSize="32"
            variant="primary"
          />
        </div>
      </div>
    </Card>
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/common/PageContainer.vue'
import Card from '@/components/common/Card.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import IconButton from '@/components/common/IconButton.vue'
import { X, Save } from 'lucide-vue-next'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表單資料結構，只包含必要欄位
interface StudentCreateForm {
  email: string
  name: string
  password: string
  status: 'active' | 'suspended' | 'reserved'
}

const formData: Ref<StudentCreateForm> = ref({
  email: '',
  name: '',
  password: '',
  status: 'active', // 預設為啟用狀態
})

// 取消操作
const handleCancel = () => {
  router.back()
}

// 建立學生
const handleCreate = async () => {
  try {
    // 基本驗證
    if (!formData.value.email || !formData.value.name || !formData.value.password) {
      alert('請填寫所有必填欄位')
      return
    }

    // 這裡可以加入 API 呼叫來建立學生
    console.log('建立學生資料:', formData.value)

    // 建立成功後導向學生列表頁面
    router.push('/account/student')
  } catch (error) {
    console.error('建立學生失敗:', error)
    alert('建立學生失敗，請稍後再試')
  }
}
</script>

