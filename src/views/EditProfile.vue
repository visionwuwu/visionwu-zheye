<template>
  <div class="eidt-profile-page container-md">
    <ul class="nav nav-tabs my-4">
      <li class="nav-item" @click.prevent="activeName = 'person'">
        <a class="nav-link" :class="{ 'active': activeName === 'person' }" href="#">更新个人资料</a>
      </li>
      <li class="nav-item" @click.prevent="activeName = 'column'">
        <a class="nav-link" :class="{ 'active': activeName === 'column' }" href="#">更新专栏信息</a>
      </li>
    </ul>
    <h4>编辑个人资料</h4>
    <upload
      class="circle mx-auto"
      action="/api/upload"
      :uploadedData="userProfile.avatar"
      :beforeUpload="beforeUpload"
      @file-uploaded="handlerUploaded"
    ></upload>
    <validate-form @form-submit="formSubmit">
      <div class="mb-3 validate-input">
        <label class="form-lable">昵称</label>
        <validate-input placeholder="请输入昵称" :rules="nickNameRules" v-model="userProfile.title"></validate-input>
      </div>
      <div class="mb-3 validate-input">
        <label class="form-label">描述</label>
        <validate-input placeholder="请输入描述" :rules="descriptionRules" v-model="userProfile.description"></validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary">提交修改</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watchEffect } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput from '@/components/ValidateInput.vue'
import Upload from '@/components/Upload.vue'
import { useStore } from 'vuex'
import { GlobalStoreDataProps, RulesProps, ResponseType, ImageProps, ColumnProps } from '@/store'
import { checkUploadFileFormat } from '@/utils/helper'
import createMessage from '@/components/createMessage'
import { useRouter } from 'vue-router'
type ActiveName = 'person' | 'column'
export default defineComponent({
  name: 'EditProfile',
  components: {
    ValidateForm,
    ValidateInput,
    Upload
  },
  setup () {
    const store = useStore<GlobalStoreDataProps>()
    const router = useRouter()
    const user = computed(() => store.state.user).value
    const currentColumn = computed(() => {
      return store.state.columns.data[user.column as string]
    })
    const activeName = ref<ActiveName>('person')
    const imageId = ref()
    const userProfile = reactive<ColumnProps>({
      avatar: {},
      title: '',
      description: ''
    })
    watchEffect(() => {
      if (activeName.value === 'person') {
        userProfile.avatar = user.avatar
        userProfile.description = user.description
        userProfile.title = user.nickName
      } else {
        userProfile.avatar = currentColumn.value.avatar
        userProfile.title = currentColumn.value.title
        userProfile.description = currentColumn.value.description
      }
    })
    onMounted(() => {
      store.dispatch('fetchColumnById', user.column)
    })
    const nickNameRules: RulesProps = [
      {
        type: 'required',
        message: '请输入昵称'
      }
    ]
    const descriptionRules: RulesProps = [
      {
        type: 'required',
        message: '请输描述'
      }
    ]
    const formSubmit = (validate: boolean) => {
      if (validate) {
        const actionName = activeName.value === 'person' ? 'updateUser' : 'updateColumnById'
        const sendData = {
          id: activeName.value === 'person' ? user._id : currentColumn.value._id,
          data: {
            title: userProfile.title,
            nickName: userProfile.title,
            avatar: imageId.value,
            description: userProfile.description
          }
        }
        store.dispatch(actionName, sendData)
          .then(() => {
            createMessage({
              type: 'success',
              message: '更新成功，2s后返回首页'
            })
            setTimeout(() => {
              router.push('/home')
            }, 2000)
          })
      }
    }
    const beforeUpload = (file: File) => {
      const { passed, error } = checkUploadFileFormat(file, {
        fileFormat: ['image/jpeg', 'image/png'],
        fileSize: 0.5
      })
      if (!passed) {
        createMessage({
          type: 'danger',
          message: error
        })
      }
      return passed
    }
    const handlerUploaded = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId.value = rawData.data._id
      }
    }
    return {
      activeName,
      nickNameRules,
      descriptionRules,
      formSubmit,
      beforeUpload,
      handlerUploaded,
      userProfile
    }
  }
})
</script>

<style scoped>
.circle {
  width: 200px !important;
  height: 200px;
  border-radius: 200px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #efefef;
}
</style>
