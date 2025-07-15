import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { staffDetailApi, type StaffForm } from '../data/mockStaffDetails'

export function useStaffMember(staffId?: string | number) {
  const route = useRoute()
  const router = useRouter()
  const queryClient = useQueryClient()

  // 獲取員工 ID
  const id = computed(() => {
    const paramId = staffId || route.params.id as string
    return parseInt(paramId.toString())
  })

  // 角色選項
  const roleOptions = [
    { value: 'admin', label: '系統管理員' },
    { value: 'manager', label: '經理' },
    { value: 'operator', label: '操作員' }
  ]

  // 狀態選項
  const statusOptions = [
    { value: 'active', label: '啟用中' },
    { value: 'suspended', label: '停權中' },
    { value: 'reserved', label: '保留' }
  ]

  // 使用 useQuery 獲取員工資料
  const {
    data: staffData,
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['staff-member', id.value],
    queryFn: () => staffDetailApi.getStaff(id.value),
    enabled: computed(() => id.value > 0),
    select: (data) => {
      console.log('獲取員工資料:', data)
      return data
    },
    staleTime: 5 * 60 * 1000,
  })

  // 使用 useMutation 處理更新
  const {
    mutate: saveStaff,
    isPending: saving,
    error: saveError
  } = useMutation({
    mutationFn: staffDetailApi.updateStaff,
    onSuccess: (updatedStaff) => {
      // 更新快取中的資料
      queryClient.setQueryData(['staff-member', id.value], updatedStaff)

      // 使相關查詢失效，觸發重新獲取
      queryClient.invalidateQueries({
        queryKey: ['staff-list']
      })
    },
    onError: (error) => {
      console.error('保存員工資料失敗:', error)
    }
  })

  // 計算屬性
  const isEditing = computed(() => staffData.value?.id && staffData.value.id > 0)
  const canSave = computed(() =>
    staffData.value?.name?.trim() !== '' &&
    staffData.value?.email?.trim() !== '' &&
    staffData.value?.password?.trim() !== ''
  )

  // 獲取角色標籤
  const roleLabel = computed(() => {
    if (!staffData.value) return ''
    const role = roleOptions.find(option => option.value === staffData.value?.role)
    return role?.label || ''
  })

  // 獲取狀態標籤
  const statusLabel = computed(() => {
    if (!staffData.value) return ''
    const status = statusOptions.find(option => option.value === staffData.value?.status)
    return status?.label || ''
  })

  // 更新欄位值的輔助函數
  const updateField = (field: keyof StaffForm, value: string | number) => {
    if (staffData.value) {
      // 創建新的物件來觸發響應式更新
      const updatedData = { ...staffData.value, [field]: value }

      // 樂觀更新本地快取
      queryClient.setQueryData(['staff-member', id.value], updatedData)
    }
  }

  // 處理儲存
  const handleSave = () => {
    if (staffData.value && canSave.value) {
      saveStaff(staffData.value)
    }
  }

  // 導航方法
  const goBack = () => {
    router.push('/account/staff')
  }

  const handleCancel = () => {
    router.push('/account/staff')
  }

  // 重置密碼
  const resetPassword = () => {
    if (staffData.value) {
      const newPassword = 'temp123456'
      updateField('password', newPassword)
      console.log('重置密碼為:', newPassword)
    }
  }

  // 切換狀態
  const toggleStatus = () => {
    if (staffData.value) {
      const newStatus = staffData.value.status === 'active' ? 'suspended' : 'active'
      updateField('status', newStatus)
      console.log('切換狀態為:', newStatus)
    }
  }

  return {
    // 資料狀態
    staffData,
    loading,
    saving,
    error,
    saveError,
    roleOptions,
    statusOptions,

    // 計算屬性
    isEditing,
    canSave,
    roleLabel,
    statusLabel,

    // 方法
    updateField,
    handleSave,
    goBack,
    handleCancel,
    resetPassword,
    toggleStatus,
    refetch
  }
}

