<template>
  <SModal :isModalOpen="isShowModal" @onClose="toggleModal" height="auto">
    <p class="font-bold mb-24">
      {{ $t("lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505") }}
    </p>
    <SForm ref="productForm">
      <SSelect
        :label="$t('lang-89bfcd93-3986-425f-b7f8-732462da1a5f')"
        class="w-p-100"
        :items="allCategories"
        :rules="requiredField"
        showValue="categoryName"
        getValue="id"
        v-model="parentCategoryId"
        @onChange="selectParentCategory"
      />
      <SSelect
        v-for="(select, i) in subCategorySelects"
        :key="i"
        :label="$t('lang-97c9b3e4-5040-4730-b73e-3ebf3309f13a')"
        class="w-p-100 mt-16"
        :class="{ 'error-select': select.isEmpty }"
        :items="select.items"
        showValue="categoryName"
        getValue="id"
        v-model="select.selectedCategoryId"
        @onChange="selectChildCategory($event, i)"
      />
      <div class="flex flex-row w-p-100 gap-2 mt-36 justify-between">
        <SButton color="gray" class="button w-p-49" @click="toggleModal">
          {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}
        </SButton>
        <SButton
          color="violet"
          class="button w-p-49"
          @click="goToCreateProduct"
        >
          {{ $t("lang-aea72790-6410-4376-9965-2a4ccbce8e9a") }}
        </SButton>
      </div>
    </SForm>
  </SModal>
</template>

<script lang="ts" setup>
import { SSelect, SModal, SButton, SForm } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, computed, nextTick } from "vue";
import { requiredField } from "@/shared/lib/utils/rules";
import { useCategoryStore } from "@/entities/category/store/category.store";
import { useRouter } from "vue-router";

const router = useRouter();
const categoryStore = useCategoryStore();
const isShowModal = ref(false);
const subCategorySelects = ref([]);
const parentCategoryId = ref("");
const productForm = ref(null);

const allCategories = computed(() => categoryStore.categories);

onMounted(() => {
  fetchAllCategories();
});

const fetchAllCategories = async () => {
  await categoryStore.getAllCategories();
};

const toggleModal = () => {
  isShowModal.value = !isShowModal.value;
};

const selectParentCategory = (selectedCategory: any) => {
  if (selectedCategory.childMarketplaceCategories.length) {
    subCategorySelects.value = [
      { items: selectedCategory.childMarketplaceCategories },
    ];
  } else {
    subCategorySelects.value = [];
  }
};

const selectChildCategory = (childCategory: any, index: number) => {
  checkValidation();
  nextTick(() => {
    subCategorySelects.value = subCategorySelects.value.filter(
      (_, subIndex) => subIndex <= index
    );
    if (childCategory.childMarketplaceCategories.length) {
      subCategorySelects.value.push({
        items: childCategory.childMarketplaceCategories,
      });
    }
  });
};

const checkValidation = () => {
  subCategorySelects.value = subCategorySelects.value.map((selectItem) => {
    selectItem.isEmpty = !selectItem.selectedCategoryId;
    return selectItem;
  });
  return subCategorySelects.value.every((selectItem) => !selectItem.isEmpty);
};

const goToCreateProduct = () => {
  if (productForm.value.validateForm() && checkValidation()) {
    console.log("--allValid--");
    let selectedCategoryId;
    if (subCategorySelects.value.length) {
      selectedCategoryId = subCategorySelects.value.at(-1).selectedCategoryId;
    } else {
      selectedCategoryId = parentCategoryId.value;
    }
    console.log("selectedCategoryId", selectedCategoryId);
    // router.push(`/product-create?catId=${selectedCategoryId}`);
  }
};

defineExpose({
  toggleModal,
});
</script>

<style lang="scss">
@import "../../../../app/style/colors.scss";
.error-select {
  input {
    border-color: $red-500;
  }
}
</style>
