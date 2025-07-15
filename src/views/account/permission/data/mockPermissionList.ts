export interface PermissionListItem {
  id: number
  role: string
  name: string
  number: number
  status: 'active' | 'suspended' | 'reserved'
}

// 搜尋參數介面
export interface PermissionSearchParams {
  role?: string
  status?: string
  page?: number
  pageSize?: number
}

// API 回應介面
export interface PermissionListResponse {
  data: PermissionListItem[]
  total: number
  page: number
  pageSize: number
}

// 權限群組列表 mock 資料 (5筆)
export const mockPermissionList: PermissionListItem[] = [
  { id: 1, role: '最高管理者', name: 'ooxx', number: 2, status: 'active' },
  { id: 2, role: '企劃人員', name: 'ooxx', number: 5, status: 'active' },
  { id: 3, role: '客服人員', name: 'ooxx', number: 8, status: 'active' },
  { id: 4, role: '訪客', name: 'ooxx', number: 15, status: 'suspended' },
  { id: 5, role: '訪客2', name: 'ooxx', number: 3, status: 'reserved' }
]

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const permissionApi = {
  // 獲取權限群組列表
  async getPermissionList(params: PermissionSearchParams = {}): Promise<PermissionListResponse> {
    await delay(600) // 模擬網路延遲

    const {
      role = '',
      status = 'ALL',
      page = 1,
      pageSize = 10
    } = params

    // 過濾資料
    let filteredPermissions = mockPermissionList.filter((permission) => {
      // 群組名稱過濾
      if (role && !permission.role.includes(role)) {
        return false
      }

      // 狀態過濾
      if (status !== 'ALL' && permission.status !== status) {
        return false
      }

      return true
    })

    // 分頁處理
    const total = filteredPermissions.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = filteredPermissions.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      total,
      page,
      pageSize
    }
  }
}

