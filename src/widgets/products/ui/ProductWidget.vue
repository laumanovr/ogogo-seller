<template>
  <div class="product-content">
    <div class="head-title">
      {{ $t("lang-6a3f0b82-3b93-4348-8788-a2ea2dcb2c88") }}
    </div>
    <FilterSearch />
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
