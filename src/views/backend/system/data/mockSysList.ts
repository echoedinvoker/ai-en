// 系統公告介面定義
export interface SysItem {
  id: number // 系統公告ID
  name: string // 公告名稱
  message: string // 公告訊息內容
  upTime: string // 上架時間
  downTime: string // 下架時間
  status: 'enable' | 'disable' // 公告狀態
}

// 搜尋參數介面
export interface SysSearchParams {
  name?: string
  status?: 'enable' | 'disable' | 'ALL' // 狀態可以是 'enable', 'disable' 或 'ALL'
  page?: number
  pageSize?: number
}

// API 回應介面
export interface SysListResponse {
  data: SysItem[]
  total: number
  page: number
  pageSize: number
}

// 系統公告列表 mock 資料
export const mockSysList: SysItem[] = [
  { id: 1, name: '平台升級公告', message: '系統將於本週末進行重大升級，新增多項實用功能', upTime: '2024-01-15 09:00:00', downTime: '2024-02-15 23:59:59', status: 'enable' },
  { id: 2, name: '服務條款更新', message: '用戶服務條款已更新，請詳閱相關內容', upTime: '2024-01-14 08:30:00', downTime: '2024-03-14 23:59:59', status: 'enable' },
  { id: 3, name: '隱私政策調整', message: '為保護用戶隱私，我們調整了資料處理政策', upTime: '2024-01-13 10:15:00', downTime: '2024-02-13 23:59:59', status: 'disable' },
  { id: 4, name: '新年活動開跑', message: '新年特別活動正式開始，豐富獎品等您來拿！', upTime: '2024-01-12 00:00:00', downTime: '2024-02-29 23:59:59', status: 'enable' },
  { id: 5, name: '客服時間調整', message: '春節期間客服服務時間調整為 09:00-17:00', upTime: '2024-01-11 14:20:00', downTime: '2024-02-20 23:59:59', status: 'enable' },
  { id: 6, name: '安全性提升', message: '系統安全性全面提升，新增多重驗證機制', upTime: '2024-01-10 16:45:00', downTime: '2024-04-10 23:59:59', status: 'disable' },
  { id: 7, name: '功能優化通知', message: 'AI 批改引擎優化完成，準確度大幅提升', upTime: '2024-01-09 11:30:00', downTime: '2024-03-09 23:59:59', status: 'enable' },
  { id: 8, name: '會員制度改版', message: '會員等級制度全新改版，享受更多專屬權益', upTime: '2024-01-08 13:15:00', downTime: '2024-06-08 23:59:59', status: 'enable' },
  { id: 9, name: '資料備份提醒', message: '請定期備份重要學習資料，避免意外遺失', upTime: '2024-01-07 09:45:00', downTime: '2024-12-31 23:59:59', status: 'disable' },
  { id: 10, name: '教學影片上線', message: '全新教學影片系列上線，助您快速上手平台功能', upTime: '2024-01-06 15:20:00', downTime: '2024-05-06 23:59:59', status: 'enable' },
  { id: 11, name: '社群規範更新', message: '為維護良好學習環境，社群互動規範已更新', upTime: '2024-01-05 12:10:00', downTime: '2024-07-05 23:59:59', status: 'enable' },
  { id: 12, name: '行動版優化', message: '手機版介面全面優化，提供更佳使用體驗', upTime: '2024-01-04 17:30:00', downTime: '2024-04-04 23:59:59', status: 'disable' },
  { id: 13, name: '題庫擴充公告', message: '寫作題庫大幅擴充，新增各類型主題練習', upTime: '2024-01-03 10:25:00', downTime: '2024-06-03 23:59:59', status: 'enable' },
  { id: 14, name: '評分標準說明', message: 'AI 評分標準詳細說明已發布，幫助您了解評分機制', upTime: '2024-01-02 14:40:00', downTime: '2024-12-31 23:59:59', status: 'enable' },
  { id: 15, name: '學習統計功能', message: '個人學習統計功能上線，追蹤您的進步軌跡', upTime: '2024-01-01 08:00:00', downTime: '2024-12-31 23:59:59', status: 'disable' },
  { id: 16, name: '多語言支援', message: '平台新增多語言支援，服務更多國際用戶', upTime: '2023-12-31 16:15:00', downTime: '2024-06-30 23:59:59', status: 'enable' },
  { id: 17, name: '離線功能測試', message: '離線寫作功能開放測試，無網路也能持續學習', upTime: '2023-12-30 11:50:00', downTime: '2024-03-30 23:59:59', status: 'enable' },
  { id: 18, name: '協作功能預告', message: '師生協作功能即將上線，敬請期待', upTime: '2023-12-29 13:35:00', downTime: '2024-05-29 23:59:59', status: 'disable' },
  { id: 19, name: 'API 開放計畫', message: '開發者 API 開放計畫啟動，歡迎第三方整合', upTime: '2023-12-28 09:20:00', downTime: '2024-08-28 23:59:59', status: 'enable' },
  { id: 20, name: '年度回顧報告', message: '2023 年度平台使用回顧報告已發布', upTime: '2023-12-27 15:45:00', downTime: '2024-02-27 23:59:59', status: 'enable' }
]

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const sysApi = {
  async getSysList(params: SysSearchParams = {}): Promise<SysListResponse> {
    await delay(600)

    const {
      name = '',
      status,
      page = 1,
      pageSize = 10
    } = params

    // 過濾資料
    let filteredSys = mockSysList.filter((sys) => {

      // 公告名稱過濾
      if (name && !sys.name.toLowerCase().includes(name.toLowerCase())) {
        return false
      }

      // 狀態過濾
      if (status && status !== 'ALL' && sys.status !== status) {
        return false
      }

      return true
    })

    // 分頁處理
    const total = filteredSys.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredSys.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    }
  }
}

