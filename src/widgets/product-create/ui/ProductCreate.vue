<template>
  <div class="product-create-content">
    <div class="d-flex items-center">
      <SButton color="white">
        <SIconRender name="ArrowIcon" direction="left" color="black" />
        <span>Назад</span>
      </SButton>
    </div>

    <div class="d-flex mt-25">
      <ProductTemplate />

      <div class="form-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SIconRender } from "@tumarsoft/ogogo-ui";
import ProductTemplate from "../../../shared/ui/components/product/ProductTemplate.vue";
// import { ref } from "vue";
</script>

<style lang="scss">
@import "../../../app/style/colors.scss";
.product-create-content {
  .form-container {
    width: 68%;
    height: 200px;
    border: 1px solid;
  }
}
</style>
