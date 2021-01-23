import { computed, ComputedRef, ref } from 'vue'
import { useStore } from 'vuex'

export interface LoadMoreParams {
  currentPage: number;
  pageSize: number;
  cid?: string;
}
export default function useLoadMore (actionName: string, total: ComputedRef<number>, params: LoadMoreParams = {
  currentPage: 2,
  pageSize: 5
}) {
  const store = useStore()
  const currentPage = ref(params.currentPage)
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize,
    cid: params.cid
  }))
  const loadMore = () => {
    store.dispatch(actionName, requestParams.value)
      .then(() => {
        currentPage.value++
      })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })
  return {
    loadMore,
    isLastPage,
    currentPage
  }
}
