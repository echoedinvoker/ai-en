// 學生介面定義
export interface StudentListItem {
  id: number
  email: string
  name: string
  status: 'active' | 'suspended' | 'reserved'
}

// 搜尋參數介面
export interface StudentSearchParams {
  email?: string
  name?: string
  status?: string
  page?: number
  pageSize?: number
}

// API 回應介面
export interface StudentListResponse {
  data: StudentListItem[]
  total: number
  page: number
  pageSize: number
}

// 學生列表 mock 資料 (50筆)
export const mockStudentsList: StudentListItem[] = [
  { id: 1, email: 'student001@school.edu.tw', name: '王小明', status: 'active' },
  { id: 2, email: 'student002@school.edu.tw', name: '李美華', status: 'active' },
  { id: 3, email: 'student003@school.edu.tw', name: '張志強', status: 'suspended' },
  { id: 4, email: 'student004@school.edu.tw', name: '陳雅婷', status: 'active' },
  { id: 5, email: 'student005@school.edu.tw', name: '林建宏', status: 'reserved' },
  { id: 6, email: 'student006@school.edu.tw', name: '黃淑芬', status: 'active' },
  { id: 7, email: 'student007@school.edu.tw', name: '吳俊傑', status: 'active' },
  { id: 8, email: 'student008@school.edu.tw', name: '劉怡君', status: 'suspended' },
  { id: 9, email: 'student009@school.edu.tw', name: '蔡明達', status: 'active' },
  { id: 10, email: 'student010@school.edu.tw', name: '鄭佳玲', status: 'reserved' },
  { id: 11, email: 'student011@school.edu.tw', name: '許志豪', status: 'active' },
  { id: 12, email: 'student012@school.edu.tw', name: '楊雅雯', status: 'active' },
  { id: 13, email: 'student013@school.edu.tw', name: '謝文彬', status: 'suspended' },
  { id: 14, email: 'student014@school.edu.tw', name: '周美玲', status: 'active' },
  { id: 15, email: 'student015@school.edu.tw', name: '羅志明', status: 'active' },
  { id: 16, email: 'student016@school.edu.tw', name: '高淑惠', status: 'reserved' },
  { id: 17, email: 'student017@school.edu.tw', name: '梁建華', status: 'active' },
  { id: 18, email: 'student018@school.edu.tw', name: '潘雅芳', status: 'active' },
  { id: 19, email: 'student019@school.edu.tw', name: '葉志偉', status: 'suspended' },
  { id: 20, email: 'student020@school.edu.tw', name: '范美慧', status: 'active' },
  { id: 21, email: 'student021@school.edu.tw', name: '董俊宏', status: 'active' },
  { id: 22, email: 'student022@school.edu.tw', name: '石雅琪', status: 'reserved' },
  { id: 23, email: 'student023@school.edu.tw', name: '馬志強', status: 'active' },
  { id: 24, email: 'student024@school.edu.tw', name: '孫美玲', status: 'active' },
  { id: 25, email: 'student025@school.edu.tw', name: '韓建明', status: 'suspended' },
  { id: 26, email: 'student026@school.edu.tw', name: '曹淑芬', status: 'active' },
  { id: 27, email: 'student027@school.edu.tw', name: '薛志豪', status: 'active' },
  { id: 28, email: 'student028@school.edu.tw', name: '田雅雯', status: 'reserved' },
  { id: 29, email: 'student029@school.edu.tw', name: '方文彬', status: 'active' },
  { id: 30, email: 'student030@school.edu.tw', name: '白美華', status: 'active' },
  { id: 31, email: 'student031@school.edu.tw', name: '邱志明', status: 'suspended' },
  { id: 32, email: 'student032@school.edu.tw', name: '金淑惠', status: 'active' },
  { id: 33, email: 'student033@school.edu.tw', name: '秦建華', status: 'active' },
  { id: 34, email: 'student034@school.edu.tw', name: '江雅芳', status: 'reserved' },
  { id: 35, email: 'student035@school.edu.tw', name: '尹志偉', status: 'active' },
  { id: 36, email: 'student036@school.edu.tw', name: '柯美慧', status: 'active' },
  { id: 37, email: 'student037@school.edu.tw', name: '盧俊宏', status: 'suspended' },
  { id: 38, email: 'student038@school.edu.tw', name: '龔雅琪', status: 'active' },
  { id: 39, email: 'student039@school.edu.tw', name: '史志強', status: 'active' },
  { id: 40, email: 'student040@school.edu.tw', name: '唐美玲', status: 'reserved' },
  { id: 41, email: 'student041@school.edu.tw', name: '費建明', status: 'active' },
  { id: 42, email: 'student042@school.edu.tw', name: '廖淑芬', status: 'active' },
  { id: 43, email: 'student043@school.edu.tw', name: '程志豪', status: 'suspended' },
  { id: 44, email: 'student044@school.edu.tw', name: '傅雅雯', status: 'active' },
  { id: 45, email: 'student045@school.edu.tw', name: '丁文彬', status: 'active' },
  { id: 46, email: 'student046@school.edu.tw', name: '袁美華', status: 'reserved' },
  { id: 47, email: 'student047@school.edu.tw', name: '任志明', status: 'active' },
  { id: 48, email: 'student048@school.edu.tw', name: '姜淑惠', status: 'active' },
  { id: 49, email: 'student049@school.edu.tw', name: '湯建華', status: 'suspended' },
  { id: 50, email: 'student050@school.edu.tw', name: '蕭雅芳', status: 'active' }
]

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const studentApi = {
  // 獲取學生列表
  async getStudentsList(params: StudentSearchParams = {}): Promise<StudentListResponse> {
    await delay(600) // 模擬網路延遲

    const {
      email = '',
      name = '',
      status = 'ALL',
      page = 1,
      pageSize = 10
    } = params

    // 過濾資料
    let filteredStudents = mockStudentsList.filter((student) => {
      // Email 過濾
      if (email && !student.email.toLowerCase().includes(email.toLowerCase())) {
        return false
      }

      // 姓名過濾
      if (name && !student.name.includes(name)) {
        return false
      }

      // 狀態過濾
      if (status !== 'ALL' && student.status !== status) {
        return false
      }

      return true
    })

    // 分頁處理
    const total = filteredStudents.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredStudents.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    }
  }
}

