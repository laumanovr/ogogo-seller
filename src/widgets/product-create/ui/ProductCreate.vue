<template>
  <div class="product-create-content">
    <div class="d-flex items-center">
      <SButton color="white">
        <SIconRender name="ArrowIcon" direction="left" color="black" />
        <span>Назад</span>
      </SButton>
    </div>

    <div class="d-flex mt-25">
      <div class="tabs-container mr-40">
        <STabs :tab-mode="'content-tabs'">
          <STabItem value="one" :active-tab="tab">Товары</STabItem>
          <STabItem value="two" :active-tab="tab">Шаблоны</STabItem>
        </STabs>
      </div>
      <div class="form-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SIconRender, STabs, STabItem } from "@tumarsoft/ogogo-ui";
import { ref } from "vue";

const tab = ref("one");
</script>

<style lang="scss" scoped>
.product-create-content {
  .tabs-container {
    width: 32%;
    height: 200px;
    border: 1px solid;
  }
  .form-container {
    width: 68%;
    height: 200px;
    border: 1px solid;
  }
}
</style>
