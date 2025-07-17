import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSubDetailQuery, useUpdateSubMutation } from "./useSubQUery";

export function useSubDetail(subId?: number) {
  const route = useRoute();

  // 計算訂閱方案ID，優先使用傳入參數，否則從路由參數取得
  const id = computed(() => {
    const paramId = subId || Number(route.params.id) as number;
    return paramId;
  })

  // 查詢訂閱方案詳細資料
  const {
    data: subDetail,
    isLoading: loading,
    error,
    refetch
  } = useSubDetailQuery(id);

  // 更新訂閱方案 mutation
  const {
    mutate: updateSubDetail,
    isPending: updating,
    error: updateError
  } = useUpdateSubMutation();

  // 包裝更新函數，提供更好的錯誤處理
  const handleUpdateSubDetail = (updatedData: any) => {
    if (!subDetail.value) {
      console.error("無法更新：訂閱方案詳細資料不存在");
      return;
    }

    const updatedSub = {
      ...subDetail.value,
      ...updatedData,
    };

    updateSubDetail(updatedSub);
  };

  return {
    subDetail, // 訂閱方案詳細資料
    loading,
    error,
    refetch,
    updateSubDetail: handleUpdateSubDetail,
    updating,
    updateError
  }
}

