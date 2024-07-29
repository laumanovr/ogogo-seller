<template>
  <div>
    <div class="s-flex s-items-center">
      <SButton type="secondary" variant="outlined" @click="goBack">
        <SIconRender name="chevron-left" size="small" class="s-mr-1" />
        <span>{{ $t("lang-943d7231-c402-4b11-929c-b26a3ee10276") }}</span>
      </SButton>
      <Breadcrumbs :items="categoryUrls" class="s-ml-5" />
    </div>
    <div class="s-flex s-mt-5">
      <ProductTemplate />
      <ProductForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SIconRender } from "@tumarsoft/ogogo-ui";
import ProductTemplate from "@/shared/ui/components/product/ProductTemplate.vue";
import ProductForm from "@/shared/ui/components/product/ProductForm.vue";
import Breadcrumbs from "@/shared/ui/components/Breadcrumbs/Breadcrumbs.vue";
import { useCategoryStore } from "@/entities/category/store/category.store";
import { useProductStore } from "@/entities/products/store/product.store";
import { useRouter } from "vue-router";
import { onBeforeMount, computed } from "vue";

const router = useRouter();
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const categoryUrls = computed(() => categoryStore.getCategoryUrls);

onBeforeMount(() => {
  productStore.setEmpty();
});

const goBack = () => {
  router.push({ name: "products" });
};
</script>
