<template>
  <input type="checkbox" :checked="inputChecked" @change="changeChecked" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    checked: Boolean
  },
  setup (props, context) {
    const inputChecked = ref(props.checked || false)
    const changeChecked = (e: any) => {
      inputChecked.value = e.target.checked
      context.emit('update:modelValue', e.target.checked)
    }
    return {
      inputChecked,
      changeChecked
    }
  }
})
</script>

<style>

</style>
