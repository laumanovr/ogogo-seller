<template>
  <!-- TODO: remove unused classes -->
  <div class="product-create-content">
    <!-- TODO: remove preset classes and use ui kit classes -->
    <!-- TODO: set theme class at layout level -->
    <div class="d-flex items-center light">
      <SButton type="secondary" variant="outlined" @click="goBack">
        <SIconRender name="chevron-left" size="small" />
        <!-- TODO: localize text -->
        <span>Назад</span>
      </SButton>
      <!-- TODO: use computed getter for categoryUrls -->
      <Breadcrumbs :items="categoryStore.categoryUrls" class="s-ml-5" />
    </div>
    <!-- TODO: remove preset classes and use ui kit classes -->
    <div class="d-flex s-mt-5">
      <ProductTemplate />
      <ProductForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SIconRender } from "@tumarsoft/ogogo-ui";
// TODO: use absolute path. example: import ProductTemplate from "@/widgets/product-create/ui/ProductTemplate.vue";
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
  // TODO: use actions and set value of reactive data there
  productStore.productTemplate = { photos: [], videos: [] };
});

const goBack = () => {
  // TODO: use name for router params. example: router.push({ name: "products" });  
  router.push("/products");
};
</script>
