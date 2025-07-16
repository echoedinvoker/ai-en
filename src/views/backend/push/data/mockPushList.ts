// 推播介面定義
export interface PushItem {
  id: number // 推播ID
  name: string // 推播名稱
  message: string // 推播訊息內容
  publishTime: string // 發布時間
  status: 'enabled' | 'disabled' // 推播狀態
}

// 搜尋參數介面
export interface PushSearchParams {
  name?: string
  status?: 'enabled' | 'disabled' | 'ALL' // 狀態可以是 'enabled', 'disabled' 或 'ALL'
  page?: number
  pageSize?: number
}

// API 回應介面
export interface PushListResponse {
  data: PushItem[]
  total: number
  page: number
  pageSize: number
}

// 推播列表 mock 資料
export const mockPushList: PushItem[] = [
  { id: 1, name: '系統維護通知', message: '系統將於今晚 23:00-01:00 進行維護，期間服務可能中斷', publishTime: '2024-01-15 14:30:00', status: 'enabled' },
  { id: 2, name: '新功能上線', message: 'AI 作文批改功能已正式上線，歡迎體驗！', publishTime: '2024-01-14 10:15:00', status: 'enabled' },
  { id: 3, name: '課程提醒', message: '您的英文寫作課程將於明天 15:00 開始', publishTime: '2024-01-13 16:45:00', status: 'disabled' },
  { id: 4, name: '成績公布', message: '本月作文成績已公布，請至個人中心查看', publishTime: '2024-01-12 09:20:00', status: 'enabled' },
  { id: 5, name: '活動通知', message: '英文寫作比賽報名開始，獎金豐厚！', publishTime: '2024-01-11 11:30:00', status: 'enabled' },
  { id: 6, name: '帳號安全', message: '檢測到異常登入，請確認帳號安全', publishTime: '2024-01-10 08:45:00', status: 'disabled' },
  { id: 7, name: '版本更新', message: 'App 已更新至 v2.1.0，修復多項問題', publishTime: '2024-01-09 13:15:00', status: 'enabled' },
  { id: 8, name: '學習提醒', message: '您已連續 7 天未練習寫作，快來挑戰新題目！', publishTime: '2024-01-08 17:00:00', status: 'enabled' },
  { id: 9, name: '節日祝福', message: '新年快樂！祝您學習進步，寫作能力更上一層樓', publishTime: '2024-01-01 00:00:00', status: 'disabled' },
  { id: 10, name: '教師回饋', message: '您的作文「My Dream Job」已收到教師詳細回饋', publishTime: '2023-12-28 14:20:00', status: 'enabled' },
  { id: 11, name: '社群功能', message: '作文分享社群功能即將上線，敬請期待', publishTime: '2023-12-25 10:30:00', status: 'enabled' },
  { id: 12, name: '技術支援', message: '如遇使用問題，請聯繫客服：support@ai-en.com', publishTime: '2023-12-20 15:45:00', status: 'disabled' },
  { id: 13, name: '學習統計', message: '本月您已完成 15 篇作文，表現優秀！', publishTime: '2023-12-15 12:10:00', status: 'enabled' },
  { id: 14, name: '題庫更新', message: '新增 50 道寫作題目，涵蓋多種主題', publishTime: '2023-12-10 09:25:00', status: 'enabled' },
  { id: 15, name: '會員優惠', message: '年度會員限時優惠，立即升級享受更多功能', publishTime: '2023-12-05 16:30:00', status: 'disabled' },
  { id: 16, name: '學習建議', message: '根據您的寫作習慣，建議加強語法練習', publishTime: '2023-12-01 11:15:00', status: 'enabled' },
  { id: 17, name: '排行榜', message: '恭喜您進入本週寫作排行榜前 10 名！', publishTime: '2023-11-28 18:40:00', status: 'enabled' },
  { id: 18, name: '作業提醒', message: '您有 3 篇作文作業尚未完成，請盡快提交', publishTime: '2023-11-25 13:55:00', status: 'disabled' },
  { id: 19, name: '語法檢查', message: 'AI 語法檢查功能已優化，準確率提升 20%', publishTime: '2023-11-20 10:05:00', status: 'enabled' },
  { id: 20, name: '學習計畫', message: '個人化學習計畫功能上線，制定專屬學習路徑', publishTime: '2023-11-15 14:50:00', status: 'enabled' }
]

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const pushApi = {
  async getPushList(params: PushSearchParams = {}): Promise<PushListResponse> {
    await delay(600)

    const {
      name = '',
      status,
      page = 1,
      pageSize = 10
    } = params

    // 過濾資料
    let filteredPushes = mockPushList.filter((push) => {

      // 推播名稱過濾
      if (name && !push.name.toLowerCase().includes(name.toLowerCase())) {
        return false
      }

      // 狀態過濾
      if (status && status !== 'ALL' && push.status !== status) {
        return false
      }

      return true
    })

    // 分頁處理
    const total = filteredPushes.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredPushes.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    }
  }
}

