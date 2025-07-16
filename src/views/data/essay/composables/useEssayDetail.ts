import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { essayDetailApi } from "../data/mockEssayDetails";
import { useEssayDetailQuery } from "./useEssayQuery";

export function useEssayDetail(essayId?: string) {
  const route = useRoute()
  const queryClient = useQueryClient()

  const id = computed(() => {
    const paramId = essayId || route.params.id as string
    return paramId
  })

  const {
    data: essayDetail,
    isLoading: loading,
    error,
    refetch
  } = useEssayDetailQuery(id)

  const {
    mutate: updateEssayDetail,
    isPending: updating,
    error: updateError
  } = useMutation({
    mutationFn: essayDetailApi.updateEssayDetail,
    onSuccess: (updatedEssay) => {
      // 更新快取中的資料
      queryClient.setQueryData(['essay-detail', id.value], updatedEssay)

      // 使相關查詢失效，觸發重新獲取
      queryClient.invalidateQueries({
        queryKey: ['essay-list']
      })
    },
    onError: (error) => {
      console.error("更新論文詳情失敗:", error);
    }
  })

  return {
    essayDetail,
    loading,
    error,
    refetch,
    updateEssayDetail,
    updating,
    updateError
  }
}

