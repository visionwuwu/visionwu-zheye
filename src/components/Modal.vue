<template>
  <teleport to="#modal">
    <div class="modal d-block" v-if="visible">
      <div class="modal-dialog modal-dialog-centered w-75 mx-auto">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button @click="onCloseModal" type="button" class="btn-close" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="onCloseModal">{{cancelText}}</button>
            <button type="button" class="btn btn-primary" @click="onConfirmModal">{{confirmText}}</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'
export default defineComponent({
  name: 'Modal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '模态框'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    }
  },
  emits: [
    'modal-on-close',
    'modal-on-confirm'
  ],
  setup (props, context) {
    useDOMCreate('modal')
    const onCloseModal = () => {
      context.emit('modal-on-close')
    }
    const onConfirmModal = () => {
      context.emit('modal-on-confirm')
    }
    return {
      onCloseModal,
      onConfirmModal
    }
  }
})
</script>

<style>

</style>
