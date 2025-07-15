export interface StaffForm {
  id: number
  email: string
  name: string
  password: string
  role: 'admin' | 'manager' | 'operator'
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  status: 'active' | 'suspended' | 'reserved'
}

export const mockStaffDetails: Record<number, StaffForm> = {
  1: {
    id: 1,
    email: 'admin@ai-en.com',
    name: '系統管理員',
    password: 'admin123',
    role: 'admin',
    createdAt: '2024-01-01T09:00:00',
    createdBy: '系統',
    updatedAt: '2024-01-15T14:30:00',
    updatedBy: '超級管理員',
    status: 'active',
  },
  2: {
    id: 2,
    email: 'manager.wang@ai-en.com',
    name: '王經理',
    password: 'manager123',
    role: 'manager',
    createdAt: '2024-01-05T10:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-02-10T16:20:00',
    updatedBy: '系統管理員',
    status: 'active',
  },
  3: {
    id: 3,
    email: 'operator.chen@ai-en.com',
    name: '陳操作員',
    password: 'operator123',
    role: 'operator',
    createdAt: '2024-01-10T11:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-03-15T09:45:00',
    updatedBy: '王經理',
    status: 'suspended',
  },
  4: {
    id: 4,
    email: 'manager.liu@ai-en.com',
    name: '劉副理',
    password: 'manager456',
    role: 'manager',
    createdAt: '2024-02-01T08:30:00',
    createdBy: '系統管理員',
    updatedAt: '2024-04-20T15:10:00',
    updatedBy: '系統管理員',
    status: 'active',
  },
  5: {
    id: 5,
    email: 'operator.zhang@ai-en.com',
    name: '張助理',
    password: 'operator789',
    role: 'operator',
    createdAt: '2024-02-15T13:20:00',
    createdBy: '王經理',
    updatedAt: '2024-05-05T10:30:00',
    updatedBy: '劉副理',
    status: 'reserved',
  }
}

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const staffDetailApi = {
  async getStaff(id: number): Promise<StaffForm> {
    await delay(800)
    const staff = mockStaffDetails[id]
    if (!staff) {
      throw new Error(`Staff with id ${id} not found`)
    }
    return { ...staff }
  },

  async updateStaff(staffData: StaffForm): Promise<StaffForm> {
    await delay(1000)
    const updatedStaff = {
      ...staffData,
      updatedAt: new Date().toISOString(),
      updatedBy: '當前用戶'
    }
    mockStaffDetails[staffData.id] = updatedStaff
    return { ...updatedStaff }
  }
}

