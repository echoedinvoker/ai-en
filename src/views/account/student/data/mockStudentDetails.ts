export interface StudentForm {
  id: number
  email: string
  name: string
  password: string
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

export const mockStudentDetails: Record<number, StudentForm> = {
  1: {
    id: 1,
    email: 'student001@gmail.com',
    name: '李小明',
    password: 'password123',
    subscriptionStartDate: '2024-01-15',
    subscriptionEndDate: '2024-12-15',
    subscriptionAmount: 8000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 5,
    usedTrialEssayCount: 2,
    createdAt: '2024-01-15T10:30:00',
    createdBy: '系統管理員',
    updatedAt: '2024-01-20T14:15:00',
    updatedBy: '管理員A',
    status: 'active',
  },
  2: {
    id: 2,
    email: 'student002@gmail.com',
    name: '陳小華',
    password: 'mypass456',
    subscriptionStartDate: '2024-02-10',
    subscriptionEndDate: '2025-02-10',
    subscriptionAmount: 12000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 8,
    usedTrialEssayCount: 5,
    createdAt: '2024-02-10T09:20:00',
    createdBy: '系統管理員',
    updatedAt: '2024-02-25T16:40:00',
    updatedBy: '管理員B',
    status: 'active',
  },
  3: {
    id: 3,
    email: 'student003@gmail.com',
    name: '張小美',
    password: 'secure789',
    subscriptionStartDate: '2024-03-05',
    subscriptionEndDate: '2024-09-05',
    subscriptionAmount: 6000,
    manualEndDate: '2024-07-15',
    refundStatus: '部分退費',
    trialEssayCount: 3,
    usedTrialEssayCount: 3,
    createdAt: '2024-03-05T11:45:00',
    createdBy: '系統管理員',
    updatedAt: '2024-03-20T13:25:00',
    updatedBy: '管理員C',
    status: 'suspended',
  },
  4: {
    id: 4,
    email: 'student004@gmail.com',
    name: '王小強',
    password: 'student2024',
    subscriptionStartDate: '2024-04-01',
    subscriptionEndDate: '2025-04-01',
    subscriptionAmount: 15000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 10,
    usedTrialEssayCount: 7,
    createdAt: '2024-04-01T08:15:00',
    createdBy: '系統管理員',
    updatedAt: '2024-04-15T17:30:00',
    updatedBy: '管理員A',
    status: 'active',
  },
  5: {
    id: 5,
    email: 'student005@gmail.com',
    name: '林小雅',
    password: 'mypassword',
    subscriptionStartDate: '2024-05-20',
    subscriptionEndDate: '2024-11-20',
    subscriptionAmount: 7000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 6,
    usedTrialEssayCount: 1,
    createdAt: '2024-05-20T14:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-05-25T10:20:00',
    updatedBy: '管理員B',
    status: 'reserved',
  },
  6: {
    id: 6,
    email: 'student006@gmail.com',
    name: '黃小傑',
    password: 'password456',
    subscriptionStartDate: '2024-06-01',
    subscriptionEndDate: '2025-06-01',
    subscriptionAmount: 18000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 12,
    usedTrialEssayCount: 9,
    createdAt: '2024-06-01T12:30:00',
    createdBy: '系統管理員',
    updatedAt: '2024-06-10T15:45:00',
    updatedBy: '管理員C',
    status: 'active',
  },
  7: {
    id: 7,
    email: 'student007@gmail.com',
    name: '吳小玲',
    password: 'secure123',
    subscriptionStartDate: '2024-07-15',
    subscriptionEndDate: '2024-12-15',
    subscriptionAmount: 5000,
    manualEndDate: '2024-10-01',
    refundStatus: '全額退費',
    trialEssayCount: 2,
    usedTrialEssayCount: 2,
    createdAt: '2024-07-15T16:20:00',
    createdBy: '系統管理員',
    updatedAt: '2024-07-30T11:10:00',
    updatedBy: '管理員A',
    status: 'suspended',
  },
  8: {
    id: 8,
    email: 'student008@gmail.com',
    name: '劉小偉',
    password: 'student789',
    subscriptionStartDate: '2024-08-01',
    subscriptionEndDate: '2025-08-01',
    subscriptionAmount: 20000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 15,
    usedTrialEssayCount: 4,
    createdAt: '2024-08-01T09:45:00',
    createdBy: '系統管理員',
    updatedAt: '2024-08-05T14:30:00',
    updatedBy: '管理員B',
    status: 'active',
  },
  9: {
    id: 9,
    email: 'student009@gmail.com',
    name: '蔡小芳',
    password: 'mypass2024',
    subscriptionStartDate: '2024-09-10',
    subscriptionEndDate: '2025-03-10',
    subscriptionAmount: 9000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 7,
    usedTrialEssayCount: 3,
    createdAt: '2024-09-10T13:15:00',
    createdBy: '系統管理員',
    updatedAt: '2024-09-15T16:50:00',
    updatedBy: '管理員C',
    status: 'reserved',
  },
  10: {
    id: 10,
    email: 'student010@gmail.com',
    name: '鄭小宇',
    password: 'password2024',
    subscriptionStartDate: '2024-10-01',
    subscriptionEndDate: '2025-10-01',
    subscriptionAmount: 16000,
    manualEndDate: '',
    refundStatus: '無退費',
    trialEssayCount: 11,
    usedTrialEssayCount: 6,
    createdAt: '2024-10-01T10:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-10-08T12:25:00',
    updatedBy: '管理員A',
    status: 'active',
  }
}

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const studentDetailApi = {
  async getStudent(id: number): Promise<StudentForm> {
    await delay(800)
    const student = mockStudentDetails[id]
    if (!student) {
      throw new Error(`Student with id ${id} not found`)
    }
    return { ...student }
  },

  async updateStudent(studentData: StudentForm): Promise<StudentForm> {
    await delay(1000)
    const updatedStudent = {
      ...studentData,
      updatedAt: new Date().toISOString(),
      updatedBy: '當前用戶'
    }
    mockStudentDetails[studentData.id] = updatedStudent
    return { ...updatedStudent }
  }
}

