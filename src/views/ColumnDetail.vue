<template>
  <div class="column-detail-page container-md">
    <div class="w-690 mx-auto">
      <column v-if="column" :column="column"></column>
      <post-list v-if="posts.length" :postList="posts"></post-list>
      <button @click="loadMore" v-if="!isLastPage" class="d-grid mb-5 btn btn-block btn-outline-primary w-25 mx-auto">加载更多</button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import Column from '@/components/Column.vue'
import PostList from '@/components/PostList.vue'
import { GlobalStoreDataProps } from '@/store'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import useLoadMore from '../hooks/useLoadMore'
export default defineComponent({
  name: 'ColumnDetail',
  components: {
    Column,
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalStoreDataProps>()
    const currentId = route.params.id as string
    const total = computed(() => {
      const column = store.state.posts.loadedColumns[currentId]
      return column ? column.total : 0
    })
    const currentPage = computed(() => {
      const column = store.state.posts.loadedColumns[currentId]
      return column ? column.currentPage : 0
    })
    onMounted(() => {
      store.dispatch('fetchColumnById', currentId)
      store.dispatch('fetchPostsById', { cid: currentId, currentPage: 1, pageSize: 5 })
    })
    const column = computed(() => store.getters.getColumnByCid(currentId))
    const posts = computed(() => store.getters.getPostsByCid(currentId))
    const { loadMore, isLastPage } = useLoadMore('fetchPostsById', total, { currentPage: currentPage.value ? currentPage.value + 1 : 2, pageSize: 5, cid: currentId })
    return {
      route,
      column,
      posts,
      loadMore,
      isLastPage
    }
  }
})
</script>

<style>
</style>
