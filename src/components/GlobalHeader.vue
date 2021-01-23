<template>
  <nav class="navbar navbar-dark bg-primary mb-4 px-4 py-3">
    <router-link class="navbar-brand" to="/">知乎专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <a class="btn btn-outline-light" href="/login">登录</a>
        </li>
        <li class="list-inline-item">
          <a class="btn btn-outline-light" href="/register">注册</a>
        </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.nickName}`">
            <dropdown-item><router-link class="dropdown-item" to="/create">新建文章</router-link></dropdown-item>
            <dropdown-item><router-link class="dropdown-item" :to="`/column/${user.column}`">我的专栏</router-link></dropdown-item>
            <dropdown-item><router-link class="dropdown-item" to="/editProfile">编辑资料</router-link></dropdown-item>
            <dropdown-item><router-link @click.prevent="handlerLogout" class="dropdown-item" to="#">退出登录</router-link></dropdown-item>
          </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'
import { GlobalStoreDataProps, UserProps } from '../store'
import { useStore } from 'vuex'
import createMessage from '@/components/createMessage'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const store = useStore<GlobalStoreDataProps>()
    const router = useRouter()
    const handlerLogout = () => {
      store.commit('logout')
      createMessage({
        type: 'success',
        message: '退出登录成功2s后跳转到首页'
      })
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
    return {
      handlerLogout
    }
  }
})
</script>

<style>

</style>
