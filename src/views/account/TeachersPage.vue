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
          <!-- 搜尋按鈕 -->
          <button @click="handleSearch"
            class="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center cursor-pointer"
            title="搜尋">
            <Search :size="20" />
          </button>
          <!-- 新增按鈕 -->
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
            <tr v-for="teacher in paginatedTeachers" :key="teacher.id" class="hover:bg-gray-50">
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
                <button @click="handleEdit(teacher)"
                  class="text-blue-600 hover:text-blue-900 focus:outline-none p-1 rounded hover:bg-blue-50 cursor-pointer"
                  title="編輯">
                  <Edit2 :size="16" />
                </button>
              </td>
            </tr>

            <tr v-if="paginatedTeachers.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                沒有符合條件的教師資料
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination 區域 -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-700">
              顯示 {{ startRecord }} - {{ endRecord }} 筆，共 {{ totalRecords }} 筆教師資料
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-700">每頁顯示：</label>
              <select v-model="pagination.pageSize" @change="handlePageSizeChange"
                class="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span class="text-sm text-gray-700">筆</span>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <button @click="goToPage(1)" :disabled="pagination.currentPage === 1"
              class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              首頁
            </button>

            <button @click="goToPage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1"
              class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              上一頁
            </button>

            <div class="flex space-x-1">
              <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
                'px-3 py-1 text-sm border rounded',
                page === pagination.currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-300 hover:bg-gray-50',
              ]">
                {{ page }}
              </button>
            </div>

            <button @click="goToPage(pagination.currentPage + 1)" :disabled="pagination.currentPage === totalPages"
              class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              下一頁
            </button>

            <button @click="goToPage(totalPages)" :disabled="pagination.currentPage === totalPages"
              class="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              末頁
            </button>
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

interface Pagination {
  currentPage: number
  pageSize: number
}

// 搜尋表單 - 用於輸入
const searchForm = ref<SearchForm>({
  email: '',
  name: '',
  status: 'ALL',
})

// 實際搜尋條件 - 用於過濾資料
const activeSearchForm = ref<SearchForm>({
  email: '',
  name: '',
  status: 'ALL',
})

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
})

