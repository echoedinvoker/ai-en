import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import { sysApi, type SysSearchParams } from '../data/mockSysList'
import { sysDetailApi } from '../data/mockSysDetail'

// 系統公告列表查詢
export function useSysListQuery(searchParams: Ref<SysSearchParams>) {
  return useQuery({
    queryKey: ['sys-list', searchParams],
    queryFn: () => sysApi.getSysList(searchParams.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

// 系統公告詳細資料查詢
export function useSysDetailQuery(id: Ref<number>) {
  return useQuery({
    enabled: id.value !== 0, // 只有當 id 不為 0 時才執行查詢
    queryKey: ['sys-detail', id],
    queryFn: () => sysDetailApi.getSysDetail(id.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

