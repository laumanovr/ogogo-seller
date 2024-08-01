<template>
  <SModal v-model="isShowModal" height="auto">
    <SLoader fullScreen v-if="isLoading" />
    <p class="font-bold s-mb-5">
      {{ $t("lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505") }}
    </p>
    <SForm ref="productForm">
      <SSelect
        :label="$t('lang-89bfcd93-3986-425f-b7f8-732462da1a5f')"
        class="s-w-full"
        :items="allCategories"
        :rules="[requiredField]"
        itemTitle="categoryName"
        itemValue="id"
        v-model="parentCategoryId"
        @change="selectParentCategory"
      />
      <SSelect
        v-for="(select, i) in subCategorySelects"
        :key="i"
        :label="$t('lang-97c9b3e4-5040-4730-b73e-3ebf3309f13a')"
        class="s-w-full"
        :class="{ 'error-select': select.isEmpty }"
        :items="select.items"
        itemTitle="categoryName"
        itemValue="id"
        v-model="select.selectedCategoryId"
        @change="selectChildCategory($event, i)"
      />
      <div
        class="s-flex s-flex-row s-w-full s-gap-3 s-mt-2 s-justify-between light"
      >
        <SButton type="secondary" class="button s-w-1/2" @click="toggleModal">
          {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}
        </SButton>
        <SButton class="button s-w-1/2" @click="goToCreateProduct">
          {{ $t("lang-aea72790-6410-4376-9965-2a4ccbce8e9a") }}
        </SButton>
      </div>
    </SForm>
  </SModal>
</template>

<script lang="ts" setup>
import { SSelect, SModal, SButton, SForm, SLoader } from "@tumarsoft/ogogo-ui";
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
const isLoading = ref(false);

const allCategories = computed(() =>
  categoryStore.categories.map((category) => ({
    ...category,
    categoryName: category?.categoryName || "",
  }))
);

onMounted(() => {
  fetchAllCategories();
});

const fetchAllCategories = () => {
  isLoading.value = true;
  categoryStore.getAllCategories().finally(() => {
    isLoading.value = false;
  });
};

const toggleModal = () => {
  subCategorySelects.value = [];
  isShowModal.value = !isShowModal.value;
};

const selectParentCategory = (clickedCategoryId: string) => {
  const selectedCategory = allCategories.value.find(
    (category) => category.id === clickedCategoryId
  );
  subCategorySelects.value = [];
  nextTick(() => {
    if (selectedCategory.childMarketplaceCategories?.length) {
      subCategorySelects.value = [
        {
          items: selectedCategory.childMarketplaceCategories,
          name: selectedCategory.categoryName,
        },
      ];
    }
  });
};

const selectChildCategory = (childCategoryId: string, index: number) => {
  checkValidation();
  subCategorySelects.value = subCategorySelects.value.filter(
    (_, subIndex) => subIndex <= index
  );
  nextTick(() => {
    const childCategory = subCategorySelects.value
      .at(-1)
      .items.find((child: any) => child.id === childCategoryId);
    if (childCategory && childCategory.childMarketplaceCategories?.length) {
      subCategorySelects.value.push({
        id: childCategory?.id,
        name: childCategory.categoryName,
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

const prepareBreadcrumbs = () => {
  let selectedCategoryUrls;
  if (subCategorySelects.value.length) {
    const lastSelectedSubCategory = subCategorySelects.value.at(-1);
    const foundObject = lastSelectedSubCategory.items.find(
      (item: any) => item.id === lastSelectedSubCategory.selectedCategoryId
    );
    selectedCategoryUrls = [
      ...subCategorySelects.value,
      { name: foundObject.categoryName },
    ];
  } else {
    const parentCategory = allCategories.value.find(
      (item) => item.id === parentCategoryId.value
    );
    selectedCategoryUrls = [{ name: parentCategory.categoryName }];
  }
  categoryStore.saveSelectedCategoryPath(selectedCategoryUrls);
};

const goToCreateProduct = () => {
  productForm.value.validate().then((isValid: boolean) => {
    if (isValid && checkValidation()) {
      let selectedCategoryId;
      if (subCategorySelects.value.length) {
        selectedCategoryId = subCategorySelects.value.at(-1).selectedCategoryId;
      } else {
        selectedCategoryId = parentCategoryId.value;
      }
      prepareBreadcrumbs();
      toggleModal();
      router.push(`/product-create?id=${selectedCategoryId}`);
    }
  });
};

defineExpose({
  toggleModal,
});
</script>

<style lang="scss">
@import "../../../../app/style/colors.scss";
.dropdown.error-select {
  input {
    border-color: $red-500;
  }
}
</style>
