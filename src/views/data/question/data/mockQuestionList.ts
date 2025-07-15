// 題庫介面定義
export interface QuestionBankItem {
  id: number
  name: string
  source: string
  status: 'published' | 'unpublished' | 'archived'
}

// 搜尋參數介面
export interface QuestionBankSearchParams {
  id?: number
  name?: string
  source?: string
  status?: string
  page?: number
  pageSize?: number
}

// API 回應介面
export interface QuestionBankListResponse {
  data: QuestionBankItem[]
  total: number
  page: number
  pageSize: number
}

// 題庫列表 mock 資料
export const mockQuestionBankList: QuestionBankItem[] = [
  { id: 1, name: '國中英語基礎文法', source: '康軒出版社', status: 'published' },
  { id: 2, name: '高中英語聽力測驗', source: '翰林出版社', status: 'published' },
  { id: 3, name: '多益模擬試題', source: 'ETS官方', status: 'published' },
  { id: 4, name: '雅思閱讀練習', source: '劍橋大學出版社', status: 'unpublished' },
  { id: 5, name: '托福寫作題庫', source: 'ETS官方', status: 'published' },
  { id: 6, name: '全民英檢初級', source: '語言訓練測驗中心', status: 'published' },
  { id: 7, name: '商用英語會話', source: '商務印書館', status: 'archived' },
  { id: 8, name: '英語單字3000', source: '三民書局', status: 'published' },
  { id: 9, name: '國小英語啟蒙', source: '南一書局', status: 'unpublished' },
  { id: 10, name: '學測英語模擬題', source: '龍騰文化', status: 'published' },
  { id: 11, name: '指考英語歷屆試題', source: '大考中心', status: 'published' },
  { id: 12, name: '英語片語大全', source: '東華書局', status: 'published' },
  { id: 13, name: '新制多益聽力', source: 'ETS官方', status: 'unpublished' },
  { id: 14, name: '雅思口說練習', source: '劍橋大學出版社', status: 'published' },
  { id: 15, name: '托福閱讀技巧', source: 'ETS官方', status: 'archived' },
  { id: 16, name: '全民英檢中級', source: '語言訓練測驗中心', status: 'published' },
  { id: 17, name: '商業英文書信', source: '商務印書館', status: 'published' },
  { id: 18, name: '英語文法進階', source: '康軒出版社', status: 'unpublished' },
  { id: 19, name: '國中會考英語', source: '翰林出版社', status: 'published' },
  { id: 20, name: '英語聽力訓練', source: '三民書局', status: 'published' }
]

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const questionBankApi = {
  async getQuestionBankList(params: QuestionBankSearchParams = {}): Promise<QuestionBankListResponse> {
    await delay(600)

    const {
      id,  // 新增 id 參數解構
      name = '',
      source = '',
      status = 'ALL',
      page = 1,
      pageSize = 10
    } = params

    // 過濾資料
    let filteredQuestionBanks = mockQuestionBankList.filter((bank) => {
      // 題庫ID過濾 - 新增此邏輯
      if (id && bank.id !== id) {
        return false
      }

      // 題庫名稱過濾
      if (name && !bank.name.toLowerCase().includes(name.toLowerCase())) {
        return false
      }

      // 出處過濾
      if (source && !bank.source.toLowerCase().includes(source.toLowerCase())) {
        return false
      }

      // 狀態過濾
      if (status !== 'ALL' && bank.status !== status) {
        return false
      }

      return true
    })

    // 分頁處理
    const total = filteredQuestionBanks.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredQuestionBanks.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    }
  }
}
