import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { permissionDetailApi, type PermissionForm, type RolePermissions } from '../data/mockPermissionDetails'

// 定義權限項目的結構
interface PermissionItem {
  key: string
  label: string
  permissions: string[]
}

interface PermissionSection {
  key: string
  title: string
  items: PermissionItem[]
}

export function usePermission(permissionId?: string | number) {
  const route = useRoute()
  const router = useRouter()
  const queryClient = useQueryClient()

  // 權限樹結構配置
  const permissionTreeConfig: PermissionSection[] = [
    {
      key: 'memberManagement',
      title: '會員帳號管理',
      items: [
        {
          key: 'teacherMember',
          label: '教師會員',
          permissions: ['view', 'add', 'edit', 'delete']
        },
        {
          key: 'studentMember',
          label: '學生會員',
          permissions: ['view', 'add', 'edit', 'delete']
        },
        {
          key: 'adminMember',
          label: '管理人員',
          permissions: ['view', 'add', 'edit', 'delete']
        },
        {
          key: 'groupInfo',
          label: '群組權限',
          permissions: ['view', 'add', 'edit', 'delete']
        }
      ]
    },
    {
      key: 'dataManagement',
      title: '資料管理',
      items: [
        {
          key: 'questionBank',
          label: '題庫管理',
          permissions: ['view', 'add', 'edit', 'delete', 'content', 'import']
        },
        {
          key: 'nearbyManagement',
          label: '班級管理',
          permissions: ['view', 'add', 'edit', 'delete', 'content']
        },
        {
          key: 'examManagement',
          label: '試題管理',
          permissions: ['view', 'add', 'edit', 'delete', 'content']
        },
        {
          key: 'documentManagement',
          label: '作文管理',
          permissions: ['view', 'add', 'edit', 'delete', 'content']
        }
      ]
    },
    {
      key: 'backendSettings',
      title: '後台設定',
      items: [
        {
          key: 'recommendationSystem',
          label: '推薦系統',
          permissions: ['view', 'add', 'edit', 'delete', 'content']
        },
        {
          key: 'systemAnnouncement',
          label: '系統公告',
          permissions: ['view', 'add', 'edit', 'delete', 'content']
        },
        {
          key: 'subscriptionSettings',
          label: '訂閱設定',
          permissions: ['view', 'add', 'edit', 'delete', 'content']
        }
      ]
    },
    {
      key: 'platformData',
      title: '平台數據',
      items: [
        {
          key: 'dataTemplate',
          label: '數據模板',
          permissions: [] // 單一權限，無子權限
        },
        {
          key: 'functionPageSettings',
          label: '功能頁面設定',
          permissions: [] // 單一權限，無子權限
        }
      ]
    }
  ]

  // 權限標籤映射
  const permissionLabels: Record<string, string> = {
    view: '查詢',
    add: '新增',
    edit: '編輯',
    delete: '刪除',
    content: '內容',
    import: '匯入'
  }

  // 獲取權限群組 ID
  const id = computed(() => {
    const paramId = permissionId || route.params.id as string
    return parseInt(paramId.toString())
  })

  // 狀態選項
  const statusOptions = [
    { value: 'active', label: '啟用中' },
    { value: 'suspended', label: '停權中' },
    { value: 'reserved', label: '保留' }
  ]

  // 使用 useQuery 獲取權限群組資料
  const {
    data: permissionData,
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['permission-detail', id.value],
    queryFn: () => permissionDetailApi.getPermission(id.value),
    enabled: computed(() => id.value > 0),
    select: (data) => {
      console.log('獲取權限群組資料:', data)
      return data
    },
    staleTime: 5 * 60 * 1000,
  })

  // 使用 useMutation 處理更新
  const {
    mutate: savePermission,
    isPending: saving,
    error: saveError
  } = useMutation({
    mutationFn: permissionDetailApi.updatePermission,
    onSuccess: (updatedPermission) => {
      queryClient.setQueryData(['permission-detail', id.value], updatedPermission)
      queryClient.invalidateQueries({
        queryKey: ['permission-list']
      })
    },
    onError: (error) => {
      console.error('保存權限群組資料失敗:', error)
    }
  })

  // 計算屬性
  const isEditing = computed(() => permissionData.value?.id && permissionData.value.id > 0)
  const canSave = computed(() => permissionData.value?.role?.trim() !== '')

  // 獲取狀態標籤
  const statusLabel = computed(() => {
    if (!permissionData.value) return ''
    const status = statusOptions.find(option => option.value === permissionData.value?.status)
    return status?.label || ''
  })

  // 更新欄位值的輔助函數
  const updateField = (field: keyof PermissionForm, value: string | number | RolePermissions) => {
    if (typeof value === 'number') {
      value = (value as number).toString()
    }
    if (permissionData.value) {
      const updatedData = { ...permissionData.value, [field]: value }
      queryClient.setQueryData(['permission-detail', id.value], updatedData)
    }
  }

  // 更新權限內容的輔助函數
  const updatePermissionContent = (path: string, value: boolean) => {
    if (permissionData.value) {
      const newContent = JSON.parse(JSON.stringify(permissionData.value.content))
      const pathParts = path.split('.')
      let current: any = newContent

      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]]
      }

      current[pathParts[pathParts.length - 1]] = value
      updateField('content', newContent)
    }
  }

  // 檢查某個路徑下的所有子權限是否都被選中
  const isAllChildrenChecked = (basePath: string): boolean => {
    if (!permissionData.value) return false

    const pathParts = basePath.split('.')
    let current = permissionData.value.content

    for (const part of pathParts) {
      current = current[part]
      if (!current) return false
    }

    // 找到對應的配置項目來獲取應該檢查的權限
    const [sectionKey, itemKey] = pathParts
    const section = permissionTreeConfig.find(s => s.key === sectionKey)
    const item = section?.items.find(i => i.key === itemKey)

    if (!item || item.permissions.length === 0) return false

    return item.permissions.every(perm => current[perm] === true)
  }

  // 切換某個路徑下的所有子權限
  const toggleAllChildren = (basePath: string, checked: boolean) => {
    if (!permissionData.value) return

    const [sectionKey, itemKey] = basePath.split('.')
    const section = permissionTreeConfig.find(s => s.key === sectionKey)
    const item = section?.items.find(i => i.key === itemKey)

    if (!item) return

    item.permissions.forEach(perm => {
      updatePermissionContent(`${basePath}.${perm}`, checked)
    })
  }

  // 檢查整個區塊的所有權限是否都被選中
  const isAllSectionChecked = (sectionKey: string): boolean => {
    if (!permissionData.value) return false

    const section = permissionTreeConfig.find(s => s.key === sectionKey)
    if (!section) return false

    return section.items.every(item => {
      if (item.permissions.length === 0) {
        // 單一權限項目
        return permissionData.value!.content[sectionKey][item.key] === true
      } else {
        // 有子權限的項目
        return isAllChildrenChecked(`${sectionKey}.${item.key}`)
      }
    })
  }

  // 切換整個區塊的所有權限
  const toggleAllSection = (sectionKey: string, checked: boolean) => {
    if (!permissionData.value) return

    const section = permissionTreeConfig.find(s => s.key === sectionKey)
    if (!section) return

    section.items.forEach(item => {
      if (item.permissions.length === 0) {
        // 單一權限項目
        updatePermissionContent(`${sectionKey}.${item.key}`, checked)
      } else {
        // 有子權限的項目
        item.permissions.forEach(perm => {
          updatePermissionContent(`${sectionKey}.${item.key}.${perm}`, checked)
        })
      }
    })
  }

  // 處理儲存
  const handleSave = () => {
    if (permissionData.value && canSave.value) {
      savePermission(permissionData.value)
    }
  }

  // 導航方法
  const goBack = () => {
    router.push('/account/permission')
  }

  const handleCancel = () => {
    router.push('/account/permission')
  }

  return {
    // 資料狀態
    permissionData,
    loading,
    saving,
    error,
    saveError,
    statusOptions,

    // 權限樹配置
    permissionTreeConfig,
    permissionLabels,

    // 計算屬性
    isEditing,
    canSave,
    statusLabel,

    // 方法
    updateField,
    updatePermissionContent,
    isAllChildrenChecked,
    toggleAllChildren,
    isAllSectionChecked,
    toggleAllSection,
    handleSave,
    goBack,
    handleCancel,
    refetch
  }
}

