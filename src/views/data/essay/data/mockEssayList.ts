// 作文介面定義
export interface EssayItem {
  id: string // LT_WR_0000001, LT_WR_0000002, ...
  name: string // 作文名稱
  author: string // 作文擁有者
  aiScore: number // AI批閱分數
  teacherScore: number | null // 教師批閱分數 (可能為空)
}

// 搜尋參數介面
export interface EssaySearchParams {
  id?: string
  name?: string
  author?: string
  aiScore?: number
  teacherScore?: number
  page?: number
  pageSize?: number
}

// API 回應介面
export interface EssayListResponse {
  data: EssayItem[]
  total: number
  page: number
  pageSize: number
}

// 作文列表 mock 資料
export const mockEssayList: EssayItem[] = [
  { id: 'LT_WR_0000001', name: 'My Dream Job', author: '王小明', aiScore: 85, teacherScore: 88 },
  { id: 'LT_WR_0000002', name: 'Environmental Protection', author: '李美華', aiScore: 92, teacherScore: 90 },
  { id: 'LT_WR_0000003', name: 'The Importance of Education', author: '張志強', aiScore: 78, teacherScore: null },
  { id: 'LT_WR_0000004', name: 'Technology and Society', author: '陳雅婷', aiScore: 88, teacherScore: 85 },
  { id: 'LT_WR_0000005', name: 'My Favorite Season', author: '林建宏', aiScore: 75, teacherScore: 80 },
  { id: 'LT_WR_0000006', name: 'The Benefits of Reading', author: '黃淑芬', aiScore: 90, teacherScore: 92 },
  { id: 'LT_WR_0000007', name: 'Social Media Impact', author: '吳俊傑', aiScore: 82, teacherScore: null },
  { id: 'LT_WR_0000008', name: 'Climate Change Solutions', author: '劉佳慧', aiScore: 94, teacherScore: 95 },
  { id: 'LT_WR_0000009', name: 'The Role of Sports', author: '蔡明德', aiScore: 76, teacherScore: 78 },
  { id: 'LT_WR_0000010', name: 'Cultural Diversity', author: '鄭雅玲', aiScore: 87, teacherScore: 89 },
  { id: 'LT_WR_0000011', name: 'Future Transportation', author: '許志豪', aiScore: 83, teacherScore: null },
  { id: 'LT_WR_0000012', name: 'Healthy Lifestyle', author: '謝美玲', aiScore: 79, teacherScore: 82 },
  { id: 'LT_WR_0000013', name: 'The Power of Friendship', author: '周建成', aiScore: 91, teacherScore: 88 },
  { id: 'LT_WR_0000014', name: 'Online Learning Experience', author: '楊雅雯', aiScore: 86, teacherScore: 87 },
  { id: 'LT_WR_0000015', name: 'Travel and Adventure', author: '何志明', aiScore: 74, teacherScore: null },
  { id: 'LT_WR_0000016', name: 'Artificial Intelligence', author: '潘淑華', aiScore: 93, teacherScore: 91 },
  { id: 'LT_WR_0000017', name: 'Family Values', author: '馬建華', aiScore: 81, teacherScore: 84 },
  { id: 'LT_WR_0000018', name: 'Renewable Energy', author: '孫美惠', aiScore: 89, teacherScore: 90 },
  { id: 'LT_WR_0000019', name: 'The Art of Communication', author: '高志偉', aiScore: 77, teacherScore: null },
  { id: 'LT_WR_0000020', name: 'Global Citizenship', author: '羅雅芳', aiScore: 95, teacherScore: 96 }
]

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const essayApi = {
  async getEssayList(params: EssaySearchParams = {}): Promise<EssayListResponse> {
    await delay(600)

    const {
      id,
      name = '',
      author = '',
      aiScore,
      teacherScore,
      page = 1,
      pageSize = 10
    } = params

    // 過濾資料
    let filteredEssays = mockEssayList.filter((essay) => {
      // 作文ID過濾
      if (id && !essay.id.toLowerCase().includes(id.toLowerCase())) {
        return false
      }

      // 作文名稱過濾
      if (name && !essay.name.toLowerCase().includes(name.toLowerCase())) {
        return false
      }

      // 作文擁有者過濾
      if (author && !essay.author.toLowerCase().includes(author.toLowerCase())) {
        return false
      }

      // AI分數過濾
      if (aiScore && essay.aiScore !== aiScore) {
        return false
      }

      // 教師分數過濾
      if (teacherScore && essay.teacherScore !== teacherScore) {
        return false
      }

      return true
    })

    // 分頁處理
    const total = filteredEssays.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredEssays.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    }
  }
}

