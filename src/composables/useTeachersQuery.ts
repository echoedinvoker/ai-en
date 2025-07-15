import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { teacherListApi, type TeacherSearchParams } from '@/data/mockTeachersList'
import { teacherDetailApi } from '@/data/mockTeacherDetails'

// 教師列表 Query Hook
export function useTeachersListQuery(searchParams: Ref<TeacherSearchParams>) {
  return useQuery({
    queryKey: ['teachers-list', searchParams],
    queryFn: () => teacherListApi.getTeachersList(searchParams.value),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// 單一教師 Query Hook
export function useTeacherQuery(teacherId: Ref<number>) {
  return useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => teacherDetailApi.getTeacher(teacherId.value),
    enabled: computed(() => !!teacherId.value),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

