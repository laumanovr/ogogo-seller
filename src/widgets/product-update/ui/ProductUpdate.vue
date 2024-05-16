<!-- <template>
  <div class="product-update-content">
    <div class="d-flex items-center">
      <SButton color="white" @click="goBack">
        <SIconRender name="ArrowIcon" direction="left" color="black" />
        <span>Назад</span>
      </SButton>
      <Breadcrumbs
        :items="categoryStore.categoryUrls"
        class="ml-24"
        :key="breadcrumbKey"
      />
    </div>
    <div class="d-flex mt-25">
      <ProductTemplate />
      <ProductForm
        mode="update"
        :product-category-id="productCategoryId"
        v-if="isShowForm"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
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
const isShowForm = ref(false);
const breadcrumbKey = ref(0);

onMounted(() => {
  productStore.getExactProductById(route.params.id).then((response) => {
    console.log(response);
    productCategoryId.value = response.result.categoryId;
    isShowForm.value = true;
    nextTick(() => {
      breadcrumbKey.value++;
    });
  });
});

const goBack = () => {
  router.push("/products");
};
</script> -->
