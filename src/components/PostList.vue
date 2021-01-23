<template>
  <div class="post-list">
    <div class="card p-3 mb-3 shadow-sm" v-for="post in postList" :key="post._id">
      <h4 class="card-title">
        <router-link :to="`/post/${post._id}`">{{post.title}}</router-link>
      </h4>
      <div class="row my-3">
        <div class="col-4 d-flex align-items-center justify-content-center" v-if="post.image">
          <img class="rounded w-100" :src="post.image.url" :alt="post.title">
        </div>
        <p class="card-text text-muted" :class="{'col-8': post.image}">{{post.excerpt}}</p>
      </div>
      <p class="card-text text-muted">{{post.createdAt}}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType } from 'vue'
import { PostProps } from '@/store'
export default {
  name: 'PostList',
  props: {
    postList: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  }
}
</script>

<style scoped>
.post-list .card-title a {
  color: inherit;
  text-decoration: none;
}
.post-list .card-title a:hover {
  color: var(--bs-blue);
}
</style>
