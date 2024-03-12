<template>
  <div class="product-content">
    <div class="head-title">Каталог товаров</div>
    <FilterSearch />
    <EmptyData
      text="Пока нет товаров"
      button-title="Добавить товар"
      @click="toggleModal"
    />
    <SModal :isModalOpen="isShowModal" @onClose="toggleModal">
      Добавить товар
    </SModal>
  </div>
</template>

<script lang="ts" setup>
import EmptyData from "@/widgets/empty-data/EmptyData.vue";
import FilterSearch from "@/widgets/filter-search/FilterSearch.vue";
import { ref } from "vue";
import { SModal } from "@tumarsoft/ogogo-ui";

const isShowModal = ref(false);

const toggleModal = () => {
  isShowModal.value = !isShowModal.value;
};
</script>

<style lang="scss"></style>
