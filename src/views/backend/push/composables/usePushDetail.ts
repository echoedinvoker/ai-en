import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePushDetailQuery } from "./usePushQuery";
import { pushDetailApi } from "../data/mockPushDetail";

export function usePushDetail(pushId?: number) {
  const route = useRoute();
  const queryClient = useQueryClient();

  const id = computed(() => {
    const paramId = pushId || Number(route.params.id) as number;
    return paramId;
  })

  const {
    data: pushDetail,
    isLoading: loading,
    error,
    refetch
  } = usePushDetailQuery(id);

  const {
    mutate: updatePushDetail,
    isPending: updating,
    error: updateError
  } = useMutation({
    mutationFn: pushDetailApi.updatePushDetail,
    onSuccess: (updatedPush) => {
      // 更新快取中的資料
      queryClient.setQueryData(['push-detail', id.value], updatedPush);

      // 使相關查詢失效，觸發重新獲取
      queryClient.invalidateQueries({
        queryKey: ['push-list']
      });
    },
    onError: (error) => {
      console.error("更新推播詳情失敗:", error);
    }
  })

  return {
    pushDetail,
    loading,
    error,
    refetch,
    updatePushDetail,
    updating,
    updateError
  }
}
