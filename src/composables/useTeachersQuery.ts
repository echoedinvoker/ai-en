import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { teacherApi, type TeacherSearchParams } from '@/data/mockTeachers'

// 教師列表 Query Hook
export function useTeachersListQuery(searchParams: Ref<TeacherSearchParams>) {
  return useQuery({
    queryKey: ['teachers-list', searchParams],
    queryFn: () => teacherApi.getTeachersList(searchParams.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

// 單一教師 Query Hook
export function useTeacherQuery(teacherId: Ref<number>) {
  return useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => teacherApi.getTeacher(teacherId.value),
    enabled: computed(() => !!teacherId.value), // 只有當 teacherId 存在時才執行
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

