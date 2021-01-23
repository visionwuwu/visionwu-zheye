<template>
  <form class="validate-form">
    <slot name="default"></slot>
    <div class="form-submit d-inline-block" @click.prevent="formSubmit">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Emitter } from 'mitt'
export type ValidateCallback = () => boolean
export const emitter: Emitter = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let validateCallbacks: ValidateCallback[] = []
    const formSubmit = () => {
      const result = validateCallbacks.map(fn => fn()).every(result => result)
      context.emit('form-submit', result)
    }
    function callback (result: ValidateCallback) {
      validateCallbacks.push(result)
    }
    emitter.on<any>('form-item-created', callback)
    onUnmounted(() => {
      emitter.off<any>('form-item-created', callback)
      validateCallbacks = []
    })
    return {
      formSubmit
    }
  }
})
</script>
<style>

</style>
