<template>
  <div class="p-6 space-y-6">
    <!-- 功能區 -->
    <div class="bg-white rounded-lg shadow p-6">
      <!-- 搜尋表單 -->
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">教師 Email</label>
          <input v-model="searchForm.email" type="email" placeholder="輸入教師 Email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">教師姓名</label>
          <input v-model="searchForm.name" type="text" placeholder="輸入教師姓名"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">帳號狀態</label>
          <select v-model="searchForm.status"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10">
            <option value="ALL">全部</option>
            <option value="active">啟用中</option>
            <option value="suspended">停權中</option>
            <option value="reserved">保留</option>
          </select>
        </div>

        <div class="flex items-end space-x-2">
          <!-- 搜尋按鈕 - 低調質感設計 -->
          <button @click="handleSearch"
            class="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
            title="搜尋">
            <Search :size="20" />
          </button>
          <!-- 新增按鈕 - 低調質感設計 -->
          <button @click="handleAddTeacher"
            class="px-4 py-2 bg-slate-600 text-white border border-slate-600 rounded-md hover:bg-slate-700 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
            title="新增教師">
            <Plus :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Table 區 -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                姓名
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                班級數量
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                學生數量
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                帳號狀態
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="teacher in filteredTeachers" :key="teacher.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ teacher.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ teacher.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ teacher.classCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ teacher.studentCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(teacher.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ getStatusText(teacher.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <!-- 編輯按鈕改為 icon -->
                <button @click="handleEdit(teacher)"
                  class="text-blue-600 hover:text-blue-900 focus:outline-none p-1 rounded hover:bg-blue-50 cursor-pointer"
                  title="編輯">
                  <Edit2 :size="16" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分頁資訊 -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            顯示 {{ filteredTeachers.length }} 筆教師資料
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Plus, Edit2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

// 介面定義
interface Teacher {
  id: number
  email: string
  name: string
  classCount: number
  studentCount: number
  status: 'active' | 'suspended' | 'reserved'
}

interface SearchForm {
  email: string
  name: string
  status: string
}

// 響應式資料
const searchForm = ref<SearchForm>({
  email: '',
  name: '',
  status: 'ALL'
})

