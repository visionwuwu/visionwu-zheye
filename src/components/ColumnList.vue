<template>
  <div class="row">
    <div v-for="column in columns" :key="column._id" class="col-lg-4 mb-4 col-md-6 col-sm-6">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img v-if="column.avatar && (column.avatar.url || column.avatar.fitUrl)" class="rounded-circle border border-light w-25 my-3" :src="column.avatar.url" :alt="column.title" />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link :to="{ name: 'ColumnDetail', params: { id: column._id } }" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '../store'
import { generateFitUrl } from '../utils/helper'
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columns = computed(() => {
      return props.list.map(c => {
        if (!c.avatar) {
          c.avatar = {
            url: '~@/assets/column.jpg'
          }
        } else {
          generateFitUrl(c.avatar, 50, 50)
        }
        return c
      })
    })
    return {
      columns
    }
  }
})
</script>

<style>
</style>
