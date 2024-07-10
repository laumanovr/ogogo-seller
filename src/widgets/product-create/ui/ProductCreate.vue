<template>
  <div class="product-create-content">
    <div class="d-flex items-center light">
      <SButton type="secondary" variant="outlined" @click="goBack">
        <SIconRender name="chevron-left" size="small" />
        <span>Назад</span>
      </SButton>
      <Breadcrumbs :items="categoryStore.categoryUrls" class="s-ml-5" />
    </div>
    <div class="d-flex s-mt-5">
      <ProductTemplate />
      <ProductForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SIconRender } from "@tumarsoft/ogogo-ui";
import ProductTemplate from "../../../shared/ui/components/product/ProductTemplate.vue";
import ProductForm from "../../../shared/ui/components/product/ProductForm.vue";
import Breadcrumbs from "@/shared/ui/components/Breadcrumbs/Breadcrumbs.vue";
import { useCategoryStore } from "@/entities/category/store/category.store";
import { useProductStore } from "@/entities/products/store/product.store";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";

const router = useRouter();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

onBeforeMount(() => {
  productStore.productTemplate = { photos: [], videos: [] };
});

const goBack = () => {
  router.push("/products");
};
</script>