// Demo 教師資料 (30筆)
const teachers = ref<Teacher[]>([
  { id: 1, email: 'wang.ming@school.edu.tw', name: '王明華', classCount: 3, studentCount: 85, status: 'active' },
  { id: 2, email: 'chen.mei@school.edu.tw', name: '陳美玲', classCount: 2, studentCount: 58, status: 'active' },
  { id: 3, email: 'lin.jun@school.edu.tw', name: '林俊傑', classCount: 4, studentCount: 112, status: 'suspended' },
  { id: 4, email: 'huang.li@school.edu.tw', name: '黃麗華', classCount: 2, studentCount: 67, status: 'active' },
  { id: 5, email: 'wu.qiang@school.edu.tw', name: '吳志強', classCount: 3, studentCount: 89, status: 'reserved' },
  { id: 6, email: 'zhang.yan@school.edu.tw', name: '張雅雯', classCount: 1, studentCount: 28, status: 'active' },
  { id: 7, email: 'liu.wei@school.edu.tw', name: '劉偉民', classCount: 5, studentCount: 143, status: 'active' },
  { id: 8, email: 'xu.fang@school.edu.tw', name: '徐芳儀', classCount: 2, studentCount: 54, status: 'suspended' },
  { id: 9, email: 'sun.hao@school.edu.tw', name: '孫浩然', classCount: 3, studentCount: 76, status: 'active' },
  { id: 10, email: 'ma.xin@school.edu.tw', name: '馬心怡', classCount: 4, studentCount: 98, status: 'active' },
  { id: 11, email: 'zhu.gang@school.edu.tw', name: '朱剛毅', classCount: 2, studentCount: 61, status: 'reserved' },
  { id: 12, email: 'he.jing@school.edu.tw', name: '何靜雯', classCount: 3, studentCount: 82, status: 'active' },
  { id: 13, email: 'guo.bin@school.edu.tw', name: '郭彬彬', classCount: 1, studentCount: 31, status: 'suspended' },
  { id: 14, email: 'luo.na@school.edu.tw', name: '羅娜娜', classCount: 4, studentCount: 105, status: 'active' },
  { id: 15, email: 'li.tao@school.edu.tw', name: '李濤濤', classCount: 2, studentCount: 59, status: 'active' },
  { id: 16, email: 'zhou.mei@school.edu.tw', name: '周美美', classCount: 3, studentCount: 87, status: 'reserved' },
  { id: 17, email: 'deng.lei@school.edu.tw', name: '鄧雷雷', classCount: 5, studentCount: 134, status: 'active' },
  { id: 18, email: 'feng.xue@school.edu.tw', name: '馮雪雪', classCount: 2, studentCount: 48, status: 'suspended' },
  { id: 19, email: 'cao.jun@school.edu.tw', name: '曹俊俊', classCount: 3, studentCount: 73, status: 'active' },
  { id: 20, email: 'peng.li@school.edu.tw', name: '彭麗麗', classCount: 4, studentCount: 91, status: 'active' },
  { id: 21, email: 'yu.qing@school.edu.tw', name: '余青青', classCount: 1, studentCount: 25, status: 'reserved' },
  { id: 22, email: 'jiang.ming@school.edu.tw', name: '江明明', classCount: 3, studentCount: 79, status: 'active' },
  { id: 23, email: 'han.fei@school.edu.tw', name: '韓飛飛', classCount: 2, studentCount: 56, status: 'suspended' },
  { id: 24, email: 'xiao.hong@school.edu.tw', name: '蕭紅紅', classCount: 4, studentCount: 108, status: 'active' },
  { id: 25, email: 'shi.gang@school.edu.tw', name: '石剛剛', classCount: 3, studentCount: 84, status: 'active' },
  { id: 26, email: 'tan.hua@school.edu.tw', name: '譚華華', classCount: 2, studentCount: 63, status: 'reserved' },
  { id: 27, email: 'qin.long@school.edu.tw', name: '秦龍龍', classCount: 5, studentCount: 127, status: 'active' },
  { id: 28, email: 'fan.jie@school.edu.tw', name: '范潔潔', classCount: 1, studentCount: 29, status: 'suspended' },
  { id: 29, email: 'xie.ping@school.edu.tw', name: '謝平平', classCount: 3, studentCount: 77, status: 'active' },
  { id: 30, email: 'zou.an@school.edu.tw', name: '鄒安安', classCount: 4, studentCount: 95, status: 'active' }
])

// 計算過濾後的教師列表
const filteredTeachers = computed(() => {
  return teachers.value.filter(teacher => {
    // Email 過濾
    if (searchForm.value.email && !teacher.email.toLowerCase().includes(searchForm.value.email.toLowerCase())) {
      return false
    }

    // 姓名過濾
    if (searchForm.value.name && !teacher.name.includes(searchForm.value.name)) {
      return false
    }

    // 狀態過濾
    if (searchForm.value.status !== 'ALL' && teacher.status !== searchForm.value.status) {
      return false
    }

    return true
  })
})

// 方法定義
const handleSearch = () => {
  // 搜尋邏輯已透過 computed 自動處理
  console.log('執行搜尋:', searchForm.value)
}

const handleAddTeacher = () => {
  console.log('新增教師')
  // 這裡可以開啟新增教師的 modal 或導航到新增頁面
}

const handleEdit = (teacher: Teacher) => {
  // 導航到編輯頁面
  router.push(`/account/teachers/${teacher.id}`)
}

// 狀態樣式
const getStatusClass = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'suspended':
      return 'bg-red-100 text-red-800'
    case 'reserved':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// 狀態文字
const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return '啟用中'
    case 'suspended':
      return '停權中'
    case 'reserved':
      return '保留'
    default:
      return '未知'
  }
}
</script>
