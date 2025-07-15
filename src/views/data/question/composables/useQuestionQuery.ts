import { useQuery } from '@tanstack/vue-query'
import { type Ref } from 'vue'
import { questionBankApi, type QuestionBankSearchParams } from '../data/mockQuestionList'

// 題庫列表 Query Hook
export function useQuestionBankListQuery(searchParams: Ref<QuestionBankSearchParams>) {
  return useQuery({
    queryKey: ['question-banks-list', searchParams],
    queryFn: () => questionBankApi.getQuestionBankList(searchParams.value),
    staleTime: 5 * 60 * 1000, // 5分鐘內資料視為新鮮
    gcTime: 10 * 60 * 1000, // 10分鐘後清除快取
  })
}

