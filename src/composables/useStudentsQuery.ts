import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import { studentApi, type StudentSearchParams } from '@/data/mockStudents'

// 學生列表 Query Hook
export function useStudentsListQuery(searchParams: Ref<StudentSearchParams>) {
  return useQuery({
    queryKey: ['students-list', searchParams],
    queryFn: () => studentApi.getStudentsList(searchParams.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

