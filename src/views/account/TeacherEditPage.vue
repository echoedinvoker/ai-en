<template>
  <div class="p-6 space-y-6">
    <!-- 標題 -->
    <div class="flex items-center justify-end">
      <button @click="handleBack" class="text-blue-600 hover:text-blue-800 flex items-center gap-2 cursor-pointer">
        <ArrowLeft :size="20" />
        返回列表
      </button>
    </div>

    <!-- 主要內容區域 -->
    <div class="bg-white rounded-lg shadow p-6">
      <div>
        <div class="flex gap-6">
          <!-- Grid 表單區域 -->
          <div class="flex-1">
            <div class="grid grid-cols-[2fr_2fr_1fr] gap-6">
              <!-- 第一行 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">教師 Email</label>
                <input v-model="teacherForm.email" type="email" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">教師姓名</label>
                <input v-model="teacherForm.name" type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div></div>

              <!-- 第二行 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">本次訂閱開始日期</label>
                <input v-model="teacherForm.subscriptionStartDate" type="date" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">本次訂閱結束日期</label>
                <input v-model="teacherForm.subscriptionEndDate" type="date" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <!-- 訂閱紀錄按鈕 - 低調質感設計 -->
              <div class="flex items-end">
                <button @click="handleSubscriptionHistory"
                  class="px-4 py-2 bg-gray-600 text-white border border-gray-600 rounded-md hover:bg-gray-700 hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-200 whitespace-nowrap cursor-pointer -ml-2">
                  訂閱紀錄
                </button>
              </div>

              <!-- 第三行 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">本次訂閱付費金額</label>
                <input v-model="teacherForm.subscriptionAmount" type="number" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">人為訂閱結束日期</label>
                <input v-model="teacherForm.manualEndDate" type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div></div>

              <!-- 第四行 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">本次訂閱退費情形</label>
                <input v-model="teacherForm.refundStatus" type="text" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div></div>
              <div></div>

              <!-- 第五行 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">開通試用作文次數</label>
                <input v-model="teacherForm.trialEssayCount" type="number"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">已使用試用作文次數</label>
                <input v-model="teacherForm.usedTrialEssayCount" type="number" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div></div>

              <!-- 第六行 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">建立時間</label>
                <input v-model="teacherForm.createdAt" type="datetime-local" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">建立人員</label>
                <input v-model="teacherForm.createdBy" type="text" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div></div>

              <!-- 第七行 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">最近修改時間</label>
                <input v-model="teacherForm.updatedAt" type="datetime-local" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">最近修改人員</label>
                <input v-model="teacherForm.updatedBy" type="text" disabled
                  class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <!-- LOG 按鈕 - 低調質感設計 -->
              <div class="flex items-end">
                <button @click="handleViewLogs"
                  class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 whitespace-nowrap cursor-pointer -ml-2">
                  LOG
                </button>
              </div>

              <!-- 第八行 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">帳號狀態</label>
                <select v-model="teacherForm.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">啟用中</option>
                  <option value="suspended">停權中</option>
                  <option value="reserved">保留</option>
                </select>
              </div>
              <div></div>
              <div></div>

              <!-- 第九行(操作按鈕) -->
              <div class="col-span-2 mt-8 flex justify-end gap-4">
                <button @click="handleCancel"
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer">
                  取消
                </button>
                <button @click="handleSave"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  儲存
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

// 路由相關
const route = useRoute()
const router = useRouter()

// 教師表單資料
interface TeacherForm {
  id: number
  email: string
  name: string
  subscriptionStartDate: string
  subscriptionEndDate: string
  subscriptionAmount: number
  manualEndDate: string
  refundStatus: string
  trialEssayCount: number
  usedTrialEssayCount: number
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  status: 'active' | 'suspended' | 'reserved'
}

// 表單資料
const teacherForm = ref<TeacherForm>({
  id: 0,
  email: '',
  name: '',
  subscriptionStartDate: '',
  subscriptionEndDate: '',
  subscriptionAmount: 0,
  manualEndDate: '',
  refundStatus: '',
  trialEssayCount: 0,
  usedTrialEssayCount: 0,
  createdAt: '',
  createdBy: '',
  updatedAt: '',
  updatedBy: '',
  status: 'active',
})

// 載入教師資料
const loadTeacherData = async () => {
  const teacherId = route.params.id as string

  // 模擬 API 呼叫 - 實際應用中應該從後端獲取資料
  const mockData: TeacherForm = {
    id: parseInt(teacherId),
    email: 'wang.ming@school.edu.tw',
    name: '王明華',
    subscriptionStartDate: '2024-01-01',
    subscriptionEndDate: '2024-12-31',
    subscriptionAmount: 12000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 10,
    usedTrialEssayCount: 3,
    createdAt: '2024-01-01T09:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-01-15T14:30:00',
    updatedBy: '管理員A',
    status: 'active',
  }

  teacherForm.value = mockData
}

// 方法定義
const handleBack = () => {
  router.push('/account/teachers')
}

const handleCancel = () => {
  router.push('/account/teachers')
}

const handleSave = async () => {
  try {
    // 模擬保存 API 呼叫
    console.log('保存教師資料:', teacherForm.value)

    // 顯示成功訊息 (實際應用中可使用 toast 或其他通知方式)
    alert('教師資料已成功更新！')

    // 返回列表頁
    router.push('/account/teachers')
  } catch (error) {
    console.error('保存失敗:', error)
    alert('保存失敗，請稍後再試')
  }
}

const handleSubscriptionHistory = () => {
  console.log('查看訂閱紀錄')
  // 實際應用中可開啟 modal 或導航到訂閱紀錄頁面
  alert('訂閱紀錄功能開發中')
}

const handleViewLogs = () => {
  console.log('查看 LOG')
  // 實際應用中可開啟 modal 或導航到 LOG 頁面
  alert('LOG 查看功能開發中')
}

// 組件掛載時載入資料
onMounted(() => {
  loadTeacherData()
})
</script>
