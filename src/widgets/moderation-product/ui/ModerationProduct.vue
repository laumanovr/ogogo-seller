<template>
  <div class="product-list-container">
    <h2 class="head-title">
      {{ $t("lang-d7069093-a1a5-4544-8a29-e516288d719b") }}
    </h2>
    <FilterSearch @onClick="showFilterModal" />
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
        <router-link
          :to="{ name: 'moderate-product-detail', params: { id: item.id } }"
        >
          {{ $t("lang-23981bea-cba2-425d-a435-41ae4a591794") }}
        </router-link>
      </template>
    </STable>
    <FilterModal ref="filterModal" />
  </div>
</template>

<script lang="ts" setup>
import { STable, SBadge } from "@tumarsoft/ogogo-ui";
import { ref, reactive } from "vue";
import { FilterSearch } from "@/features/filter-search";
import FilterModal from "@/features/filter-modal/FilterModal.vue";

const filterModal = ref(null);

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

const onChangePage = () => {};

const showFilterModal = () => {
  filterModal.value.toggleModal();
};
</script>

<style lang="scss"></style>
