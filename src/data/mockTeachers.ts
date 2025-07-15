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
  }
}

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
  }
}

