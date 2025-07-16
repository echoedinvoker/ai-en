import { type Ref } from "vue";
import { essayApi, type EssaySearchParams } from "../data/mockEssayList";
import { useQuery } from "@tanstack/vue-query";
import { essayDetailApi } from "../data/mockEssayDetails";

export function useEssayListQuery(searchParams: Ref<EssaySearchParams>) {
  return useQuery({
    queryKey: ["essay-list", searchParams],
    queryFn: () => essayApi.getEssayList(searchParams.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

export function useEssayDetailQuery(essayId: Ref<string>) {
  return useQuery({
    enabled: essayId.value !== "",
    queryKey: ["essay-detail", essayId],
    queryFn: () => essayDetailApi.getEssayDetail(essayId.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

