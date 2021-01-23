<template>
  <div class="login-container container-md">
    <h3 class="mb-4">{{ isEditMode ? '更新文章' : '新建文章' }}</h3>
    <upload
      action="/api/upload"
      :beforeUpload="beforeUpload"
      :uploadedData="uploadedData"
      @file-uploaded="handlerUploaded"
      @file-uploaded-error="handlerUploadedError"
    ></upload>
    <validate-form @form-submit="formSubmit">
      <div class="mb-3 validate-input">
        <label class="form-label">文章标题：</label>
        <validate-input placeholder="请输入文章标题" :rules="titleRules" v-model="title"></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">文章详情：</label>
        <validate-input tagType="textarea" rows="10" placeholder="请输入文章详情" :rules="detialRules" v-model="description"></validate-input>
      </div>
      <template #submit>
        <button class="btn btn-primary mb-3">
          {{ isEditMode ? '更新文章' : '发表文章' }}
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { GlobalStoreDataProps, ImageProps, CreatePost, RulesProps, ResponseType, PostProps } from '@/store'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput from '../components/ValidateInput.vue'
import Upload from '../components/Upload.vue'
import createMessage from '../components/createMessage'
import { checkUploadFileFormat } from '../utils/helper'
export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateForm,
    ValidateInput,
    Upload
  },
  setup () {
    const title = ref('')
    const description = ref('')
    const imageId = ref('')
    const uploadedData = ref()
    const router = useRouter()
    const route = useRoute()
    const store = useStore<GlobalStoreDataProps>()
    const { column, _id } = store.state.user
    const isEditMode = !!route.query.id
    onMounted(() => {
      if (isEditMode) {
        store.dispatch('fetchCurrentPost', route.query.id)
          .then((rawData: ResponseType<PostProps>) => {
            const currentPost = rawData.data
            if (currentPost) {
              uploadedData.value = currentPost.image
              title.value = currentPost.title || ''
              description.value = currentPost.excerpt || ''
            }
          })
      }
    })
    const titleRules:RulesProps = [
      {
        type: 'required',
        message: '文章标题不能为空'
      }
    ]
    const detialRules:RulesProps = [
      {
        type: 'required',
        message: '文章详情不能为空'
      }
    ]
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
    const handlerUploadedError = (error: any) => {
      const { data } = error.response
      createMessage({
        type: 'danger',
        message: data.error
      })
    }
    const formSubmit = (validate: boolean) => {
      if (validate) {
        if (column && _id) {
          const newPost: CreatePost = {
            title: title.value,
            content: description.value,
            column: column,
            author: _id
          }
          if (imageId.value) {
            newPost.image = imageId.value
          }
          const actionName = isEditMode ? 'updatePost' : 'createPost'
          const sendData = isEditMode
            ? {
                id: route.query.id,
                data: newPost
              }
            : newPost
          store.dispatch(actionName, sendData)
          createMessage({
            type: 'success',
            message: '发表成功，2s后跳转到文章'
          })
          setTimeout(() => {
            router.push({ name: 'ColumnDetail', params: { id: column } })
          }, 2000)
        }
      }
    }
    return {
      titleRules,
      detialRules,
      title,
      description,
      uploadedData,
      formSubmit,
      beforeUpload,
      handlerUploaded,
      handlerUploadedError,
      isEditMode
    }
  }
})
</script>

<style>

</style>
