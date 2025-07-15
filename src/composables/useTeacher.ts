import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { teacherApi, type TeacherForm } from '@/data/mockTeachers'

export function useTeacher(teacherId?: string | number) {
  const route = useRoute()
  const router = useRouter()
  const queryClient = useQueryClient()

  // 獲取教師 ID
  const id = computed(() => {
    const paramId = teacherId || route.params.id as string
    return parseInt(paramId.toString())
  })

  // 狀態選項
  const statusOptions = [
    { value: 'active', label: '啟用中' },
    { value: 'suspended', label: '停權中' },
    { value: 'reserved', label: '保留' }
  ]

  // 使用 useQuery 獲取教師資料
  const {
    data: teacherData,
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['teacher', id.value],
    queryFn: () => teacherApi.getTeacher(id.value),
    enabled: computed(() => id.value > 0), // 只有當 ID 有效時才執行查詢
    select: (data) => {
      console.log('獲取教師資料:', data)
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 分鐘內認為資料是新鮮的
  })

  // 使用 useMutation 處理更新
  const {
    mutate: saveTeacher,
    isPending: saving,
    error: saveError
  } = useMutation({
    mutationFn: teacherApi.updateTeacher,
    onSuccess: (updatedTeacher) => {
      // 更新快取中的資料
      queryClient.setQueryData(['teacher', id.value], updatedTeacher)

      // 可選：使相關查詢失效，觸發重新獲取
      queryClient.invalidateQueries({
        queryKey: ['teachers'] // 如果有教師列表查詢
      })
    },
    onError: (error) => {
      console.error('保存教師資料失敗:', error)
    }
  })

  // 計算屬性
  const isEditing = computed(() => teacherData.value?.id && teacherData.value.id > 0)
  const canSave = computed(() =>
    teacherData.value?.name?.trim() !== '' &&
    teacherData.value?.email?.trim() !== ''
  )

  // 更新欄位值的輔助函數
  const updateField = (field: keyof TeacherForm, value: string | number) => {
    if (teacherData.value) {
      // 創建新的物件來觸發響應式更新
      const updatedData = { ...teacherData.value, [field]: value }

      // 樂觀更新本地快取
      queryClient.setQueryData(['teacher', id.value], updatedData)
    }
  }

  // 處理儲存
  const handleSave = () => {
    if (teacherData.value && canSave.value) {
      saveTeacher(teacherData.value)
    }
  }

  // 導航方法
  const goBack = () => {
    router.push('/account/teachers')
  }

  const handleCancel = () => {
    router.push('/account/teachers')
  }

  // 其他操作
  const viewSubscriptionHistory = () => {
    console.log('查看訂閱紀錄')
    alert('訂閱紀錄功能開發中')
  }

  const viewLogs = () => {
    console.log('查看 LOG')
    alert('LOG 查看功能開發中')
  }

  return {
    // 資料狀態
    teacherData,
    loading,
    saving,
    error,
    saveError,
    statusOptions,

    // 計算屬性
    isEditing,
    canSave,

    // 方法
    updateField,
    handleSave,
    goBack,
    handleCancel,
    viewSubscriptionHistory,
    viewLogs,
    refetch
  }
}
