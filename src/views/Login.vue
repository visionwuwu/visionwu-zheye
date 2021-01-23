<template>
  <div class="login-container w-350 mx-auto">
    <h4 class="text-center my-4">登录到者也</h4>
    <validate-form @form-submit="formSubmit">
      <div class="mb-3 validate-input">
        <label class="form-label">邮箱地址</label>
        <validate-input type="email" placeholder="请输入邮箱地址" :rules="emailRules" v-model="email"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="password"></validate-input>
      </div>
      <div class="mb-3 text-right">
        <router-link to="/register">还没有账户？去注册一个新的吧！</router-link>
      </div>
      <template #submit>
        <button class="btn btn-primary w-100">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { GlobalStoreDataProps, RulesProps } from '@/store'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput from '../components/ValidateInput.vue'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const store = useStore<GlobalStoreDataProps>()
    const emailRules:RulesProps = [
      {
        type: 'required',
        message: '邮箱不能为空'
      },
      {
        type: 'email',
        message: '邮箱格式不正确'
      }
    ]
    const passwordRules:RulesProps = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ]
    const formSubmit = (validate: boolean) => {
      if (validate) {
        store.dispatch('login', {
          email: email.value,
          password: password.value
        }).then(() => {
          store.dispatch('fetchCurrentUser')
          createMessage({
            type: 'success',
            message: '登录成功2s后跳转到首页'
          })
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
      }
    }
    return {
      emailRules,
      passwordRules,
      email,
      password,
      formSubmit
    }
  }
})
</script>

<style>
</style>
