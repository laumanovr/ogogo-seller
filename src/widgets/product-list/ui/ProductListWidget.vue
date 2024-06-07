<template>
  <div class="product-content">
    <div class="head-title">
      {{ $t("lang-6a3f0b82-3b93-4348-8788-a2ea2dcb2c88") }}
    </div>
    <template v-if="hasProducts">
      <div class="flex justify-between">
        <div class="flex filter-search-container">
          <FilterSearch @input="onSearch" @click="toggleFilterModal" />
          <!-- <SButton color="white" class="ml-12">Настроить цены</SButton> -->
        </div>
        <div class="light">
          <SButton @click="openCreateProductModal">
            + {{ $t("lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505") }}
          </SButton>
        </div>
      </div>
      <STabs :tab-mode="'filter-tabs'" class="s-mb-5">
        <STabItem value="14801" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-dd1a9bc2-31f2-4197-9a7d-01a23229ea82") }}
        </STabItem>
        <STabItem value="0" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-7db32df9-54d2-4561-ba8b-c43073ee42e9") }}
        </STabItem>
        <STabItem value="14802" :active-tab="tab" @changeTab="selectTab">
          Ожидает модерации
        </STabItem>
        <STabItem value="14806" :active-tab="tab" @changeTab="selectTab">
          Требует доработки
        </STabItem>
        <STabItem value="14800" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-7b5895ca-c485-48ea-abfc-b8c9198f3826") }}
        </STabItem>
        <STabItem value="14805" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-9801cd40-7281-47f7-8478-6731dc9d8388") }}
        </STabItem>
      </STabs>
      <STable
        :headers="headers"
        :data="tableData"
        :totalItems="totalItems"
        itemsPerPage="10"
        paginateRange="2"
        @onSelectPage="onChangePage"
        v-if="hasStatusProducts"
      >
        <template v-slot:productName="{ item }">
          <div class="flex items-center product">
            <img
              :src="'data:image/png;base64,' + item.iconBase64"
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
          <div>{{ item.price }} сом</div>
          <div class="price-usd">{{ item.priceUsd }} $</div>
        </template>
        <template v-slot:priceWithDiscount="{ item }">
          <div>{{ item.priceWithDiscount }} сом</div>
          <div class="price-usd">{{ item.priceUsdWithDiscount }} $</div>
        </template>
        <template v-slot:action="{ item }">
          <SIconRender name="SettingsIcon" @click="onEditProduct(item)" />
        </template>
      </STable>
    </template>
    <template v-else>
      <EmptyData
        text="Пока нет товаров"
        :button-title="$t('lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505')"
        @click="openCreateProductModal"
      />
    </template>

    <CategoryModal ref="categoryModal" />

    <SModal
      v-model="isOpenFilterModal"
      class="filter-modal full-height"
      width="420px"
      position="right"
      @onClose="toggleFilterModal"
    >
      <div class="modal-content" ref="modalContent">
        <div class="filter-title">
          {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
        </div>

        <div class="section">
          <div class="section-title">Цена</div>
          <div class="flex">
            <SInput
              placeHolder="От"
              type="number"
              v-model.number="priceRange.min"
            />
            <SInput
              placeHolder="До"
              class="s-ml-2"
              type="number"
              v-model.number="priceRange.max"
            />
          </div>
        </div>

        <div class="section">
          <div class="section-title">Категории</div>
          <SInput isSearchable width="100%" @input="onSearchCategory" />
          <div
            class="property-items"
            :style="{ 'max-height': maxHeight + 'px' }"
          >
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
import { FilterSearch } from "@/shared/ui/components/filter-search";
import CategoryModal from "@/shared/ui/components/product/CategoryModal.vue";
import { ref, reactive, onMounted, computed, nextTick, Ref } from "vue";
import i18n from "@/shared/lib/plugins/i18n";
import { useProductStore } from "@/entities/products/store/product.store";
import { useCategoryStore } from "@/entities/category/store/category.store";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const headers = reactive([
  {
    title: i18n.global.t("lang-463282b8-512e-4eae-8cde-815a2678e07d"),
    key: "productName",
  },
  {
    title: i18n.global.t("lang-0d638a69-fc78-48bc-8b4f-58582c384a1d"),
    key: "status",
  },
  {
    title: i18n.global.t("lang-059d243d-445e-4100-ac56-a5e7910df626"),
    key: "articleNumber",
  },
  {
    title: i18n.global.t("lang-333319c2-2df4-4057-a56a-28ddd7a790a1"),
    key: "price",
  },
  {
    title: i18n.global.t("lang-1f6f2dca-070c-48bc-941f-e1300024ffbb"),
    key: "discount",
  },
  {
    title: i18n.global.t("lang-5eb99c46-ed5f-4a24-85ad-d551ad812256"),
    key: "priceWithDiscount",
  },
  {
    title: i18n.global.t("lang-a6dc23d1-d5cc-4c0a-8412-32f6ff24a2dd"),
    key: "countOfProduct",
  },
  {
    title: "Действия",
    key: "action",
  },
]);

const statuses = ref([
  { id: 0, name: "Все", color: "green" },
  { id: 14800, name: "Черновик", color: "grey" },
  { id: 14801, name: "Опубликовано", color: "green" },
  { id: 14802, name: "Ожидает модерации", color: "blue" },
  { id: 14803, name: "Ожидает одобрения ТО", color: "orange" },
  { id: 14804, name: "Одобрено", color: "green" },
  { id: 14805, name: "В архиве", color: "dark-grey" },
  { id: 14806, name: "Требует доработки", color: "red" },
  { id: 14807, name: "Заблокировано", color: "red" },
]);

const tableData = ref([]);
const hasProducts = ref(false);
const hasStatusProducts = ref(false);
const tab = ref("one");
const totalItems = ref(0);
const searchTimer = ref(null);
const isOpenFilterModal = ref(false);
const modalContent = ref(null);
const maxHeight = ref(0);
const priceRange = ref({ min: 0, max: 0 });
const categories = ref([]);
const selectedCategories = ref([]);
const checkboxRefs: Ref<HTMLDivElement[]> = ref([]);
const categoryModal = ref(null);

const currentStatus = computed(() =>
  Number(tab.value) ? { statuses: [Number(tab.value)] } : {}
);

onMounted(() => {
  selectTab("0");
});

const fetchProducts = (filterObj = {}) => {
  productStore
    .getAllProducts({ productType: 14701, sortDirection: 1, ...filterObj })
    .then((response) => {
      hasProducts.value = Boolean(response.result.totalPages);
      hasStatusProducts.value = Boolean(response.result.items.length);
      totalItems.value = response.result.totalCount;
      tableData.value = response.result.items;
      fetchCategoriesByPage("");
    });
};

const fetchCategoriesByPage = (searchValue: string) => {
  categoryStore
    .getCategoriesPagedList({ search: searchValue, pageSize: 30 })
    .then((response) => {
      categories.value = response.items;
    });
};

const selectTab = (value: string) => {
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
  nextTick(() => {
    const rect = modalContent?.value?.getBoundingClientRect();
    maxHeight.value = rect?.height / 1.5;
  });
};

const filterBy = () => {
  const categories = selectedCategories.value.length
    ? { categories: selectedCategories.value }
    : {};
  fetchProducts({ priceRange: priceRange.value, ...categories });
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
  router.push(`/product-update/${item.id}`);
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
}
</style>
