export interface TeacherForm {
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

// 新增教師列表介面
export interface TeacherListItem {
  id: number
  email: string
  name: string
  classCount: number
  studentCount: number
  status: 'active' | 'suspended' | 'reserved'
}

// 搜尋參數介面
export interface TeacherSearchParams {
  email?: string
  name?: string
  status?: string
  page?: number
  pageSize?: number
}

// API 回應介面
export interface TeacherListResponse {
  data: TeacherListItem[]
  total: number
  page: number
  pageSize: number
}

export const mockTeachers: Record<number, TeacherForm> = {
  1: {
    id: 1,
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
  },
  2: {
    id: 2,
    email: 'chen.li@school.edu.tw',
    name: '陳麗華',
    subscriptionStartDate: '2024-02-01',
    subscriptionEndDate: '2025-01-31',
    subscriptionAmount: 15000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 15,
    usedTrialEssayCount: 8,
    createdAt: '2024-02-01T10:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-02-10T16:20:00',
    updatedBy: '管理員B',
    status: 'active',
  },
  3: {
    id: 3,
    email: 'liu.wei@school.edu.tw',
    name: '劉偉強',
    subscriptionStartDate: '2024-03-01',
    subscriptionEndDate: '2024-12-31',
    subscriptionAmount: 10000,
    manualEndDate: '2024-06-30',
    refundStatus: '部分退費',
    trialEssayCount: 5,
    usedTrialEssayCount: 5,
    createdAt: '2024-03-01T11:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-03-15T09:45:00',
    updatedBy: '管理員C',
    status: 'suspended',
  },
  4: {
    id: 4,
    email: 'zhang.mei@school.edu.tw',
    name: '張美玲',
    subscriptionStartDate: '2024-04-01',
    subscriptionEndDate: '2025-03-31',
    subscriptionAmount: 18000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 20,
    usedTrialEssayCount: 12,
    createdAt: '2024-04-01T08:30:00',
    createdBy: '系統管理員',
    updatedAt: '2024-04-20T15:10:00',
    updatedBy: '管理員A',
    status: 'active',
  },
  5: {
    id: 5,
    email: 'huang.jun@school.edu.tw',
    name: '黃俊傑',
    subscriptionStartDate: '2024-05-01',
    subscriptionEndDate: '2024-10-31',
    subscriptionAmount: 8000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 8,
    usedTrialEssayCount: 2,
    createdAt: '2024-05-01T13:20:00',
    createdBy: '系統管理員',
    updatedAt: '2024-05-05T10:30:00',
    updatedBy: '管理員B',
    status: 'reserved',
  }
}

// 教師列表 mock 資料
export const mockTeachersList: TeacherListItem[] = [
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
    email: 'chen.li@school.edu.tw',
    name: '陳麗華',
    classCount: 2,
    studentCount: 56,
    status: 'active',
  },
  {
    id: 3,
    email: 'liu.wei@school.edu.tw',
    name: '劉偉強',
    classCount: 1,
    studentCount: 23,
    status: 'suspended',
  },
  {
    id: 4,
    email: 'zhang.mei@school.edu.tw',
    name: '張美玲',
    classCount: 4,
    studentCount: 102,
    status: 'active',
  },
  {
    id: 5,
    email: 'huang.jun@school.edu.tw',
    name: '黃俊傑',
    classCount: 2,
    studentCount: 45,
    status: 'reserved',
  },
  {
    id: 6,
    email: 'wu.xin@school.edu.tw',
    name: '吳欣怡',
    classCount: 3,
    studentCount: 78,
    status: 'active',
  },
  {
    id: 7,
    email: 'lin.hao@school.edu.tw',
    name: '林浩然',
    classCount: 1,
    studentCount: 34,
    status: 'suspended',
  },
  {
    id: 8,
    email: 'xu.yan@school.edu.tw',
    name: '徐雅雯',
    classCount: 5,
    studentCount: 125,
    status: 'active',
  },
  {
    id: 9,
    email: 'sun.lei@school.edu.tw',
    name: '孫雷',
    classCount: 2,
    studentCount: 67,
    status: 'reserved',
  },
  {
    id: 10,
    email: 'ma.jing@school.edu.tw',
    name: '馬靜',
    classCount: 3,
    studentCount: 89,
    status: 'active',
  },
  {
    id: 11,
    email: 'zhao.feng@school.edu.tw',
    name: '趙峰',
    classCount: 1,
    studentCount: 28,
    status: 'suspended',
  },
  {
    id: 12,
    email: 'qian.yu@school.edu.tw',
    name: '錢雨',
    classCount: 4,
    studentCount: 95,
    status: 'active',
  }
]

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const teacherApi = {
  // 獲取教師資料
  async getTeacher(id: number): Promise<TeacherForm> {
    await delay(800) // 模擬網路延遲

    const teacher = mockTeachers[id]
    if (!teacher) {
      throw new Error(`Teacher with id ${id} not found`)
    }

    return { ...teacher } // 返回副本避免直接修改
  },

  // 更新教師資料
  async updateTeacher(teacherData: TeacherForm): Promise<TeacherForm> {
    await delay(1000) // 模擬網路延遲

    // 更新 mock data
    const updatedTeacher = {
      ...teacherData,
      updatedAt: new Date().toISOString(),
      updatedBy: '當前用戶' // 實際應用中從認證狀態獲取
    }

    mockTeachers[teacherData.id] = updatedTeacher

    return { ...updatedTeacher }
  },

  // 獲取教師列表
  async getTeachersList(params: TeacherSearchParams = {}): Promise<TeacherListResponse> {
    await delay(600) // 模擬網路延遲

    const {
      email = '',
      name = '',
      status = 'ALL',
      page = 1,
      pageSize = 10
    } = params

    // 過濾資料
    let filteredTeachers = mockTeachersList.filter((teacher) => {
      // Email 過濾
      if (email && !teacher.email.toLowerCase().includes(email.toLowerCase())) {
        return false
      }

      // 姓名過濾
      if (name && !teacher.name.includes(name)) {
        return false
      }

      // 狀態過濾
      if (status !== 'ALL' && teacher.status !== status) {
        return false
      }

      return true
    })

    // 分頁處理
    const total = filteredTeachers.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredTeachers.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    }
  }
}

