<template>
  <div class="order-content">
    <div class="head-title">Заказы</div>
    <FilterSearch />

    <STabs :tab-mode="'filter-tabs'" class="mb-20">
      <STabItem value="one" :active-tab="tab" @changeTab="selectTab">
        Активные
      </STabItem>
      <STabItem value="two" :active-tab="tab" @changeTab="selectTab">
        Все
      </STabItem>
      <STabItem value="three" :active-tab="tab" @changeTab="selectTab">
        Отмененные
      </STabItem>
      <STabItem value="four" :active-tab="tab" @changeTab="selectTab">
        Архив
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
      <template v-slot:status="{ item }">
        <SBadge :content="item.status.name" :color="item.status.color" />
      </template>
      <template v-slot:action="{ item }">
        <router-link to="/orders">
          {{ $t("lang-23981bea-cba2-425d-a435-41ae4a591794") }}
        </router-link>
      </template>
    </STable>
  </div>
</template>

<script lang="ts" setup>
import { STable, STabs, STabItem, SBadge } from "@tumarsoft/ogogo-ui";
import { ref, reactive } from "vue";
import { FilterSearch } from "@/features/filter-search";

const tab = ref("one");

const headers = reactive([
  { title: "Товар", key: "product" },
  { title: "Продавец", key: "name" },
  { title: "Статус", key: "status" },
  { title: "Дата", key: "date" },
  { title: "Действия", key: "action" },
]);

const tableData = reactive([
  {
    id: 1,
    product: "Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM HK/CN",
    status: { name: "На проверке", color: "orange" },
    name: "Планета электроники",
    date: "01.01.24",
  },
  {
    id: 2,
    product: "Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM HK/CN",
    status: { name: "Модерируется", color: "blue" },
    name: "Gadget.kg",
    date: "02.02.24",
  },
  {
    id: 3,
    product: "Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM HK/CN",
    status: { name: "Проверен", color: "green" },
    name: "Моби-маркет",
    date: "03.03.24",
  },
  {
    id: 4,
    product: "Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM HK/CN",
    status: { name: "Отклонен", color: "rose" },
    name: "Софтек",
    date: "04.04.24",
  },
]);

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
