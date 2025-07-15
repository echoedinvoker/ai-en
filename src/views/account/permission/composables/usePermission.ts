import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { permissionDetailApi, type PermissionForm, type RolePermissions } from '../data/mockPermissionDetails'

export function usePermission(permissionId?: string | number) {
  const route = useRoute()
  const router = useRouter()
  const queryClient = useQueryClient()

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
      // 更新快取中的資料
      queryClient.setQueryData(['permission-detail', id.value], updatedPermission)

      // 使相關查詢失效，觸發重新獲取
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
  const updateField = (field: keyof PermissionForm, value: string | RolePermissions) => {
    if (permissionData.value) {
      // 創建新的物件來觸發響應式更新
      const updatedData = { ...permissionData.value, [field]: value }

      // 樂觀更新本地快取
      queryClient.setQueryData(['permission-detail', id.value], updatedData)
    }
  }

  // 更新權限內容的輔助函數
  const updatePermissionContent = (path: string, value: boolean) => {
    if (permissionData.value) {
      // 創建深層拷貝而不是淺拷貝
      const newContent = JSON.parse(JSON.stringify(permissionData.value.content))

      // 根據路徑更新對應的權限值
      const pathParts = path.split('.')
      let current: any = newContent

      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]]
      }

      current[pathParts[pathParts.length - 1]] = value

      updateField('content', newContent)
    }
  }

  // 新增 updatePermission 方法作為 updatePermissionContent 的別名
  const updatePermission = updatePermissionContent

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

    // 計算屬性
    isEditing,
    canSave,
    statusLabel,

    // 方法
    updateField,
    updatePermissionContent,
    updatePermission, // 新增此方法
    handleSave,
    goBack,
    handleCancel,
    refetch
  }
}

