<template>
  <div @click.stop="handlerUpload" class="my-4 file-upload-container bg-light text-secondary w-100 d-flex justify-content-center align-items-center">
    <slot name="default" v-if="uploadStatus === 'ready' || uploadStatus === 'error'" >
      <h2>点击上传头图</h2>
    </slot>
    <slot name="loading" v-else-if="uploadStatus === 'loading'" >
      <div class="d-flex">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h2>上传中...</h2>
      </div>
    </slot>
    <slot :uploadFile="uploadFile" name="uploaded" v-else-if="uploadStatus === 'success'">
      <div class="position-relative preview-container d-flex align-items-center justify-content-center">
        <img v-if="uploadFile" :src="uploadFile.url" alt="">
        <h2 class="d-none position-absolute">点击重新上传</h2>
      </div>
    </slot>
    <input ref="inputFileRef" @change="handlerFileChange" type="file" class="d-none">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import axios from 'axios'
import { ImageProps } from '../store'
export type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export type CheckedFunction = (file: File) => boolean
export default defineComponent({
  name: 'Upload',
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object
    },
    beforeUpload: {
      type: Function as PropType<CheckedFunction>
    },
    uploadedData: {
      type: Object
    }
  },
  emits: [
    'file-uploaded',
    'file-uploaded-error'
  ],
  setup (props, context) {
    const inputFileRef = ref<null | HTMLInputElement>(null)
    const uploadStatus = ref<UploadStatus>(props.uploadedData ? 'success' : 'ready')
    const uploadFile = ref<ImageProps | null>(props.uploadedData || null)
    watch(() => props.uploadedData, (newVal) => {
      if (newVal) {
        uploadStatus.value = 'success'
        uploadFile.value = newVal
      }
    })
    const handlerUpload = () => {
      if (inputFileRef.value) {
        inputFileRef.value.click()
      }
    }
    const resetFile = () => {
      if (inputFileRef.value) {
        inputFileRef.value.value = ''
      }
    }
    const handlerFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        const files = Array.from(target.files)
        const file = files[0]
        if (props.beforeUpload) {
          if (!props.beforeUpload(file)) {
            resetFile()
            return
          }
        }
        const formData = new FormData()
        formData.append('file', file)
        uploadStatus.value = 'loading'
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(({ data: rawData }) => {
          uploadStatus.value = 'success'
          context.emit('file-uploaded', rawData)
          uploadFile.value = rawData.data
          resetFile()
        }).catch(error => {
          uploadStatus.value = 'error'
          context.emit('file-uploaded-error', error)
          resetFile()
        })
      }
    }
    return {
      inputFileRef,
      uploadStatus,
      handlerUpload,
      handlerFileChange,
      uploadFile
    }
  }
})
</script>

<style scoped>
.file-upload-container {
  height: 200px;
  overflow: hidden;
  cursor: pointer;
}
.file-upload-container .preview-container:hover h2 {
  display: block !important;
}
.file-upload-container .preview-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
