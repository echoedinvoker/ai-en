// 基礎權限操作類型
interface BasePermission {
  view?: boolean;    // 查詢
  add?: boolean;     // 新增
  edit?: boolean;    // 編輯
  delete?: boolean;  // 刪除
  import?: boolean;  // 匯入
  export?: boolean;  // 匯出
  content?: boolean; // 內容權限
}

// 簡單布林權限類型
type SimplePermission = boolean;

// 複合權限類型 - 可以是簡單的 boolean 或完整的操作權限
type Permission = SimplePermission | BasePermission;

// 會員帳號管理權限
interface MemberManagement {
  teacherMember: BasePermission;    // 教師會員 - 有查詢、新增、編輯
  studentMember: BasePermission;    // 學生會員 - 有查詢、新增、編輯
  adminMember: BasePermission;      // 管理人員 - 有查詢、新增、編輯
  groupInfo: BasePermission;        // 群組權限 - 有查詢、新增、編輯
}

// 資料管理權限
interface DataManagement {
  questionBank: BasePermission & {   // 題庫管理 - 有查詢、新增、編輯、內容、匯入
    content: boolean;
    import: boolean;
  };
  nearbyManagement: BasePermission & { // 班級管理 - 有查詢、新增、編輯、內容
    content: boolean;
  };
  examManagement: BasePermission & {   // 試題管理 - 有查詢、新增、編輯
    content: boolean;
  };
  documentManagement: BasePermission & { // 作文管理 - 有查詢、新增、編輯、內容
    content: boolean;
  };
}

// 後台設定權限
interface BackendSettings {
  recommendationSystem: BasePermission & { // 推薦系統 - 有查詢、新增、編輯
    content: boolean;
  };
  systemAnnouncement: BasePermission & {   // 系統公告 - 有查詢、新增、編輯
    content: boolean;
  };
  subscriptionSettings: BasePermission & { // 訂閱設定 - 有查詢、新增、編輯
    content: boolean;
  };
}

// 平台數據權限
interface PlatformData {
  dataTemplate: SimplePermission;           // 數據模板 - 單純 true/false
  functionPageSettings: SimplePermission;   // 功能頁面設定 - 單純 true/false
}

// 完整權限結構
export interface RolePermissions {
  memberManagement: MemberManagement;    // 會員帳號管理
  dataManagement: DataManagement;        // 資料管理
  backendSettings: BackendSettings;      // 後台設定
  platformData: PlatformData;            // 平台數據

  // 添加索引簽名以支援動態字串索引存取
  [key: string]: any;
}

export interface PermissionForm {
  id: number
  role: string
  content: RolePermissions
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
  status: 'active' | 'suspended' | 'reserved'
}

