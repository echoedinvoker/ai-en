import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { staffApi, type StaffSearchParams } from '../data/mockStaffList'
import { staffDetailApi } from '../data/mockStaffDetails'

// 員工列表 Query Hook
export function useStaffListQuery(searchParams: Ref<StaffSearchParams>) {
  return useQuery({
    queryKey: ['staff-list', searchParams],
    queryFn: () => staffApi.getStaffList(searchParams.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

export function useStaffMemberQuery(staffId: Ref<number>) {
  return useQuery({
    queryKey: ['staff-member', staffId], // 使用 staff-member 作為 query key
    queryFn: () => staffDetailApi.getStaff(staffId.value), // 調用 getStaff API
    enabled: computed(() => !!staffId.value), // 只有當 staffId 存在時才執行查詢
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}
