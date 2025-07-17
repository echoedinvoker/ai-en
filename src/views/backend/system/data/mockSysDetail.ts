// 系統公告詳細資料介面
export interface SysDetail {
  id: number // 系統公告ID
  name: string // 公告名稱
  message: string // 公告訊息內容
  upTime: string // 上架時間
  downTime: string // 下架時間
  imageUrl: string // 公告圖片URL
  appearTiming: 'once' | 'everyLogin' // 顯示時機
  appearLocation: 'home' | 'everyPage' // 顯示位置
  createdAt: string // 建立時間
  createdBy: string // 建立人員
  updatedAt: string // 最近修改時間
  updatedBy: string // 更新修改人員
  status: 'enable' | 'disable' // 公告狀態
}

// 系統公告詳細資料 mock 資料
export const mockSysDetails: Record<number, SysDetail> = {
  1: {
    id: 1,
    name: '平台升級公告',
    message: '系統將於本週末進行重大升級，新增多項實用功能，包括智能寫作助手、語法檢查優化、個人化學習建議等。升級期間可能會有短暫服務中斷，造成不便敬請見諒。',
    upTime: '2024-01-15 09:00:00',
    downTime: '2024-02-15 23:59:59',
    imageUrl: '/images/system/platform-upgrade.jpg',
    appearTiming: 'everyLogin',
    appearLocation: 'home',
    createdAt: '2024-01-10T08:30:00',
    createdBy: '系統管理員',
    updatedAt: '2024-01-15T09:00:00',
    updatedBy: '系統管理員',
    status: 'enable'
  },

  2: {
    id: 2,
    name: '服務條款更新',
    message: '為了提供更好的服務品質並保障用戶權益，我們更新了用戶服務條款。主要變更包括資料使用政策、服務範圍說明、用戶責任條款等。請您抽空詳閱相關內容。',
    upTime: '2024-01-14 08:30:00',
    downTime: '2024-03-14 23:59:59',
    imageUrl: '/images/system/terms-update.jpg',
    appearTiming: 'once',
    appearLocation: 'everyPage',
    createdAt: '2024-01-12T10:15:00',
    createdBy: '法務部門',
    updatedAt: '2024-01-14T08:30:00',
    updatedBy: '法務部門',
    status: 'enable'
  },

  3: {
    id: 3,
    name: '隱私政策調整',
    message: '基於最新的資料保護法規要求，我們調整了隱私政策內容。新政策更明確說明個人資料的收集、使用、儲存方式，並強化用戶對個人資料的控制權。',
    upTime: '2024-01-13 10:15:00',
    downTime: '2024-02-13 23:59:59',
    imageUrl: '/images/system/privacy-policy.jpg',
    appearTiming: 'once',
    appearLocation: 'home',
    createdAt: '2024-01-11T14:20:00',
    createdBy: '資安部門',
    updatedAt: '2024-01-13T10:15:00',
    updatedBy: '資安部門',
    status: 'disable'
  },

  4: {
    id: 4,
    name: '新年活動開跑',
    message: '🎉 新年特別活動正式開始！參與每日寫作挑戰，完成指定任務即可獲得豐富獎品。活動期間還有限時優惠課程、專屬學習資源等驚喜等您發現！',
    upTime: '2024-01-12 00:00:00',
    downTime: '2024-02-29 23:59:59',
    imageUrl: '/images/system/new-year-event.jpg',
    appearTiming: 'everyLogin',
    appearLocation: 'everyPage',
    createdAt: '2024-01-10T16:45:00',
    createdBy: '活動企劃',
    updatedAt: '2024-01-12T00:00:00',
    updatedBy: '活動企劃',
    status: 'enable'
  },

  5: {
    id: 5,
    name: '客服時間調整',
    message: '因應春節假期安排，客服服務時間將調整為每日 09:00-17:00。如有緊急問題，請透過線上客服系統留言，我們會盡快回覆。感謝您的理解與配合。',
    upTime: '2024-01-11 14:20:00',
    downTime: '2024-02-20 23:59:59',
    imageUrl: '/images/system/customer-service.jpg',
    appearTiming: 'once',
    appearLocation: 'home',
    createdAt: '2024-01-09T11:30:00',
    createdBy: '客服主管',
    updatedAt: '2024-01-11T14:20:00',
    updatedBy: '客服主管',
    status: 'enable'
  }
}

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const sysDetailApi = {
  async getSysDetail(id: number): Promise<SysDetail> {
    await delay(800)
    const sysDetail = mockSysDetails[id]
    if (!sysDetail) {
      throw new Error(`System detail with id ${id} not found`)
    }
    return { ...sysDetail }
  },

  async updateSysDetail(sysData: SysDetail): Promise<SysDetail> {
    await delay(1000)
    const updatedSys = {
      ...sysData,
      updatedAt: new Date().toISOString(),
      updatedBy: '當前用戶'
    }
    mockSysDetails[sysData.id] = updatedSys
    return { ...updatedSys }
  }
}

