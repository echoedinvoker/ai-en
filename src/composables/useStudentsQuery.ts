import { useQuery } from '@tanstack/vue-query'
import { computed, type  Ref } from 'vue'
import { studentApi, type StudentSearchParams } from '@/data/mockStudentsList'
import { studentDetailApi } from '@/data/mockStudentDetails'

// 學生列表 Query Hook
export function useStudentsListQuery(searchParams: Ref<StudentSearchParams>) {
  return useQuery({
    queryKey: ['students-list', searchParams],
    queryFn: () => studentApi.getStudentsList(searchParams.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

// 單一學生 Query Hook
export function useStudentQuery(studentId: Ref<number>) {
  return useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentDetailApi.getStudent(studentId.value),
    enabled: computed(() => !!studentId.value),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
