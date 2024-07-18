<template>
  <div class="product-update-content">
    <div class="s-flex s-items-center light">
      <SButton type="secondary" variant="outlined" @click="goBack">
        <SIconRender name="chevron-left" size="small" />
        <!-- TODO: Localize -->
        <span>Назад</span>
      </SButton>
      <!-- TODO: use computed getter from store for category urls -->
      <Breadcrumbs
        :items="categoryStore.categoryUrls"
        class="s-ml-5"
        :key="breadcrumbKey"
      />
    </div>
    <div class="s-flex s-mt-5">
      <ProductTemplate />
      <!-- TODO: use global mode enum -->
      <ProductForm
        mode="update"
        :product-category-id="productCategoryId"
        v-if="isShowForm"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { SButton, SIconRender } from "@tumarsoft/ogogo-ui";
import ProductTemplate from "../../../shared/ui/components/product/ProductTemplate.vue";
import ProductForm from "../../../shared/ui/components/product/ProductForm.vue";
import Breadcrumbs from "@/shared/ui/components/Breadcrumbs/Breadcrumbs.vue";
import { useCategoryStore } from "@/entities/category/store/category.store";
import { useProductStore } from "@/entities/products/store/product.store";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const productCategoryId = ref("");
// TODO: isShowForm is the same as productCategoryId
const isShowForm = ref(false);
// TODO: using breadcrumbKey as a counter means that breadcrumbs is not reactive to its items. fix breadcrumbs component in the first place
const breadcrumbKey = ref(0);

onMounted(() => {
  // TODO: make sure that route.params.id is a string and is not undefined
  productStore
    .getExactProductById(route.params.id as string)
    .then((response) => {
      // TODO: set data to store state
      const foundProduct = response.result;
      productCategoryId.value = foundProduct.categoryId;
      productStore.setSelectedTemplateOrProduct({
        product: foundProduct,
        type: "product",
      });
      isShowForm.value = true;
      setTimeout(() => {
        breadcrumbKey.value++;
      }, 500);
    });
});

const goBack = () => {
  // TODO: use name for route params instead of hardcoded string
  router.push("/products");
};
</script>
