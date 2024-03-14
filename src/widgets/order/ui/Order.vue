<template>
  <div class="order-content">
    <div class="head-title">
      {{ $t("lang-6f853bc8-3f4e-44d2-9770-49d98347fc6b") }}
    </div>
    <FilterSearch />

    <STabs :tab-mode="'filter-tabs'" class="mb-20">
      <STabItem value="one" :active-tab="tab" @changeTab="selectTab">
        {{ $t("lang-dd1a9bc2-31f2-4197-9a7d-01a23229ea82") }}
      </STabItem>
      <STabItem value="two" :active-tab="tab" @changeTab="selectTab">
        {{ $t("lang-7db32df9-54d2-4561-ba8b-c43073ee42e9") }}
      </STabItem>
      <STabItem value="three" :active-tab="tab" @changeTab="selectTab">
        {{ $t("lang-b5ea90d6-b263-4058-b295-b41b2d72c542") }}
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
import { FilterSearch } from "@/shared/ui/components/filter-search";

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
