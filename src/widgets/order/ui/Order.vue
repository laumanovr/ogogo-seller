<template>
  <div class="order-content">
    <div class="head-title">
      {{ $t("lang-6f853bc8-3f4e-44d2-9770-49d98347fc6b") }}
    </div>
    <template v-if="isOrderExist">
      <FilterSearch @input="onSearch" />

      <STabs :tab-mode="'filter-tabs'" class="s-mb-5">
        <!-- TODO: extract value to enum -->
        <STabItem value="14400" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-dd1a9bc2-31f2-4197-9a7d-01a23229ea82") }}
        </STabItem>
        <STabItem value="0" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-7db32df9-54d2-4561-ba8b-c43073ee42e9") }}
        </STabItem>
        <STabItem value="14401" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-b5ea90d6-b263-4058-b295-b41b2d72c542") }}
        </STabItem>
        <STabItem value="14402" :active-tab="tab" @changeTab="selectTab">
          {{ $t("lang-9801cd40-7281-47f7-8478-6731dc9d8388") }}
        </STabItem>
      </STabs>

      <!-- TODO: set 10 as default value for itemsPerPage -->
      <!-- TODO: set 2 as default value for itemsPerPage -->
      <!-- TODO: use getters for data  -->
      <STable
        :headers="headers"
        :data="orderStore.orders"
        :totalItems="totalItems"
        itemsPerPage="10"
        paginateRange="2"
        @onSelectPage="onChangePage"
        v-if="hasOrders"
      >
        <template v-slot:price="{ item }">
          <div>{{ item.price }} сом</div>
          <div class="price-usd">{{ item.priceUsd }} $</div>
        </template>
        <template v-slot:status="{ item }">
          <SBadge
            :content="showStatusData(item, 'name')"
            :color="showStatusData(item, 'color')"
          />
        </template>
        <template v-slot:registrationDate="{ item }">
          {{ showPurchaseDate(item) }}
        </template>
        <template v-slot:paymentType="{ item }">
          {{ showPaymentType(item) }}
        </template>
        <template v-slot:action>
          <!-- TODO: if it is action - button or link, then use SButton or router-link. If api is not available, then disable button/router-link and set TODO comment -->
          {{ $t("lang-23981bea-cba2-425d-a435-41ae4a591794") }}
        </template>
      </STable>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { STable, STabs, STabItem, SBadge } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, computed } from "vue";
import { FilterSearch } from "@/shared/ui/components/filter-search";
import { useOrderStore } from "@/entities/order/store/order.store";
import { OrderEntity } from "@/entities/order/model/types";

// TODO: localize titles
const headers = ref([
  { title: "Номер заказа", key: "orderNumber" },
  { title: "Статус", key: "status" },
  { title: "Дата оформления", key: "registrationDate" },
  { title: "Оплата", key: "paymentType" },
  { title: "Сумма заказа", key: "price" },
  { title: "Кол-во товара", key: "count" },
  { title: "Действия", key: "action" },
]);
// TODO: extract id to enum
// TODO: localize names
const statuses = ref([
  { id: 0, name: "Все", color: "green" },
  { id: 14400, name: "Активный", color: "green" },
  { id: 14401, name: "Отмененный", color: "green" },
  { id: 14402, name: "Архив", color: "green" },
]);
const orderStore = useOrderStore();
const tab = ref("one");
const isOrderExist = ref(false);
const hasOrders = ref(false);
const totalItems = ref(0);
const searchTimer = ref(null);

// TODO: currentStatus can be extracted to a filter object in orderStore
const currentStatus = computed(() =>
  Number(tab.value) ? { queryParams: { statuses: [Number(tab.value)] } } : {}
);

onMounted(() => {
  // TODO: extract value to enum
  selectTab("14400");
});

const fetchOrders = (filterObj = {}) => {
  orderStore.getAllOrders({ ...filterObj }).then((response) => {
    // TODO: hasOrders and isOrderExist is the same thing
    isOrderExist.value = Boolean(response.result.totalPages);
    hasOrders.value = Boolean(response.result.items.length);
    // TODO: save pageParams(pageIndex, pageSize, totalPages) to store
    totalItems.value = response.result.totalCount;
  });
};

const selectTab = (value: string) => {
  tab.value = value;
  fetchOrders(currentStatus.value);
};

const showStatusData = (item: OrderEntity, field: string) => {
  const foundStatus = statuses.value.find(
    (statusObj) => statusObj.id === item.status
  );
  return field === "name" ? foundStatus?.name : foundStatus?.color;
};

const showPurchaseDate = (item: OrderEntity) => {
  return new Date(item.registrationDate).toLocaleDateString("ru-RU");
};

const showPaymentType = (item: OrderEntity) => {
  // TODO: extract paymentType comparison to enum
  // TODO: localize names
  return item.paymentType === 14500 ? "Кредит" : "Оплачено";
};

const onChangePage = (page: number) => {
  fetchOrders({ ...currentStatus.value, pageIndex: page });
};

const onSearch = (value: string) => {
  window.clearTimeout(searchTimer.value);
  searchTimer.value = window.setTimeout(() => {
    fetchOrders({ search: value });
  }, 1500);
};
</script>

<!-- TODO: set scoped for style or use ui kit classes -->
<style lang="scss">
@import "../../../app/style/colors.scss";
.order-content {
  .price-usd {
    color: $gray-500;
    font-weight: 500;
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>
