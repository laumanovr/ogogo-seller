<template>
  <div class="product-form-container">
    <div class="head-title md">Главное о товаре</div>
    <div>
      <SInput label="Наименование товара *" width="100%" />
    </div>
    <div class="d-flex items-end mt-16">
      <SInput label="Ваш артикул" width="85%" />
      <SButton color="gray" class="ml-12">Сгенерировать</SButton>
    </div>
    <div class="mt-16">
      <SInput label="Артикул производителя" width="100%" />
    </div>
    <div class="mt-16 w-p-100">
      <STextArea label="Описание товара" width="100%" />
    </div>
    <div class="d-flex items-center justify-between mt-40 mb-30">
      <div class="head-title md">Цена</div>
      <div class="d-flex">
        <SRadioButton class="mr-24 radio-btn">В сомах</SRadioButton>
        <SRadioButton class="radio-btn">В долларах</SRadioButton>
      </div>
    </div>
    <div class="d-flex justify-between">
      <SInput label="Цена в сомах" width="32%" />
      <SInput label="Скидка в %" width="32%" />
      <SInput label="Цена со скидкой" width="32%" />
    </div>
    <div class="mt-16 mb-40">
      <SInput label="Наличие (кол-во) *" width="100%" />
    </div>
    <div class="head-title md">Фото</div>
  </div>
</template>

<script lang="ts" setup>
import {
  SInput,
  SButton,
  STextArea,
  SSelect,
  SRadioButton,
} from "@tumarsoft/ogogo-ui";
</script>

<style lang="scss">
@import "../../../../app/style/colors.scss";
.product-form-container {
  width: 68%;
  .head-title {
    margin: 0 0 25px;
  }
  .radio-btn {
    .radio-label {
      height: 20px;
    }
  }
}
</style>
