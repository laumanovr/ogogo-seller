<template>
  <div class="product-content">
    <div class="head-title">Каталог товаров</div>
    <FilterSearch />
    <EmptyData
      text="Пока нет товаров"
      button-title="Добавить товар"
      @click="toggleModal"
    />
    <SModal :isModalOpen="isShowModal" @onClose="toggleModal" height="auto">
      <p class="font-bold">Добавить товар</p>
      <SSelect
        :label="$t('lang-75805fdb-eac2-4c87-b481-563e318789b5')"
        class="w-p-100"
      ></SSelect>
      <div class="flex flex-row w-p-100 gap-2 mt-36 justify-between">
        <SButton color="gray" class="button w-p-49" @click="onClose">
          {{ $t("lang-c66fcd83-27ea-4c39-a1e9-be9c01dfdb36") }}</SButton
        >
        <SButton color="violet" class="button w-p-49">
          {{ $t("lang-d0108c3e-9945-4245-a730-b011e5a47c35") }}</SButton
        >
      </div>
    </SModal>
  </div>
</template>

<script lang="ts" setup>
import { EmptyData } from "@/shared/ui/components/empty-data";
import { FilterSearch } from "@/shared/ui/components/filter-search";
import { ref } from "vue";
import { SModal, SSelect, SButton } from "@tumarsoft/ogogo-ui";

const isShowModal = ref(false);

const toggleModal = () => {
  isShowModal.value = !isShowModal.value;
};

const onClose = () => {
  isShowModal.value = !isShowModal.value;
};
</script>

<style lang="scss"></style>
