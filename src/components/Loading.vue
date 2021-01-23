<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center vh-100 text-center loading-container"
      :style="{backgroundColor: background}"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ text || 'Loading...' }}</span>
        </div>
        <p class="text-primary">{{text}}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'
export default defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String,
      default: 'Loading...'
    },
    background: {
      type: String,
      default: ''
    }
  },
  setup () {
    useDOMCreate('back')
  }
})
</script>

<style scoped>
.loading-container {
  background: rgba(255, 255, 255, .5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
}
</style>
