// 推播週期介面定義
export interface PushPeriod {
  week: {
    [key: string]: boolean; // 添加索引簽名
    mon: boolean
    tue: boolean
    wed: boolean
    thu: boolean
    fri: boolean
    sat: boolean
    sun: boolean
  }
  time: {
    [key: string]: boolean; // 添加索引簽名
    everyday: boolean
    everyThreeDays: boolean
    everyFiveDays: boolean
    everyWeek: boolean
    everyTenDays: boolean
    everyMonth: boolean
  }
}

// 推播詳細資料介面
export interface PushDetail {
  id: number // 推播ID
  name: string // 推播名稱
  message: string // 推播訊息內容
  image: string // 推播圖片
  publishTime: string // 發布時間
  target: 'ALL' | '僅學生' | '僅教師' // 目標族群
  period: PushPeriod // 推播週期
  createdAt: string // 建立時間
  createdBy: string // 建立人員
  updatedAt: string // 最近修改時間
  updatedBy: string // 更新修改人員
  status: 'enabled' | 'disabled' // 推播狀態
}

// 推播詳細資料 mock 資料
export const mockPushDetails: Record<number, PushDetail> = {
  1: {
    id: 1,
    name: '系統維護通知',
    message: '系統將於今晚 23:00-01:00 進行維護，期間服務可能中斷',
    image: '/images/push/system-maintenance.jpg',
    publishTime: '2024-01-15 14:30:00',
    target: 'ALL',
    period: {
      week: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false
      },
      time: {
        everyday: false,
        everyThreeDays: false,
        everyFiveDays: false,
        everyWeek: true,
        everyTenDays: false,
        everyMonth: false
      }
    },
    createdAt: '2024-01-10T09:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-01-15T14:30:00',
    updatedBy: '系統管理員',
    status: 'enabled'
  },

  2: {
    id: 2,
    name: '新功能上線',
    message: 'AI 作文批改功能已正式上線，歡迎體驗！',
    image: '/images/push/new-feature.jpg',
    publishTime: '2024-01-14 10:15:00',
    target: '僅學生',
    period: {
      week: {
        mon: true,
        tue: false,
        wed: true,
        thu: false,
        fri: true,
        sat: false,
        sun: false
      },
      time: {
        everyday: false,
        everyThreeDays: true,
        everyFiveDays: false,
        everyWeek: false,
        everyTenDays: false,
        everyMonth: false
      }
    },
    createdAt: '2024-01-12T08:30:00',
    createdBy: '產品經理',
    updatedAt: '2024-01-14T10:15:00',
    updatedBy: '產品經理',
    status: 'enabled'
  },

  3: {
    id: 3,
    name: '課程提醒',
    message: '您的英文寫作課程將於明天 15:00 開始',
    image: '/images/push/course-reminder.jpg',
    publishTime: '2024-01-13 16:45:00',
    target: '僅學生',
    period: {
      week: {
        mon: false,
        tue: true,
        wed: false,
        thu: true,
        fri: false,
        sat: false,
        sun: true
      },
      time: {
        everyday: true,
        everyThreeDays: false,
        everyFiveDays: false,
        everyWeek: false,
        everyTenDays: false,
        everyMonth: false
      }
    },
    createdAt: '2024-01-11T14:20:00',
    createdBy: '張老師',
    updatedAt: '2024-01-13T16:45:00',
    updatedBy: '張老師',
    status: 'disabled'
  }
}

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const pushDetailApi = {
  async getPushDetail(id: number): Promise<PushDetail> {
    await delay(800)
    const pushDetail = mockPushDetails[id]
    if (!pushDetail) {
      throw new Error(`Push detail with id ${id} not found`)
    }
    return { ...pushDetail }
  },

  async updatePushDetail(pushData: PushDetail): Promise<PushDetail> {
    await delay(1000)
    const updatedPush = {
      ...pushData,
      updatedAt: new Date().toISOString(),
      updatedBy: '當前用戶'
    }
    mockPushDetails[pushData.id] = updatedPush
    return { ...updatedPush }
  }
}

