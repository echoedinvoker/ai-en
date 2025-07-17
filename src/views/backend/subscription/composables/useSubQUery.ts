import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import { subApi, type SubSearchParams } from '../data/mockSubList'
import { subDetailApi, type SubDetail } from '../data/mockSubDetail'

// 訂閱方案列表查詢
export function useSubListQuery(searchParams: Ref<SubSearchParams>) {
  return useQuery({
    queryKey: ['sub-list', searchParams],
    queryFn: () => subApi.getSubList(searchParams.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

// 訂閱方案詳細資料查詢
export function useSubDetailQuery(id: Ref<number>) {
  return useQuery({
    enabled: id.value !== 0, // 只有當 id 不為 0 時才執行查詢
    queryKey: ['sub-detail', id],
    queryFn: () => subDetailApi.getSubDetail(id.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

// 更新訂閱方案 mutation
export function useUpdateSubMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (subData: SubDetail) => subDetailApi.updateSubDetail(subData),
    onSuccess: (updatedSub) => {
      // 更新詳細資料快取
      queryClient.setQueryData(['sub-detail', { value: updatedSub.id }], updatedSub)

      // 使列表查詢失效，觸發重新獲取
      queryClient.invalidateQueries({
        queryKey: ['sub-list'],
        exact: false
      })
    },
    onError: (error) => {
      console.error('更新訂閱方案失敗:', error)
    }
  })
}

