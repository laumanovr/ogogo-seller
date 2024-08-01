<template>
  <div class="product-content">
    <div class="s-text-h-2 s-mb-6 s-mt-6">
      {{ $t("lang-6a3f0b82-3b93-4348-8788-a2ea2dcb2c88") }}
    </div>
    <template v-if="hasProducts">
      <div class="s-flex s-justify-between">
        <div class="s-flex filter-search-container">
          <SInput isSearchable hide-details @input="onSearch" />
          <SButton
            variant="outlined"
            type="secondary"
            class="s-ml-3"
            @click="toggleFilterModal"
          >
            <SIconRender name="filter" size="small" class="s-mr-2" />
            {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
          </SButton>
        </div>
        <SButton @click="openCreateProductModal">
          <SIconRender name="plus" class="s-text-white s-mr-2" />
          {{ $t("lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505") }}
        </SButton>
      </div>
      <STabs :tab-mode="'filter-tabs'" class="s-mt-5 s-mb-5">
        <STabItem
          :value="ProductStatus.PUBLISHED"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-dd1a9bc2-31f2-4197-9a7d-01a23229ea82") }}
        </STabItem>
        <STabItem
          :value="ProductStatus.ALL"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-7db32df9-54d2-4561-ba8b-c43073ee42e9") }}
        </STabItem>
        <STabItem
          :value="ProductStatus.AWAITING_MODERATION"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-938e2295-e2c3-40b2-a4d0-024ab55a3c53") }}
        </STabItem>
        <STabItem
          :value="ProductStatus.REQUIRE_IMPROVEMENT"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-7b040343-d1ec-4f64-94f6-39bad5df1c49") }}
        </STabItem>
        <STabItem
          :value="ProductStatus.DRAFT"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-7b5895ca-c485-48ea-abfc-b8c9198f3826") }}
        </STabItem>
        <STabItem
          :value="ProductStatus.ARCHIVED"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-9801cd40-7281-47f7-8478-6731dc9d8388") }}
        </STabItem>
      </STabs>
      <STable
        :headers="tableHeaders"
        :data="tableData"
        :totalItems="totalItems"
        :loading="isLoading"
        itemsPerPage="10"
        paginateRange="2"
        @onSelectPage="onChangePage"
        v-if="hasStatusProducts"
      >
        <template v-slot:productName="{ item }">
          <div class="s-flex s-items-center product">
            <img
              :src="getFullIcon(item.iconBase64)"
              alt="img"
              v-if="item.iconBase64"
            />
            <span class="name">{{ item.productName }}</span>
          </div>
        </template>
        <template v-slot:status="{ item }">
          <SBadge
            :content="getStatusData(item, 'name')"
            :color="getStatusData(item, 'color')"
          />
        </template>
        <template v-slot:price="{ item }">
          <div>
            {{ item.price }}
            {{ $t("lang-0143ecc9-a4c2-415a-9338-5a701228a8a2") }}
          </div>
          <div class="price-usd">{{ item.priceUsd }} $</div>
        </template>
        <template v-slot:priceWithDiscount="{ item }">
          <div>
            {{ item.priceWithDiscount }}
            {{ $t("lang-0143ecc9-a4c2-415a-9338-5a701228a8a2") }}
          </div>
          <div class="price-usd">{{ item.priceUsdWithDiscount }} $</div>
        </template>
        <template v-slot:action="{ item }">
          <SIconRender
            name="pencil"
            class="s-text-gray-500"
            @click="onEditProduct(item)"
          />
        </template>
      </STable>
    </template>
    <template v-else>
      <EmptyData
        :text="$t('lang-8fdbc6ac-fe6c-4aee-b8c4-2ebc312b7505')"
        :button-title="$t('lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505')"
        @click="openCreateProductModal"
      />
    </template>

    <CategoryModal ref="categoryModal" />

    <SModal
      v-model="isOpenFilterModal"
      class="filter-modal"
      width="420px"
      position="right"
      @onClose="toggleFilterModal"
    >
      <div class="modal-content" ref="modalContent">
        <div class="filter-title">
          {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
        </div>

        <div class="section">
          <div class="section-title">
            {{ $t("lang-333319c2-2df4-4057-a56a-28ddd7a790a1") }}
          </div>
          <div class="s-flex">
            <SInput
              :placeHolder="$t('lang-8b476311-980c-42d5-92a9-dcf3f5809d18')"
              type="number"
              v-model.number="priceRange.min"
            />
            <SInput
              :placeHolder="$t('lang-846ca970-3a56-41ae-9d90-6334b3a6b260')"
              class="s-ml-2"
              type="number"
              v-model.number="priceRange.max"
            />
          </div>
        </div>

        <div class="section">
          <div class="section-title">
            {{ $t("lang-75805fdb-eac2-4c87-b481-563e318789b5") }}
          </div>
          <SInput isSearchable @input="onSearchCategory" />
          <div class="property-items">
            <div
              v-for="category in categories"
              :key="category.id"
              ref="checkboxRefs"
            >
              <SCheckbox @onChange="onSelectCategory($event, category.id)">
                {{ category.categoryName }}
              </SCheckbox>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-actions light">
        <SButton size="large" type="secondary" @click="clearFilter">
          {{ $t("lang-7967cf86-49d6-41c2-bdd7-23c6f8e5e8ea") }}
        </SButton>
        <SButton size="large" @click="filterBy">
          {{ $t("lang-bdc9ab1e-91af-43ea-8bb9-e23c8ea98755") }}
        </SButton>
      </div>
    </SModal>
  </div>
</template>

<script lang="ts" setup>
import {
  SModal,
  SButton,
  STabs,
  STabItem,
  STable,
  SBadge,
  SInput,
  SCheckbox,
  SIconRender,
} from "@tumarsoft/ogogo-ui";
import { EmptyData } from "@/shared/ui/components/empty-data";
import CategoryModal from "@/shared/ui/components/product/CategoryModal.vue";
import { ref, onMounted, computed, Ref } from "vue";
import { ProductStatus, ProductType } from "@/shared/lib/utils/enums";
import { tableHeaders } from "@/shared/helpers/helper";
import { useProductStore } from "@/entities/products/store/product.store";
import { useCategoryStore } from "@/entities/category/store/category.store";
import { useRouter } from "vue-router";
import { getFullIcon } from "@/shared/composable";
import i18n from "@/shared/lib/plugins/i18n";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const statuses = ref([
  {
    id: ProductStatus.ALL,
    name: i18n.global.t("lang-7db32df9-54d2-4561-ba8b-c43073ee42e9"),
    color: "green",
  },
  {
    id: ProductStatus.DRAFT,
    name: i18n.global.t("lang-7b5895ca-c485-48ea-abfc-b8c9198f3826"),
    color: "grey",
  },
  {
    id: ProductStatus.PUBLISHED,
    name: i18n.global.t("lang-aa314c3b-22d1-49c4-abf0-c8153a445ea4"),
    color: "green",
  },
  {
    id: ProductStatus.AWAITING_MODERATION,
    name: i18n.global.t("lang-938e2295-e2c3-40b2-a4d0-024ab55a3c53"),
    color: "blue",
  },
  {
    id: ProductStatus.AWAITING_APPROVE_TO,
    name: i18n.global.t("lang-f4c62d07-e267-41ea-9695-e63c17e1601c"),
    color: "orange",
  },
  {
    id: ProductStatus.APPROVED,
    name: i18n.global.t("lang-a95d3772-a255-4ae6-b88a-d15f9903b202"),
    color: "green",
  },
  {
    id: ProductStatus.ARCHIVED,
    name: i18n.global.t("lang-d5753b25-3e39-4fbd-9ae2-bf2c05a41896"),
    color: "dark-grey",
  },
  {
    id: ProductStatus.REQUIRE_IMPROVEMENT,
    name: i18n.global.t("lang-7b040343-d1ec-4f64-94f6-39bad5df1c49"),
    color: "red",
  },
  {
    id: ProductStatus.BLOCKED,
    name: i18n.global.t("lang-a2dc3ce2-664b-42fe-9800-5849e5f23e7e"),
    color: "red",
  },
]);

const tab = ref(0);
const searchTimer = ref(null);
const isOpenFilterModal = ref(false);
const modalContent = ref(null);
const priceRange = ref({ min: 0, max: 0 });
const selectedCategories = ref([]);
const checkboxRefs: Ref<HTMLDivElement[]> = ref([]);
const categoryModal = ref(null);
const isLoading = ref(false);

const currentStatus = computed(() =>
  Number(tab.value) ? { statuses: [Number(tab.value)] } : {}
);
const hasProducts = computed(() => productStore.getHasProducts);
const hasStatusProducts = computed(() => productStore.getHasStatusProducts);
const totalItems = computed(() => productStore.getTotalItems);
const tableData = computed(() => productStore.getProducts);
const categories = computed(() => categoryStore.getPagedCategories);

onMounted(() => {
  selectTab(ProductStatus.ALL);
});

const fetchProducts = (filterObj = {}) => {
  isLoading.value = true;
  productStore
    .getAllProducts({ productType: ProductType.NEW, ...filterObj })
    .then(() => {
      fetchCategoriesByPage("");
    });
};

const fetchCategoriesByPage = (searchValue: string) => {
  isLoading.value = true;
  categoryStore
    .getCategoriesPagedList({ search: searchValue, pageSize: 30 })
    .finally(() => {
      isLoading.value = false;
    });
};

const selectTab = (value: number) => {
  tab.value = value;
  fetchProducts(currentStatus.value);
};

const onChangePage = (page: number) => {
  fetchProducts({ ...currentStatus.value, pageIndex: page - 1 });
};

const onSearch = (value: string) => {
  window.clearTimeout(searchTimer.value);
  searchTimer.value = window.setTimeout(() => {
    fetchProducts({ search: value });
  }, 1500);
};

const getStatusData = (item: any, field: string) => {
  const foundStatus = statuses.value.find(
    (statusObj) => statusObj.id === item.status
  );
  return field === "name" ? foundStatus?.name : foundStatus?.color;
};

const toggleFilterModal = () => {
  isOpenFilterModal.value = !isOpenFilterModal.value;
};

const filterBy = () => {
  const filterCategories = selectedCategories.value.length
    ? { categories: selectedCategories.value }
    : {};
  fetchProducts({ priceRange: priceRange.value, ...filterCategories });
};

const clearFilter = () => {
  priceRange.value.max = 0;
  priceRange.value.min = 0;
  selectedCategories.value = [];
  checkboxRefs.value.forEach((elem) => {
    const input = elem.querySelector("input");
    input.checked = false;
  });
};

const onSearchCategory = (event: Event) => {
  const target = event.target as HTMLInputElement;
  window.clearTimeout(searchTimer.value);
  searchTimer.value = window.setTimeout(() => {
    fetchCategoriesByPage(target.value);
  }, 1500);
};

const onSelectCategory = (isChecked: boolean, categoryId: string) => {
  if (isChecked) {
    selectedCategories.value.push(categoryId);
  } else {
    const index = selectedCategories.value.findIndex(
      (item) => item.id === categoryId
    );
    selectedCategories.value.splice(index, 1);
  }
};

const openCreateProductModal = () => {
  categoryModal.value.toggleModal();
};

const onEditProduct = (item: any) => {
  router.push({ name: "productUpdate", params: { id: item.id } });
};
</script>

<style lang="scss" scoped>
@import "../../../app/style/colors.scss";
.product-content {
  .filter-search-container {
    width: 65%;
  }
  .filter-search {
    width: 100%;
  }
  .price-usd {
    color: $gray-500;
    font-weight: 500;
    font-size: 12px;
    margin-top: 4px;
  }
  .product {
    .name {
      display: inline-block;
      max-height: 40px;
      line-height: 20px;
      overflow-y: hidden;
      margin-left: 8px;
    }
    img {
      width: 44px;
      height: 44px;
    }
  }
}

.filter-modal {
  .modal-content {
    height: calc(100% - 75px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $gray-300;
      border-radius: 4px;
    }
  }

  .filter-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 35px;
  }

  .section {
    &:not(:last-child) {
      margin-bottom: 30px;
    }

    &-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }

  .checkbox-title {
    font-size: 14px;
    font-weight: 500;
  }

  .checkbox-container {
    margin-bottom: 8px;
  }

  .property-items {
    overflow-y: auto;
    margin-top: 15px;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $gray-300;
      border-radius: 4px;
    }
  }

  .input-container {
    width: calc(100% - 10px);
  }

  .filter-actions {
    display: flex;
    justify-content: space-between;
    padding: 24px 0 24px;
    position: absolute;
    bottom: 0;
    width: calc(100% - 56px);

    .button {
      width: calc(50% - 4px);
    }
  }
}
</style>
