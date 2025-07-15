export interface StaffListItem {
  id: number
  email: string
  name: string
  role: 'admin' | 'teacher' | 'assistant' | 'manager'
  status: 'active' | 'suspended' | 'reserved'
}

// 搜尋參數介面
export interface StaffSearchParams {
  email?: string
  name?: string
  role?: string
  status?: string
  page?: number
  pageSize?: number
}

// API 回應介面
export interface StaffListResponse {
  data: StaffListItem[]
  total: number
  page: number
  pageSize: number
}

// 員工列表 mock 資料 (50筆)
export const mockStaffList: StaffListItem[] = [
  { id: 1, email: 'admin001@school.edu.tw', name: '張主任', role: 'admin', status: 'active' },
  { id: 2, email: 'teacher001@school.edu.tw', name: '李老師', role: 'teacher', status: 'active' },
  { id: 3, email: 'teacher002@school.edu.tw', name: '王教授', role: 'teacher', status: 'suspended' },
  { id: 4, email: 'assistant001@school.edu.tw', name: '陳助理', role: 'assistant', status: 'active' },
  { id: 5, email: 'manager001@school.edu.tw', name: '林經理', role: 'manager', status: 'reserved' },
  { id: 6, email: 'teacher003@school.edu.tw', name: '黃老師', role: 'teacher', status: 'active' },
  { id: 7, email: 'admin002@school.edu.tw', name: '吳主管', role: 'admin', status: 'active' },
  { id: 8, email: 'assistant002@school.edu.tw', name: '劉助教', role: 'assistant', status: 'suspended' },
  { id: 9, email: 'teacher004@school.edu.tw', name: '蔡講師', role: 'teacher', status: 'active' },
  { id: 10, email: 'manager002@school.edu.tw', name: '鄭組長', role: 'manager', status: 'reserved' },
  { id: 11, email: 'teacher005@school.edu.tw', name: '許教師', role: 'teacher', status: 'active' },
  { id: 12, email: 'assistant003@school.edu.tw', name: '楊助理', role: 'assistant', status: 'active' },
  { id: 13, email: 'admin003@school.edu.tw', name: '謝主任', role: 'admin', status: 'suspended' },
  { id: 14, email: 'teacher006@school.edu.tw', name: '周老師', role: 'teacher', status: 'active' },
  { id: 15, email: 'manager003@school.edu.tw', name: '羅經理', role: 'manager', status: 'active' },
  { id: 16, email: 'assistant004@school.edu.tw', name: '高助教', role: 'assistant', status: 'reserved' },
  { id: 17, email: 'teacher007@school.edu.tw', name: '梁教授', role: 'teacher', status: 'active' },
  { id: 18, email: 'admin004@school.edu.tw', name: '潘主管', role: 'admin', status: 'active' },
  { id: 19, email: 'teacher008@school.edu.tw', name: '葉講師', role: 'teacher', status: 'suspended' },
  { id: 20, email: 'manager004@school.edu.tw', name: '范組長', role: 'manager', status: 'active' },
  { id: 21, email: 'assistant005@school.edu.tw', name: '董助理', role: 'assistant', status: 'active' },
  { id: 22, email: 'teacher009@school.edu.tw', name: '石老師', role: 'teacher', status: 'reserved' },
  { id: 23, email: 'admin005@school.edu.tw', name: '馬主任', role: 'admin', status: 'active' },
  { id: 24, email: 'teacher010@school.edu.tw', name: '孫教師', role: 'teacher', status: 'active' },
  { id: 25, email: 'manager005@school.edu.tw', name: '韓經理', role: 'manager', status: 'suspended' },
  { id: 26, email: 'assistant006@school.edu.tw', name: '曹助教', role: 'assistant', status: 'active' },
  { id: 27, email: 'teacher011@school.edu.tw', name: '薛老師', role: 'teacher', status: 'active' },
  { id: 28, email: 'admin006@school.edu.tw', name: '田主管', role: 'admin', status: 'reserved' },
  { id: 29, email: 'teacher012@school.edu.tw', name: '方講師', role: 'teacher', status: 'active' },
  { id: 30, email: 'manager006@school.edu.tw', name: '白組長', role: 'manager', status: 'active' },
  { id: 31, email: 'assistant007@school.edu.tw', name: '邱助理', role: 'assistant', status: 'suspended' },
  { id: 32, email: 'teacher013@school.edu.tw', name: '金教授', role: 'teacher', status: 'active' },
  { id: 33, email: 'admin007@school.edu.tw', name: '秦主任', role: 'admin', status: 'active' },
  { id: 34, email: 'teacher014@school.edu.tw', name: '江老師', role: 'teacher', status: 'reserved' },
  { id: 35, email: 'manager007@school.edu.tw', name: '尹經理', role: 'manager', status: 'active' },
  { id: 36, email: 'assistant008@school.edu.tw', name: '柯助教', role: 'assistant', status: 'active' },
  { id: 37, email: 'teacher015@school.edu.tw', name: '盧講師', role: 'teacher', status: 'suspended' },
  { id: 38, email: 'admin008@school.edu.tw', name: '龔主管', role: 'admin', status: 'active' },
  { id: 39, email: 'teacher016@school.edu.tw', name: '史教師', role: 'teacher', status: 'active' },
  { id: 40, email: 'manager008@school.edu.tw', name: '唐組長', role: 'manager', status: 'reserved' },
  { id: 41, email: 'assistant009@school.edu.tw', name: '費助理', role: 'assistant', status: 'active' },
  { id: 42, email: 'teacher017@school.edu.tw', name: '廖老師', role: 'teacher', status: 'active' },
  { id: 43, email: 'admin009@school.edu.tw', name: '程主任', role: 'admin', status: 'suspended' },
  { id: 44, email: 'teacher018@school.edu.tw', name: '傅教授', role: 'teacher', status: 'active' },
  { id: 45, email: 'manager009@school.edu.tw', name: '丁經理', role: 'manager', status: 'active' },
  { id: 46, email: 'assistant010@school.edu.tw', name: '袁助教', role: 'assistant', status: 'reserved' },
  { id: 47, email: 'teacher019@school.edu.tw', name: '任講師', role: 'teacher', status: 'active' },
  { id: 48, email: 'admin010@school.edu.tw', name: '姜主管', role: 'admin', status: 'active' },
  { id: 49, email: 'teacher020@school.edu.tw', name: '湯老師', role: 'teacher', status: 'suspended' },
  { id: 50, email: 'manager010@school.edu.tw', name: '蕭組長', role: 'manager', status: 'active' }
]

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const staffApi = {
  // 獲取員工列表
  async getStaffList(params: StaffSearchParams = {}): Promise<StaffListResponse> {
    await delay(600) // 模擬網路延遲

    const {
      email = '',
      name = '',
      role = 'ALL',
      status = 'ALL',
      page = 1,
      pageSize = 10
    } = params

    // 過濾資料
    let filteredStaff = mockStaffList.filter((staff) => {
      // Email 過濾
      if (email && !staff.email.toLowerCase().includes(email.toLowerCase())) {
        return false
      }

      // 姓名過濾
      if (name && !staff.name.includes(name)) {
        return false
      }

      // 角色過濾
      if (role !== 'ALL' && staff.role !== role) {
        return false
      }

      // 狀態過濾
      if (status !== 'ALL' && staff.status !== status) {
        return false
      }

      return true
    })

    // 分頁處理
    const total = filteredStaff.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredStaff.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    }
  }
}

