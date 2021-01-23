<template>
  <teleport to="#message">
    <div class="fixed-top w-100" v-if="isShow">
      <div
        class="message-container alert alert-dismissible show fade w-50 mx-auto mt-3"
        :class="[`alert-${type}`]"
      >
        <span>{{ message }}</span>
        <button type="button" class="btn-close" @click.prevent="closeMessage"></button>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'
export type MessageType = 'success' | 'danger' | 'default'
export default defineComponent({
  name: 'Message',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup (props, context) {
    const isShow = ref(true)
    useDOMCreate('message')
    const closeMessage = () => {
      isShow.value = false
      context.emit('close-message', true)
    }
    return {
      isShow,
      closeMessage
    }
  }
})
</script>

<style scoped>
@media (max-width: 576px) {
  .message-container {
    width: 80% !important;
  }
}
</style>
