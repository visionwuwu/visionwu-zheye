<template>
  <li @click.stop="handlerClick" :class="['dropdown-item-options', {'is-disabled': disabled}]">
    <slot></slot>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { emitter } from './Dropdown.vue'
export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const handlerClick = () => {
      if (!props.disabled) {
        emitter.emit('click-item')
      }
    }
    return {
      handlerClick
    }
  }
})
</script>

<style>
.dropdown-item-options.is-disabled *{
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
