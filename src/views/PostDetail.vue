<template>
  <div class="post-page container">
    <modal
      title="删除文章"
      :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>您，确认要删除此文章吗？</p>
    </modal>
    <div class="w-690 mx-auto">
      <article v-if="currentPost">
        <div class="text-center">
          <img v-if="currentPost.image" class="rounded-lg img-fluid my-4" :src="currentPost.image.url" alt="">
        </div>
        <h2 class="mb-4">{{currentPost.title}}</h2>
        <div class="d-flex user-profile-container align-items-center border-top border-bottom py-3 mb-5">
          <div class="flex-grow-1">
            <user-profile v-if="typeof currentPost.author === 'object'" :userProfile="currentPost.author">
              <p class="d-md-none text-muted font-italic mb-0">发表于：{{currentPost.createdAt}}</p>
            </user-profile>
          </div>
          <span align="right" class="d-none d-md-block text-muted font-italic ms-2">发表于：{{currentPost.createdAt}}</span>
        </div>
        <div v-html="contentHTML" class="content-container"></div>
        <div class="btn-group my-4" v-if="showEditArea">
          <router-link
            type="button"
            class="btn btn-primary"
            :to="{ path: '/create', query: { id: currentPost._id } }"
          >编辑</router-link>
          <button type="button" class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalStoreDataProps, PostProps, ResponseType } from '@/store'
import UserProfile from '@/components/userProfile.vue'
import MarkDownIt from 'markdown-it'
import Modal from '@/components/Modal.vue'
import createMessage from '@/components/createMessage'
export default defineComponent({
  name: 'PostDetail',
  components: {
    UserProfile,
    Modal
  },
  setup () {
    const modalIsVisible = ref(false)
    const route = useRoute()
    const router = useRouter()
    const store = useStore<GlobalStoreDataProps>()
    const postId = route.params.id
    const currentPost = computed(() => store.getters.getPostById(postId))
    const md = new MarkDownIt()
    const { isLogin, _id } = store.state.user
    const showEditArea = ref(false)
    const contentHTML = computed(() => {
      if (currentPost.value) {
        const { content, isHTML, author } = currentPost.value
        if (typeof author === 'object' && isLogin && author._id === _id) {
          showEditArea.value = true
        }
        if (content) {
          return isHTML ? content : md.render(content)
        }
      }
      return ''
    })
    onMounted(() => {
      store.dispatch('fetchCurrentPost', postId)
    })
    const hideAndDelete = () => {
      modalIsVisible.value = false
      store.dispatch('deletePost', postId)
        .then((rawData: ResponseType<PostProps>) => {
          createMessage({
            type: 'success',
            message: '删除成功，2秒后跳转到专栏首页'
          })
          setTimeout(() => {
            router.push({
              name: 'ColumnDetail',
              params: { id: rawData.data.column }
            })
          }, 2000)
        })
    }
    return {
      currentPost,
      contentHTML,
      showEditArea,
      hideAndDelete,
      modalIsVisible
    }
  }
})
</script>

<style>
.content-container img {
  max-width: 100% !important;
}
</style>
