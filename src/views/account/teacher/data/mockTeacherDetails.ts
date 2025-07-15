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

export const mockTeacherDetails: Record<number, TeacherForm> = {
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

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const teacherDetailApi = {
  async getTeacher(id: number): Promise<TeacherForm> {
    await delay(800)
    const teacher = mockTeacherDetails[id]
    if (!teacher) {
      throw new Error(`Teacher with id ${id} not found`)
    }
    return { ...teacher }
  },

  async updateTeacher(teacherData: TeacherForm): Promise<TeacherForm> {
    await delay(1000)
    const updatedTeacher = {
      ...teacherData,
      updatedAt: new Date().toISOString(),
      updatedBy: '當前用戶'
    }
    mockTeacherDetails[teacherData.id] = updatedTeacher
    return { ...updatedTeacher }
  }
}
