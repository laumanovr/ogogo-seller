<template>
  <div class="product-content">
    <div class="head-title">
      {{ $t("lang-6a3f0b82-3b93-4348-8788-a2ea2dcb2c88") }}
    </div>
    <template v-if="hasProducts">
      <div class="flex justify-between">
        <div class="flex w-p-65">
          <FilterSearch
            class="w-p-80"
            @input="onSearch"
            @click="toggleFilterModal"
          />
          <SButton color="white" class="ml-12">Настроить цены</SButton>
        </div>
        <SButton color="violet" @click="toggleModal">
          + {{ $t("lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505") }}
        </SButton>
      </div>
      <STabs :tab-mode="'filter-tabs'" class="mb-20">
        <STabItem value="14801" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-dd1a9bc2-31f2-4197-9a7d-01a23229ea82") }}
        </STabItem>
        <STabItem value="0" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-7db32df9-54d2-4561-ba8b-c43073ee42e9") }}
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
            <img :src="'data:image/png;base64,' + item.iconBase64" alt="img" />
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
      </STable>
    </template>
    <template v-else>
      <EmptyData
        text="Пока нет товаров"
        :button-title="$t('lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505')"
        @click="toggleModal"
      />
    </template>
    <SModal :isModalOpen="isShowModal" @onClose="toggleModal" height="auto">
      <p class="font-bold mb-24">
        {{ $t("lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505") }}
      </p>
      <SSelect label="Категория" class="w-p-100" />
      <SSelect label="Категория" class="w-p-100 mt-16" />
      <SSelect label="Категория" class="w-p-100 mt-16" />
      <div class="flex flex-row w-p-100 gap-2 mt-36 justify-between">
        <SButton color="gray" class="button w-p-49" @click="toggleModal">
          {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}
        </SButton>
        <SButton color="violet" class="button w-p-49">
          Создать
          <!-- {{ $t("lang-d0108c3e-9945-4245-a730-b011e5a47c35") }} -->
        </SButton>
      </div>
    </SModal>
    <SModal
      :isModalOpen="isOpenFilterModal"
      class="filter-modal"
      width="420px"
      height="100%"
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
              class="ml-8"
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
      <div class="filter-actions">
        <SButton size="large" color="gray" @click="clearFilter">
          {{ $t("lang-7967cf86-49d6-41c2-bdd7-23c6f8e5e8ea") }}
        </SButton>
        <SButton size="large" color="violet" @click="filterBy">
          {{ $t("lang-bdc9ab1e-91af-43ea-8bb9-e23c8ea98755") }}
        </SButton>
      </div>
    </SModal>
  </div>
</template>

<script lang="ts" setup>
import { EmptyData } from "@/shared/ui/components/empty-data";
import { FilterSearch } from "@/shared/ui/components/filter-search";
import { ref, reactive, onMounted, computed, nextTick, Ref } from "vue";
import i18n from "@/shared/lib/plugins/i18n";
import {
  SModal,
  SSelect,
  SButton,
  STabs,
  STabItem,
  STable,
  SBadge,
  SInput,
  SCheckbox,
} from "@tumarsoft/ogogo-ui";
import { useProductStore } from "@/entities/products/store/product.store";

const productStore = useProductStore();

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
]);

const statuses = ref([
  { id: 0, name: "Все", color: "green" },
  { id: 14800, name: "Черновик", color: "green" },
  { id: 14801, name: "Опубликовано", color: "green" },
  { id: 14802, name: "Ожидает модерации", color: "green" },
  { id: 14803, name: "Ожидает одобрения", color: "green" },
  { id: 14804, name: "Одобрено", color: "green" },
  { id: 14805, name: "В архиве", color: "green" },
  { id: 14806, name: "Требует доработки", color: "green" },
  { id: 14807, name: "Заблокировано", color: "green" },
]);

const tableData = ref([]);
const isShowModal = ref(false);
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

const currentStatus = computed(() =>
  Number(tab.value) ? { statuses: [Number(tab.value)] } : {}
);

onMounted(() => {
  selectTab("0");
  fetchCategories("");
});

const fetchProducts = (filterObj = {}) => {
  productStore
    .getAllProducts({ productType: 14701, ...filterObj })
    .then((response) => {
      hasProducts.value = Boolean(response.result.totalPages);
      hasStatusProducts.value = Boolean(response.result.items.length);
      totalItems.value = response.result.totalCount;
      tableData.value = response.result.items;
    });
};

const fetchCategories = (searchValue: string) => {
  productStore
    .getAllCategories({ search: searchValue, pageSize: 30 })
    .then((response) => {
      categories.value = response.items;
    });
};

const selectTab = (value: string) => {
  tab.value = value;
  fetchProducts(currentStatus.value);
};

const onChangePage = (page: number) => {
  fetchProducts({ ...currentStatus.value, pageIndex: page });
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

const toggleModal = () => {
  isShowModal.value = !isShowModal.value;
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
    fetchCategories(target.value);
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
</script>

<style lang="scss" scoped>
@import "../../../app/style/colors.scss";
.product-content {
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
      object-fit: scale-down;
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
