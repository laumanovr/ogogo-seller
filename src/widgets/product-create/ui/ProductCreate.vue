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
      <ProductForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SIconRender } from "@tumarsoft/ogogo-ui";
import ProductTemplate from "../../../shared/ui/components/product/ProductTemplate.vue";
import ProductForm from "../../../shared/ui/components/product/ProductForm.vue";
</script>
