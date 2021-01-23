<template>
  <div class="dropdown" ref="dropdownRef">
    <a class="btn btn-outline-light dropdown-toggle" href="#" @click.prevent="isOpen = !isOpen">
      {{ title }}
    </a>
    <ul v-if="isOpen" class="dropdown-menu" :style="{ display: 'block' }">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
import mitt, { Emitter } from 'mitt'
export const emitter: Emitter = mitt()
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<HTMLElement | null>(null)
    const isOutside = useClickOutside(dropdownRef)
    watch(isOutside, () => {
      if (isOutside.value && isOpen.value) {
        isOpen.value = false
      }
    })
    const callback = () => {
      isOpen.value = false
    }
    emitter.on('click-item', callback)
    onUnmounted(() => {
      emitter.off('click-item', callback)
    })
    return {
      isOpen,
      dropdownRef
    }
  }
})
</script>

<style>

</style>