// Demo 教師資料
const teachers = ref<Teacher[]>([
  {
    id: 1,
    email: 'wang.ming@school.edu.tw',
    name: '王明華',
    classCount: 3,
    studentCount: 85,
    status: 'active',
  },
  {
    id: 2,
    email: 'chen.mei@school.edu.tw',
    name: '陳美玲',
    classCount: 2,
    studentCount: 58,
    status: 'active',
  },
  {
    id: 3,
    email: 'lin.jun@school.edu.tw',
    name: '林俊傑',
    classCount: 4,
    studentCount: 112,
    status: 'suspended',
  },
  {
    id: 4,
    email: 'huang.li@school.edu.tw',
    name: '黃麗華',
    classCount: 2,
    studentCount: 67,
    status: 'active',
  },
  {
    id: 5,
    email: 'wu.qiang@school.edu.tw',
    name: '吳志強',
    classCount: 3,
    studentCount: 89,
    status: 'reserved',
  },
  {
    id: 6,
    email: 'zhang.yan@school.edu.tw',
    name: '張雅雯',
    classCount: 1,
    studentCount: 28,
    status: 'active',
  },
  {
    id: 7,
    email: 'liu.wei@school.edu.tw',
    name: '劉偉民',
    classCount: 5,
    studentCount: 143,
    status: 'active',
  },
  {
    id: 8,
    email: 'xu.fang@school.edu.tw',
    name: '徐芳儀',
    classCount: 2,
    studentCount: 54,
    status: 'suspended',
  },
  {
    id: 9,
    email: 'sun.hao@school.edu.tw',
    name: '孫浩然',
    classCount: 3,
    studentCount: 76,
    status: 'active',
  },
  {
    id: 10,
    email: 'ma.xin@school.edu.tw',
    name: '馬心怡',
    classCount: 4,
    studentCount: 98,
    status: 'active',
  },
  {
    id: 11,
    email: 'zhu.gang@school.edu.tw',
    name: '朱剛毅',
    classCount: 2,
    studentCount: 61,
    status: 'reserved',
  },
  {
    id: 12,
    email: 'he.jing@school.edu.tw',
    name: '何靜雯',
    classCount: 3,
    studentCount: 82,
    status: 'active',
  },
  {
    id: 13,
    email: 'guo.bin@school.edu.tw',
    name: '郭彬彬',
    classCount: 1,
    studentCount: 31,
    status: 'suspended',
  },
  {
    id: 14,
    email: 'luo.na@school.edu.tw',
    name: '羅娜娜',
    classCount: 4,
    studentCount: 105,
    status: 'active',
  },
  {
    id: 15,
    email: 'li.tao@school.edu.tw',
    name: '李濤濤',
    classCount: 2,
    studentCount: 59,
    status: 'active',
  },
  {
    id: 16,
    email: 'zhou.mei@school.edu.tw',
    name: '周美美',
    classCount: 3,
    studentCount: 87,
    status: 'reserved',
  },
  {
    id: 17,
    email: 'deng.lei@school.edu.tw',
    name: '鄧雷雷',
    classCount: 5,
    studentCount: 134,
    status: 'active',
  },
  {
    id: 18,
    email: 'feng.xue@school.edu.tw',
    name: '馮雪雪',
    classCount: 2,
    studentCount: 48,
    status: 'suspended',
  },
  {
    id: 19,
    email: 'cao.jun@school.edu.tw',
    name: '曹俊俊',
    classCount: 3,
    studentCount: 73,
    status: 'active',
  },
  {
    id: 20,
    email: 'peng.li@school.edu.tw',
    name: '彭麗麗',
    classCount: 4,
    studentCount: 91,
    status: 'active',
  },
  {
    id: 21,
    email: 'yu.qing@school.edu.tw',
    name: '余青青',
    classCount: 1,
    studentCount: 25,
    status: 'reserved',
  },
  {
    id: 22,
    email: 'jiang.ming@school.edu.tw',
    name: '江明明',
    classCount: 3,
    studentCount: 79,
    status: 'active',
  },
  {
    id: 23,
    email: 'han.fei@school.edu.tw',
    name: '韓飛飛',
    classCount: 2,
    studentCount: 56,
    status: 'suspended',
  },
  {
    id: 24,
    email: 'xiao.hong@school.edu.tw',
    name: '蕭紅紅',
    classCount: 4,
    studentCount: 108,
    status: 'active',
  },
  {
    id: 25,
    email: 'shi.gang@school.edu.tw',
    name: '石剛剛',
    classCount: 3,
    studentCount: 84,
    status: 'active',
  },
  {
    id: 26,
    email: 'tan.hua@school.edu.tw',
    name: '譚華華',
    classCount: 2,
    studentCount: 63,
    status: 'reserved',
  },
  {
    id: 27,
    email: 'qin.long@school.edu.tw',
    name: '秦龍龍',
    classCount: 5,
    studentCount: 127,
    status: 'active',
  },
  {
    id: 28,
    email: 'fan.jie@school.edu.tw',
    name: '范潔潔',
    classCount: 1,
    studentCount: 29,
    status: 'suspended',
  },
  {
    id: 29,
    email: 'xie.ping@school.edu.tw',
    name: '謝平平',
    classCount: 3,
    studentCount: 77,
    status: 'active',
  },
  {
    id: 30,
    email: 'zou.an@school.edu.tw',
    name: '鄒安安',
    classCount: 4,
    studentCount: 95,
    status: 'active',
  },
])

// 使用 activeSearchForm 進行過濾
const filteredTeachers = computed(() => {
  return teachers.value.filter((teacher) => {
    // Email 過濾
    if (
      activeSearchForm.value.email &&
      !teacher.email.toLowerCase().includes(activeSearchForm.value.email.toLowerCase())
    ) {
      return false
    }

    // 姓名過濾
    if (activeSearchForm.value.name && !teacher.name.includes(activeSearchForm.value.name)) {
      return false
    }

    // 狀態過濾
    if (activeSearchForm.value.status !== 'ALL' && teacher.status !== activeSearchForm.value.status) {
      return false
    }

    return true
  })
})

const totalRecords = computed(() => filteredTeachers.value.length)
const totalPages = computed(() => Math.ceil(totalRecords.value / pagination.value.pageSize))
const startRecord = computed(
  () => (pagination.value.currentPage - 1) * pagination.value.pageSize + 1,
)
const endRecord = computed(() =>
  Math.min(pagination.value.currentPage * pagination.value.pageSize, totalRecords.value),
)

const paginatedTeachers = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return filteredTeachers.value.slice(start, end)
})

const visiblePages = computed(() => {
  const current = pagination.value.currentPage
  const total = totalPages.value
  const pages: number[] = []

  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    pagination.value.currentPage = page
  }
}

const handlePageSizeChange = () => {
  pagination.value.currentPage = 1
}

// 搜尋按鈕點擊處理 - 將搜尋表單的值複製到實際搜尋條件
const handleSearch = () => {
  activeSearchForm.value = { ...searchForm.value }
  pagination.value.currentPage = 1 // 重置到第一頁
  console.log('執行搜尋:', activeSearchForm.value)
}

const handleAddTeacher = () => {
  console.log('新增教師')
}

const handleEdit = (teacher: Teacher) => {
  router.push(`/account/teachers/${teacher.id}`)
}

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

