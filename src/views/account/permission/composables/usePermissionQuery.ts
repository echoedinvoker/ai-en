import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import { permissionApi, type PermissionSearchParams } from '../data/mockPermissionList'
import { permissionDetailApi } from '../data/mockPermissionDetails'

// 權限群組列表 Query Hook
export function usePermissionListQuery(searchParams: Ref<PermissionSearchParams>) {
  return useQuery({
    queryKey: ['permission-list', searchParams],
    queryFn: () => permissionApi.getPermissionList(searchParams.value),
    select: (data) => {
      console.log('Fetching permission list with params:', searchParams.value, data)
      return data
    },
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

export function usePermissionDetailQuery(permissionId: Ref<number>) {
  return useQuery({
    queryKey: ['permission-detail', permissionId], // 使用 permission-detail 作為 query key
    queryFn: () => permissionDetailApi.getPermission(permissionId.value), // 調用 getPermission API
    enabled: computed(() => !!permissionId.value), // 只有當 permissionId 存在時才執行查詢
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

