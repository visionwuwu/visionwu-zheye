<template>
  <div class="register-container w-350 mx-auto">
    <h4 class="my-4 text-center">注册者也账户</h4>
    <validate-form @form-submit="formSubmit">
      <div class="mb-3 validate-input">
        <label class="form-label">邮箱地址</label>
        <validate-input type="email" placeholder="请输入邮箱地址" :rules="emailRules" v-model="email"></validate-input>
      </div>
      <div class="mb-3 validate-input">
        <label class="form-label">昵称</label>
        <validate-input type="email" placeholder="请输入昵称" :rules="nickNameRules" v-model="nickName"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="password"></validate-input>
      </div>
       <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">重复密码</label>
        <validate-input type="password" placeholder="请再次输入密码" :rules="confirmPasswordRules" v-model="confirmPassword"></validate-input>
      </div>
      <div class="mb-3">
        <router-link to="/login">已经有账户了？去登录</router-link>
      </div>
      <template #submit>
        <button class="btn btn-primary w-100">注册新用户</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput from '../components/ValidateInput.vue'
import { RulesProps } from '../store'
import { reqRegister } from '../api/user'
import createMessage from '../components/createMessage'
export default defineComponent({
  name: 'Register',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const email = ref('')
    const nickName = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const router = useRouter()
    const confirmPasswordRules: RulesProps = [
      {
        type: 'required',
        message: '重复密码不能为空'
      },
      {
        type: 'custom',
        validator: () => {
          return password.value === confirmPassword.value
        },
        message: '俩次输入密码不一致'
      }
    ]
    const nickNameRules: RulesProps = [
      {
        type: 'required',
        message: '昵称不能为空'
      }
    ]
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
        const newUser = {
          email: email.value,
          nickName: nickName.value,
          password: password.value,
          confirmPassword: confirmPassword.value
        }
        reqRegister(newUser)
          .then(() => {
            createMessage({
              type: 'success',
              message: '注册成功2s后跳转到登录页面'
            })
            setTimeout(() => {
              router.push('/login')
            }, 2000)
          })
      }
    }
    return {
      emailRules,
      passwordRules,
      nickNameRules,
      confirmPasswordRules,
      email,
      password,
      nickName,
      confirmPassword,
      formSubmit
    }
  }
})
</script>

<style>

</style>
