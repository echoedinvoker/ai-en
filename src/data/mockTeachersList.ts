// 教師列表介面
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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const teacherListApi = {
  async getTeachersList(params: TeacherSearchParams = {}): Promise<TeacherListResponse> {
    await delay(600)

    const {
      email = '',
      name = '',
      status = 'ALL',
      page = 1,
      pageSize = 10
    } = params

    // 過濾邏輯
    let filteredTeachers = mockTeachersList.filter((teacher) => {
      if (email && !teacher.email.toLowerCase().includes(email.toLowerCase())) {
        return false
      }
      if (name && !teacher.name.includes(name)) {
        return false
      }
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
