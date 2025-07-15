import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { studentDetailApi, type StudentForm } from '@/data/mockStudentDetails'

export function useStudent(studentId?: string | number) {
  const route = useRoute()
  const router = useRouter()
  const queryClient = useQueryClient()

  // 獲取學生 ID
  const id = computed(() => {
    const paramId = studentId || route.params.id as string
    return parseInt(paramId.toString())
  })

  // 狀態選項
  const statusOptions = [
    { value: 'active', label: '啟用中' },
    { value: 'suspended', label: '停權中' },
    { value: 'reserved', label: '保留' }
  ]

  // 退費狀態選項
  const refundStatusOptions = [
    { value: '無退費', label: '無退費' },
    { value: '部分退費', label: '部分退費' },
    { value: '全額退費', label: '全額退費' }
  ]

  // 使用 useQuery 獲取學生資料
  const {
    data: studentData,
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['student', id.value],
    queryFn: () => studentDetailApi.getStudent(id.value),
    enabled: computed(() => id.value > 0),
    select: (data) => {
      console.log('獲取學生資料:', data)
      return data
    },
    staleTime: 5 * 60 * 1000,
  })

  // 使用 useMutation 處理更新
  const {
    mutate: saveStudent,
    isPending: saving,
    error: saveError
  } = useMutation({
    mutationFn: studentDetailApi.updateStudent,
    onSuccess: (updatedStudent) => {
      // 更新快取中的資料
      queryClient.setQueryData(['student', id.value], updatedStudent)

      // 使相關查詢失效，觸發重新獲取
      queryClient.invalidateQueries({
        queryKey: ['students-list']
      })
    },
    onError: (error) => {
      console.error('保存學生資料失敗:', error)
    }
  })

  // 計算屬性
  const isEditing = computed(() => studentData.value?.id && studentData.value.id > 0)
  const canSave = computed(() =>
    studentData.value?.name?.trim() !== '' &&
    studentData.value?.email?.trim() !== ''
  )

  // 計算試用作文剩餘次數
  const remainingTrialEssays = computed(() => {
    if (!studentData.value) return 0
    return studentData.value.trialEssayCount - studentData.value.usedTrialEssayCount
  })

  // 檢查訂閱是否有效
  const isSubscriptionActive = computed(() => {
    if (!studentData.value) return false
    const now = new Date()
    const endDate = new Date(studentData.value.subscriptionEndDate)
    const manualEndDate = studentData.value.manualEndDate ? new Date(studentData.value.manualEndDate) : null

    // 如果有手動結束日期，使用手動結束日期
    const effectiveEndDate = manualEndDate || endDate
    return now <= effectiveEndDate && studentData.value.status === 'active'
  })

  // 更新欄位值的輔助函數
  const updateField = (field: keyof StudentForm, value: string | number) => {
    if (studentData.value) {
      // 創建新的物件來觸發響應式更新
      const updatedData = { ...studentData.value, [field]: value }

      // 樂觀更新本地快取
      queryClient.setQueryData(['student', id.value], updatedData)
    }
  }

  // 處理儲存
  const handleSave = () => {
    if (studentData.value && canSave.value) {
      saveStudent(studentData.value)
    }
  }

  // 導航方法
  const goBack = () => {
    router.push('/account/students')
  }

  const handleCancel = () => {
    router.push('/account/students')
  }

  // 其他操作
  const viewSubscriptionHistory = () => {
    console.log('查看訂閱紀錄')
    alert('訂閱紀錄功能開發中')
  }

  const viewEssayHistory = () => {
    console.log('查看作文紀錄')
    alert('作文紀錄功能開發中')
  }

  const viewLogs = () => {
    console.log('查看 LOG')
    alert('LOG 查看功能開發中')
  }

  const resetTrialEssays = () => {
    if (studentData.value) {
      updateField('usedTrialEssayCount', 0)
      console.log('重置試用作文次數')
    }
  }

  const extendSubscription = (days: number) => {
    if (studentData.value) {
      const currentEndDate = new Date(studentData.value.subscriptionEndDate)
      currentEndDate.setDate(currentEndDate.getDate() + days)
      updateField('subscriptionEndDate', currentEndDate.toISOString().split('T')[0])
      console.log(`延長訂閱 ${days} 天`)
    }
  }

  return {
    // 資料狀態
    studentData,
    loading,
    saving,
    error,
    saveError,
    statusOptions,
    refundStatusOptions,

    // 計算屬性
    isEditing,
    canSave,
    remainingTrialEssays,
    isSubscriptionActive,

    // 方法
    updateField,
    handleSave,
    goBack,
    handleCancel,
    viewSubscriptionHistory,
    viewEssayHistory,
    viewLogs,
    resetTrialEssays,
    extendSubscription,
    refetch
  }
}

