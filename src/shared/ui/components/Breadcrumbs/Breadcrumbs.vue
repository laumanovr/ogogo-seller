<template>
  <div class="breadcrumbs-container">
    <div class="breadcrumb-item" v-for="(item, i) in props.items" :key="i">
      <span class="item">{{ item.name }}</span>
      <span v-show="i !== props.items.length - 1">/</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});
</script>

<style lang="scss">
.breadcrumbs-container {
  display: flex;
  .breadcrumb-item {
    display: flex;
    font-weight: 600;
    font-size: 16px;
    a {
      text-decoration: none;
      color: #000;
    }
    span {
      margin: 0 6px;
      &.item {
        margin: 0 2px;
      }
    }
  }
}
</style>
