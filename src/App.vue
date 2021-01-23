<template>
  <div class="h-100 d-flex flex-column">
    <div class="container-fluid px-0">
      <global-header :user="currentUser"></global-header>
      <loading v-if="loading"></loading>
      <router-view></router-view>
    </div>
    <global-footer></global-footer>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import GlobalFooter from './components/GlobalFooter.vue'
import GlobalHeader from './components/GlobalHeader.vue'
import Loading from './components/Loading.vue'
import { GlobalStoreDataProps } from './store'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter,
    Loading
  },
  setup () {
    const store = useStore<GlobalStoreDataProps>()
    const currentUser = computed(() => store.state.user)
    const loading = computed(() => store.state.loading)
    return {
      currentUser,
      loading
    }
  }
})
</script>

<style>
.w-350 {
  max-width: 350px;
}
.w-690 {
  max-width: 690px;
}
</style>
