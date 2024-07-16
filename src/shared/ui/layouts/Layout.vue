<template>
  <Header />
  <div class="wrapper-layout s-pl-10 s-pr-10 s-pb-10 light">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/shared/ui/layouts/Header.vue";
</script>

<style>
.wrapper-layout {
  max-width: 1440px;
  margin: 0 auto;
}
</style>
