<template>
  <div class="product-update-content">
    <div class="s-flex s-items-center">
      <SButton type="secondary" variant="outlined" @click="goBack">
        <SIconRender name="chevron-left" size="small" />
        <span>{{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}</span>
      </SButton>
      <Breadcrumbs :items="categoryUrls" class="s-ml-5" :key="breadcrumbKey" />
    </div>
    <div class="s-flex s-mt-5">
      <ProductTemplate />
      <ProductForm
        :mode="ProductMode.UPDATE"
        :product-category-id="productCategoryId"
        v-if="isShowForm"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { SButton, SIconRender } from "@tumarsoft/ogogo-ui";
import ProductTemplate from "../../../shared/ui/components/product/ProductTemplate.vue";
import ProductForm from "../../../shared/ui/components/product/ProductForm.vue";
import Breadcrumbs from "@/shared/ui/components/Breadcrumbs/Breadcrumbs.vue";
import { useCategoryStore } from "@/entities/category/store/category.store";
import { useProductStore } from "@/entities/products/store/product.store";
import { useRouter, useRoute } from "vue-router";
import { ProductMode } from "@/shared/lib/utils/enums";

const categoryUrls = computed(() => categoryStore.getCategoryUrls);
const productCategoryId = computed(() => productStore.getProductCategoryId);
const router = useRouter();
const route = useRoute();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const isShowForm = ref(false);
// TODO: using breadcrumbKey as a counter means that breadcrumbs is not reactive to its items. fix breadcrumbs component in the first place
const breadcrumbKey = ref(0);

onMounted(() => {
  productStore.getExactProductById(route.params.id as string).then(() => {
    isShowForm.value = true;
    setTimeout(() => {
      breadcrumbKey.value++;
    }, 500);
  });
});

const goBack = () => {
  router.push({ name: "products" });
};
</script>