export const mockPermissionDetails: Record<number, PermissionForm> = {
  1: {
    id: 1,
    role: '最高管理者',
    content: {
      memberManagement: {
        teacherMember: { view: true, add: true, edit: true, delete: true },
        studentMember: { view: true, add: true, edit: true, delete: true },
        adminMember: { view: true, add: true, edit: true, delete: true },
        groupInfo: { view: true, add: true, edit: true, delete: true }
      },
      dataManagement: {
        questionBank: { view: true, add: true, edit: true, delete: true, content: true, import: true },
        nearbyManagement: { view: true, add: true, edit: true, delete: true, content: true },
        examManagement: { view: true, add: true, edit: true, delete: true, content: true },
        documentManagement: { view: true, add: true, edit: true, delete: true, content: true }
      },
      backendSettings: {
        recommendationSystem: { view: true, add: true, edit: true, delete: true, content: true },
        systemAnnouncement: { view: true, add: true, edit: true, delete: true, content: true },
        subscriptionSettings: { view: true, add: true, edit: true, delete: true, content: true }
      },
      platformData: {
        dataTemplate: true,
        functionPageSettings: true
      }
    },
    createdAt: '2024-01-01T09:00:00',
    createdBy: '系統',
    updatedAt: '2024-01-15T14:30:00',
    updatedBy: '超級管理員',
    status: 'active'
  },
  2: {
    id: 2,
    role: '企劃人員',
    content: {
      memberManagement: {
        teacherMember: { view: true, add: false, edit: true, delete: false },
        studentMember: { view: true, add: true, edit: true, delete: false },
        adminMember: { view: false, add: false, edit: false, delete: false },
        groupInfo: { view: true, add: false, edit: false, delete: false }
      },
      dataManagement: {
        questionBank: { view: true, add: true, edit: true, delete: false, content: true, import: true },
        nearbyManagement: { view: true, add: true, edit: true, delete: false, content: true },
        examManagement: { view: true, add: true, edit: true, delete: false, content: true },
        documentManagement: { view: true, add: true, edit: true, delete: false, content: true }
      },
      backendSettings: {
        recommendationSystem: { view: true, add: false, edit: true, delete: false, content: false },
        systemAnnouncement: { view: true, add: true, edit: true, delete: false, content: true },
        subscriptionSettings: { view: false, add: false, edit: false, delete: false, content: false }
      },
      platformData: {
        dataTemplate: true,
        functionPageSettings: false
      }
    },
    createdAt: '2024-01-05T10:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-02-10T16:20:00',
    updatedBy: '系統管理員',
    status: 'active'
  },
  3: {
    id: 3,
    role: '客服人員',
    content: {
      memberManagement: {
        teacherMember: { view: true, add: false, edit: false, delete: false },
        studentMember: { view: true, add: false, edit: true, delete: false },
        adminMember: { view: false, add: false, edit: false, delete: false },
        groupInfo: { view: false, add: false, edit: false, delete: false }
      },
      dataManagement: {
        questionBank: { view: true, add: false, edit: false, delete: false, content: false, import: false },
        nearbyManagement: { view: true, add: false, edit: false, delete: false, content: false },
        examManagement: { view: true, add: false, edit: false, delete: false, content: false },
        documentManagement: { view: true, add: false, edit: false, delete: false, content: false }
      },
      backendSettings: {
        recommendationSystem: { view: false, add: false, edit: false, delete: false, content: false },
        systemAnnouncement: { view: true, add: false, edit: false, delete: false, content: false },
        subscriptionSettings: { view: false, add: false, edit: false, delete: false, content: false }
      },
      platformData: {
        dataTemplate: false,
        functionPageSettings: false
      }
    },
    createdAt: '2024-01-10T11:00:00',
    createdBy: '系統管理員',
    updatedAt: '2024-03-15T09:45:00',
    updatedBy: '企劃主管',
    status: 'active'
  },
  4: {
    id: 4,
    role: '訪客',
    content: {
      memberManagement: {
        teacherMember: { view: false, add: false, edit: false, delete: false },
        studentMember: { view: false, add: false, edit: false, delete: false },
        adminMember: { view: false, add: false, edit: false, delete: false },
        groupInfo: { view: false, add: false, edit: false, delete: false }
      },
      dataManagement: {
        questionBank: { view: false, add: false, edit: false, delete: false, content: false, import: false },
        nearbyManagement: { view: false, add: false, edit: false, delete: false, content: false },
        examManagement: { view: false, add: false, edit: false, delete: false, content: false },
        documentManagement: { view: false, add: false, edit: false, delete: false, content: false }
      },
      backendSettings: {
        recommendationSystem: { view: false, add: false, edit: false, delete: false, content: false },
        systemAnnouncement: { view: false, add: false, edit: false, delete: false, content: false },
        subscriptionSettings: { view: false, add: false, edit: false, delete: false, content: false }
      },
      platformData: {
        dataTemplate: false,
        functionPageSettings: false
      }
    },
    createdAt: '2024-02-01T08:30:00',
    createdBy: '系統管理員',
    updatedAt: '2024-04-20T15:10:00',
    updatedBy: '系統管理員',
    status: 'suspended'
  },
  5: {
    id: 5,
    role: '訪客2',
    content: {
      memberManagement: {
        teacherMember: { view: true, add: false, edit: false, delete: false },
        studentMember: { view: true, add: false, edit: false, delete: false },
        adminMember: { view: false, add: false, edit: false, delete: false },
        groupInfo: { view: false, add: false, edit: false, delete: false }
      },
      dataManagement: {
        questionBank: { view: true, add: false, edit: false, delete: false, content: false, import: false },
        nearbyManagement: { view: false, add: false, edit: false, delete: false, content: false },
        examManagement: { view: false, add: false, edit: false, delete: false, content: false },
        documentManagement: { view: false, add: false, edit: false, delete: false, content: false }
      },
      backendSettings: {
        recommendationSystem: { view: false, add: false, edit: false, delete: false, content: false },
        systemAnnouncement: { view: true, add: false, edit: false, delete: false, content: false },
        subscriptionSettings: { view: false, add: false, edit: false, delete: false, content: false }
      },
      platformData: {
        dataTemplate: false,
        functionPageSettings: false
      }
    },
    createdAt: '2024-02-15T13:20:00',
    createdBy: '企劃主管',
    updatedAt: '2024-05-05T10:30:00',
    updatedBy: '企劃主管',
    status: 'reserved'
  }
}

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const permissionDetailApi = {
  async getPermission(id: number): Promise<PermissionForm> {
    await delay(800)
    const permission = mockPermissionDetails[id]
    if (!permission) {
      throw new Error(`Permission with id ${id} not found`)
    }
    return { ...permission }
  },

  async updatePermission(permissionData: PermissionForm): Promise<PermissionForm> {
    await delay(1000)
    const updatedPermission = {
      ...permissionData,
      updatedAt: new Date().toISOString(),
      updatedBy: '當前用戶'
    }
    mockPermissionDetails[permissionData.id] = updatedPermission
    return { ...updatedPermission }
  }
}

