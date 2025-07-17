// 訂閱方案詳細資料介面
export interface SubDetail {
  id: number // 訂閱方案ID
  name: string // 方案名稱
  imageUrl: string // 方案圖片URL
  message: string // 方案詳細描述
  amount: number // 價格
  period: number // 訂閱期間（月數）
  stripeUrl: string // Stripe 付款連結
  createdAt: string // 建立時間
  createdBy: string // 建立人員
  updatedAt: string // 最近修改時間
  updatedBy: string // 更新修改人員
  status: 'enabled' | 'disabled' // 方案狀態
}

// 訂閱方案詳細資料 mock 資料
export const mockSubDetails: Record<number, SubDetail> = {
  1: {
    id: 1,
    name: '基礎方案',
    imageUrl: '/images/subscription/basic-plan.jpg',
    message: '適合初學者的基本寫作練習功能，包含基礎語法檢查、簡單批改建議、每月10篇文章批改額度。讓您輕鬆開始寫作學習之旅。',
    amount: 299,
    period: 1,
    stripeUrl: 'https://buy.stripe.com/basic-plan-monthly',
    createdAt: '2024-01-01T10:00:00',
    createdBy: '產品經理',
    updatedAt: '2024-01-15T14:30:00',
    updatedBy: '產品經理',
    status: 'enabled'
  },

  2: {
    id: 2,
    name: '標準方案',
    imageUrl: '/images/subscription/standard-plan.jpg',
    message: '包含進階批改功能和個人化建議，提供詳細的寫作分析報告、語法優化建議、文章結構指導，每月30篇文章批改額度。適合有一定基礎的學習者。',
    amount: 799,
    period: 3,
    stripeUrl: 'https://buy.stripe.com/standard-plan-quarterly',
    createdAt: '2024-01-01T10:15:00',
    createdBy: '產品經理',
    updatedAt: '2024-01-20T09:45:00',
    updatedBy: '產品經理',
    status: 'enabled'
  },

  3: {
    id: 3,
    name: '專業方案',
    imageUrl: '/images/subscription/professional-plan.jpg',
    message: '完整功能包含專業寫作指導和無限練習，提供AI智能批改、專業寫作模板、無限文章批改、個人學習報告、優先客服支援。最受歡迎的方案選擇。',
    amount: 1499,
    period: 6,
    stripeUrl: 'https://buy.stripe.com/professional-plan-semiannual',
    createdAt: '2024-01-01T10:30:00',
    createdBy: '產品經理',
    updatedAt: '2024-01-25T16:20:00',
    updatedBy: '產品經理',
    status: 'enabled'
  },

  4: {
    id: 4,
    name: '年度方案',
    imageUrl: '/images/subscription/annual-plan.jpg',
    message: '最優惠的年度訂閱，享受全功能服務。包含所有專業功能、獨家學習資源、年度學習報告、專屬客服、新功能搶先體驗權。最划算的長期學習投資。',
    amount: 2999,
    period: 12,
    stripeUrl: 'https://buy.stripe.com/annual-plan-yearly',
    createdAt: '2024-01-01T10:45:00',
    createdBy: '產品經理',
    updatedAt: '2024-01-30T11:10:00',
    updatedBy: '產品經理',
    status: 'enabled'
  },

  5: {
    id: 5,
    name: '學生方案',
    imageUrl: '/images/subscription/student-plan.jpg',
    message: '專為學生設計的優惠方案，需要學生證驗證。包含基礎到進階功能、學術寫作模板、論文批改指導、每月20篇文章額度。幫助學生提升學術寫作能力。',
    amount: 199,
    period: 1,
    stripeUrl: 'https://buy.stripe.com/student-plan-monthly',
    createdAt: '2024-01-01T11:00:00',
    createdBy: '教育部門',
    updatedAt: '2024-02-01T13:25:00',
    updatedBy: '教育部門',
    status: 'enabled'
  },

  6: {
    id: 6,
    name: '教師方案',
    imageUrl: '/images/subscription/teacher-plan.jpg',
    message: '教師專用方案，包含班級管理功能。可管理多個學生帳號、批量批改作業、生成班級學習報告、教學資源庫存取。讓教學更有效率。',
    amount: 999,
    period: 3,
    stripeUrl: 'https://buy.stripe.com/teacher-plan-quarterly',
    createdAt: '2024-01-01T11:15:00',
    createdBy: '教育部門',
    updatedAt: '2024-02-05T15:40:00',
    updatedBy: '教育部門',
    status: 'enabled'
  },

  7: {
    id: 7,
    name: '企業基礎',
    imageUrl: '/images/subscription/enterprise-basic.jpg',
    message: '適合小型企業的團隊寫作訓練方案。支援10-50人團隊、商務寫作模板、團隊管理介面、使用統計報告。提升團隊整體寫作水準。',
    amount: 4999,
    period: 6,
    stripeUrl: 'https://buy.stripe.com/enterprise-basic-semiannual',
    createdAt: '2024-01-01T11:30:00',
    createdBy: '企業業務',
    updatedAt: '2024-02-10T10:15:00',
    updatedBy: '企業業務',
    status: 'enabled'
  },

  8: {
    id: 8,
    name: '企業進階',
    imageUrl: '/images/subscription/enterprise-advanced.jpg',
    message: '大型企業專用方案，支援多部門管理。無限用戶數、客製化功能、專屬客服、API整合、詳細分析報告、培訓服務。企業級寫作解決方案。',
    amount: 9999,
    period: 12,
    stripeUrl: 'https://buy.stripe.com/enterprise-advanced-yearly',
    createdAt: '2024-01-01T11:45:00',
    createdBy: '企業業務',
    updatedAt: '2024-02-15T14:50:00',
    updatedBy: '企業業務',
    status: 'enabled'
  },

  9: {
    id: 9,
    name: '試用方案',
    imageUrl: '/images/subscription/trial-plan.jpg',
    message: '7天免費試用方案，體驗完整功能。包含所有基礎功能、5篇文章批改額度、完整功能體驗。讓您在購買前充分了解我們的服務品質。',
    amount: 0,
    period: 1,
    stripeUrl: 'https://buy.stripe.com/trial-plan-free',
    createdAt: '2024-01-01T12:00:00',
    createdBy: '行銷部門',
    updatedAt: '2024-01-10T16:30:00',
    updatedBy: '行銷部門',
    status: 'disabled'
  },

  10: {
    id: 10,
    name: '季度方案',
    imageUrl: '/images/subscription/quarterly-plan.jpg',
    message: '三個月短期訂閱方案，靈活選擇學習週期。包含標準功能、每月25篇文章額度、季度學習報告。適合短期集中學習需求。',
    amount: 699,
    period: 3,
    stripeUrl: 'https://buy.stripe.com/quarterly-plan',
    createdAt: '2024-01-01T12:15:00',
    createdBy: '產品經理',
    updatedAt: '2024-02-20T12:45:00',
    updatedBy: '產品經理',
    status: 'enabled'
  }
}

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const subDetailApi = {
  async getSubDetail(id: number): Promise<SubDetail> {
    await delay(800)
    const subDetail = mockSubDetails[id]
    if (!subDetail) {
      throw new Error(`Subscription detail with id ${id} not found`)
    }
    return { ...subDetail }
  },

  async updateSubDetail(subData: SubDetail): Promise<SubDetail> {
    await delay(1000)
    const updatedSub = {
      ...subData,
      updatedAt: new Date().toISOString(),
      updatedBy: '當前用戶'
    }
    mockSubDetails[subData.id] = updatedSub
    return { ...updatedSub }
  }
}

