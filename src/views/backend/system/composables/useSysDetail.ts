import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSysDetailQuery } from "./useSysQuery";
import { sysDetailApi } from "../data/mockSysDetail";

export function useSysDetail(sysId?: number) {
  const route = useRoute();
  const queryClient = useQueryClient();

  // 計算系統公告 ID，優先使用傳入參數，否則從路由參數取得
  const id = computed(() => {
    const paramId = sysId || Number(route.params.id) as number;
    return paramId;
  })

  // 查詢系統公告詳細資料
  const {
    data: sysDetail,
    isLoading: loading,
    error,
    refetch
  } = useSysDetailQuery(id);

  // 更新系統公告詳細資料
  const {
    mutate: updateSysDetail,
    isPending: updating,
    error: updateError
  } = useMutation({
    mutationFn: sysDetailApi.updateSysDetail,
    onSuccess: (updatedSys) => {
      // 更新快取中的詳細資料
      queryClient.setQueryData(['sys-detail', id.value], updatedSys);

      // 使系統公告列表查詢失效，觸發重新獲取
      queryClient.invalidateQueries({
        queryKey: ['sys-list']
      });
    },
    onError: (error) => {
      console.error("更新系統公告詳情失敗:", error);
    }
  })

  return {
    sysDetail,
    loading,
    error,
    refetch,
    updateSysDetail,
    updating,
    updateError
  }
}

