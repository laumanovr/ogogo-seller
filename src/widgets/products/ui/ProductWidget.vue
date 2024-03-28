<template>
  <div class="product-content">
    <div class="head-title">
      {{ $t("lang-6a3f0b82-3b93-4348-8788-a2ea2dcb2c88") }}
    </div>

    <template v-if="hasProducts">
      <div class="flex justify-between">
        <FilterSearch class="w-p-65" />
        <SButton color="violet">+ Добавить товар</SButton>
      </div>
      <STabs :tab-mode="'filter-tabs'" class="mb-20">
        <STabItem value="one" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-dd1a9bc2-31f2-4197-9a7d-01a23229ea82") }}
        </STabItem>
        <STabItem value="two" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-7db32df9-54d2-4561-ba8b-c43073ee42e9") }}
        </STabItem>
        <STabItem value="three" :active-tab="tab" @changeTab="selectTab">
          {{ "Черновик" }}
        </STabItem>
        <STabItem value="four" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-9801cd40-7281-47f7-8478-6731dc9d8388") }}
        </STabItem>
      </STabs>
      <STable
        :headers="headers"
        :data="tableData"
        totalItems="50"
        itemsPerPage="5"
        paginateRange="2"
        @onSelectPage="onChangePage"
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
      <SModal :isModalOpen="isShowModal" @onClose="toggleModal" height="auto">
        <p class="font-bold">
          {{ $t("lang-bb00cbbb-a6f7-4c77-8bf7-558b18e8d505") }}
        </p>
        <SSelect
          :label="$t('lang-75805fdb-eac2-4c87-b481-563e318789b5')"
          class="w-p-100"
        >
        </SSelect>
        <div class="flex flex-row w-p-100 gap-2 mt-36 justify-between">
          <SButton color="gray" class="button w-p-49" @click="onClose">
            {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}
          </SButton>
          <SButton color="violet" class="button w-p-49">
            {{ $t("lang-d0108c3e-9945-4245-a730-b011e5a47c35") }}
          </SButton>
        </div>
      </SModal>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { EmptyData } from "@/shared/ui/components/empty-data";
import { FilterSearch } from "@/shared/ui/components/filter-search";
import { ref, reactive, onMounted } from "vue";
import {
  SModal,
  SSelect,
  SButton,
  STabs,
  STabItem,
  STable,
  SBadge,
} from "@tumarsoft/ogogo-ui";
import { useProductStore } from "../store/product.store";

const productStore = useProductStore();

const headers = reactive([
  { title: "Товар", key: "productName" },
  { title: "Статус", key: "status" },
  { title: "Артикул", key: "articleNumber" },
  { title: "Цена", key: "price" },
  { title: "Скидка %", key: "discount" },
  { title: "Цена со скидкой", key: "priceWithDiscount" },
  { title: "Остаток", key: "countOfProduct" },
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
const hasProducts = ref(true);
const tab = ref("one");

onMounted(() => {
  productStore.getAllProducts({ productType: 14701 }).then((response) => {
    // debugger;
    hasProducts.value = Boolean(response.items.length);
    tableData.value = response.items;
  });
});

const selectTab = (value: any) => {
  tab.value = value;
};

const onChangePage = (page: any) => {
  console.log(page);
};

const getStatusData = (item: any, field: any) => {
  const foundStatus = statuses.value.find(
    (statusObj) => statusObj.id === item.status
  );
  return field === "name" ? foundStatus?.name : foundStatus?.color;
};

const toggleModal = () => {
  isShowModal.value = !isShowModal.value;
};

const onClose = () => {
  isShowModal.value = !isShowModal.value;
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
}
</style>
