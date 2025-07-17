// 訂閱方案介面定義
export interface SubItem {
  id: number // 訂閱方案ID
  name: string // 方案名稱
  message: string // 方案描述
  amount: number // 價格
  period: number // 訂閱期間（月數）
  status: 'enabled' | 'disabled' // 方案狀態
}

// 搜尋參數介面
export interface SubSearchParams {
  name?: string
  status?: 'enabled' | 'disabled' | 'ALL' // 狀態可以是 'enabled', 'disabled' 或 'ALL'
  page?: number
  pageSize?: number
}

// API 回應介面
export interface SubListResponse {
  data: SubItem[]
  total: number
  page: number
  pageSize: number
}

// 訂閱方案列表 mock 資料
export const mockSubList: SubItem[] = [
  { id: 1, name: '基礎方案', message: '適合初學者的基本寫作練習功能', amount: 299, period: 1, status: 'enabled' },
  { id: 2, name: '標準方案', message: '包含進階批改功能和個人化建議', amount: 799, period: 3, status: 'enabled' },
  { id: 3, name: '專業方案', message: '完整功能包含專業寫作指導和無限練習', amount: 1499, period: 6, status: 'enabled' },
  { id: 4, name: '年度方案', message: '最優惠的年度訂閱，享受全功能服務', amount: 2999, period: 12, status: 'enabled' },
  { id: 5, name: '學生方案', message: '專為學生設計的優惠方案', amount: 199, period: 1, status: 'enabled' },
  { id: 6, name: '教師方案', message: '教師專用，包含班級管理功能', amount: 999, period: 3, status: 'enabled' },
  { id: 7, name: '企業基礎', message: '適合小型企業的團隊寫作訓練', amount: 4999, period: 6, status: 'enabled' },
  { id: 8, name: '企業進階', message: '大型企業專用，支援多部門管理', amount: 9999, period: 12, status: 'enabled' },
  { id: 9, name: '試用方案', message: '7天免費試用，體驗完整功能', amount: 0, period: 1, status: 'disabled' },
  { id: 10, name: '季度方案', message: '三個月短期訂閱，靈活選擇', amount: 699, period: 3, status: 'enabled' },
  { id: 11, name: '半年方案', message: '六個月中期訂閱，平衡價格與時長', amount: 1299, period: 6, status: 'enabled' },
  { id: 12, name: 'VIP方案', message: '頂級服務包含一對一指導', amount: 3999, period: 6, status: 'enabled' },
  { id: 13, name: '家庭方案', message: '適合家庭成員共同使用', amount: 1199, period: 6, status: 'enabled' },
  { id: 14, name: '暑期特惠', message: '暑假期間限定優惠方案', amount: 599, period: 2, status: 'disabled' },
  { id: 15, name: '新手入門', message: '專為寫作新手設計的入門方案', amount: 399, period: 2, status: 'enabled' }
]

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const subApi = {
  async getSubList(params: SubSearchParams = {}): Promise<SubListResponse> {
    await delay(600)

    const {
      name = '',
      status,
      page = 1,
      pageSize = 10
    } = params

    // 過濾資料
    let filteredSubs = mockSubList.filter((sub) => {
      // 方案名稱過濾
      if (name && !sub.name.toLowerCase().includes(name.toLowerCase())) {
        return false
      }

      // 狀態過濾
      if (status && status !== 'ALL' && sub.status !== status) {
        return false
      }

      return true
    })

    // 分頁處理
    const total = filteredSubs.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredSubs.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    }
  }
}

