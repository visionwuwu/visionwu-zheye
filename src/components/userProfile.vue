<template>
  <div class="d-flex align-items-center">
    <img class="rounded-circle img-thumbnail" :src="fitUrl" :alt="userProfile.nickName">
    <div class="ms-2">
      <h6 class="mb-0">{{userProfile.nickName}}</h6>
      <p class="text-muted my-1">{{userProfile.description}}</p>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UserProps } from '@/store'
import { addColumnAvatar } from '@/utils/helper'
export default defineComponent({
  name: 'UserProfile',
  props: {
    userProfile: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup (props) {
    const fitUrl = computed(() => {
      addColumnAvatar(props.userProfile, 50, 50)
      const { avatar } = props.userProfile
      return avatar && (avatar.url ? avatar.fitUrl : avatar.fitUrl.default)
    })
    return {
      fitUrl
    }
  }
})
</script>
<style>

</style>
