import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import { pushApi, type PushSearchParams } from '../data/mockPushList'
import { pushDetailApi } from '../data/mockPushDetail'

export function usePushListQuery(searchParams: Ref<PushSearchParams>) {
  return useQuery({
    queryKey: ['push-list', searchParams],
    queryFn: () => pushApi.getPushList(searchParams.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

export function usePushDetailQuery(id: Ref<number>) {
  return useQuery({
    enabled: id.value !== 0,
    queryKey: ['push-detail', id],
    queryFn: () => pushDetailApi.getPushDetail(id.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}
