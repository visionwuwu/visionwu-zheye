<template>
  <div class="container border-bottom p-3 mb-4">
    <div class="row">
      <div class="col-3">
        <img class="rounded-circle border w-100" :src="fitUrl" :alt="column.title">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-secondary">{{column.description}}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../store'
import { addColumnAvatar } from '../utils/helper'
export default defineComponent({
  name: 'Column',
  props: {
    column: {
      type: Object as PropType<ColumnProps>,
      required: true
    }
  },
  setup (props) {
    const fitUrl = computed(() => {
      addColumnAvatar(props.column, 100, 100)
      const { avatar } = props.column
      return avatar && avatar.fitUrl
    })
    return {
      fitUrl
    }
  }
})
</script>

<style>

</style>
