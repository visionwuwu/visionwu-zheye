<template>
  <div class="py-4 text-muted text-center fw-bold">
    {{text}}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NotThings',
  props: {
    text: {
      type: String,
      default: '没有任何数据'
    }
  }
})
</script>

<style>

</style>
