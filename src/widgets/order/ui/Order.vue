<template>
  <div class="order-content">
    <div class="head-title">
      {{ $t("lang-6f853bc8-3f4e-44d2-9770-49d98347fc6b") }}
    </div>
    <FilterSearch />

    <STabs :tab-mode="'filter-tabs'" class="mb-20">
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

    <STable
      :headers="headers"
      :data="orderStore.orders"
      totalItems="50"
      itemsPerPage="5"
      paginateRange="2"
      @onSelectPage="onChangePage"
    >
      <!-- <template v-slot:status="{ item }">
        <SBadge :content="item.status.name" :color="item.status.color" />
      </template> -->
      <template v-slot>
        <router-link to="/orders">
          {{ $t("lang-23981bea-cba2-425d-a435-41ae4a591794") }}
        </router-link>
      </template>
    </STable>
  </div>
</template>

<script lang="ts" setup>
import { STable, STabs, STabItem, SBadge } from "@tumarsoft/ogogo-ui";
import { ref, onMounted } from "vue";
import { FilterSearch } from "@/shared/ui/components/filter-search";
import { useOrderStore } from "../store/order.store";

const headers = ref([
  { title: "Номер заказа", key: "orderNumber" },
  { title: "Статус", key: "status" },
  { title: "Дата оформления", key: "registrationDate" },
  { title: "Оплата", key: "paymentType" },
  { title: "Сумма заказа", key: "price" },
  { title: "Кол-во товара", key: "count" },
  { title: "Действия", key: "action" },
]);
const statuses = ref([
  { id: 0, name: "Все", color: "green" },
  { id: 14400, name: "Активные", color: "green" },
  { id: 14401, name: "Отмененные", color: "green" },
  { id: 14402, name: "Архив", color: "green" },
]);
const orderStore = useOrderStore();
const tab = ref("one");
// const tableData = ref([]);

onMounted(() => {
  fetchOrders();
});

const fetchOrders = () => {
  orderStore.getAllOrders({});
};

const selectTab = (value: any) => {
  tab.value = value;
};

const onChangePage = (page: any) => {
  console.log(page);
};
</script>

<style lang="scss">
.order-content {
}
</style>
