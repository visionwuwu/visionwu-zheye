<template>
  <div class="home-page container-md">
    <section class="container text-center">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="~@/assets/callout.svg" alt="callout" class="w-50">
          <h2 class="fw-light">随心写作，自由表达</h2>
          <router-link to="/create" class="btn btn-primary my-2">开始写文章</router-link>
        </div>
      </div>
    </section>
    <h4 class="text-center fw-bolder mb-4">发现精彩</h4>
    <column-list v-if="colmuns.length" :list="colmuns"></column-list>
    <button @click.prevent="loadMore" v-if="!isLastPage" class="d-grid mb-5 btn btn-block btn-outline-primary w-25 mx-auto">加载更多</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import { useStore } from 'vuex'
import { GlobalStoreDataProps } from '@/store'
import useLoadMore from '../hooks/useLoadMore'
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore<GlobalStoreDataProps>()
    const colmuns = computed(() => store.getters.getColumns)
    const total = computed(() => store.state.columns.total)
    const currentPage = computed(() => store.state.columns.currentPage)
    const { loadMore, isLastPage } = useLoadMore('fetchColumns', total, { currentPage: (currentPage.value ? currentPage.value + 1 : 2), pageSize: 5 })
    onMounted(() => {
      store.dispatch('fetchColumns', { pageSize: 5 })
    })
    return {
      colmuns,
      loadMore,
      isLastPage
    }
  }
})
</script>

<style>

</style>
