<template>
  <div class="d-flex flex-row justify-between padding-16-40 s-h-13 s-mb-4">
    <img src="../../ui/assets/Ogogo-logo.png" class="ogogo-img" />

    <div class="header-navigation">
      <div
        @click="onMenuItemChange(MenuItems.Products)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender name="box" :class="isProductsActive" />
        <p :class="`${isProductsActive} font-size-12 s-mt-1`">
          {{ $t("lang-d7069093-a1a5-4544-8a29-e516288d719b") }}
        </p>
      </div>
      <div
        @click="onMenuItemChange(MenuItems.Orders)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender name="shop" :class="isOrdersActive" />
        <p :class="`${isOrdersActive} font-size-12 s-mt-1`">
          {{ $t("lang-6f853bc8-3f4e-44d2-9770-49d98347fc6b") }}
        </p>
      </div>
      <div
        @click="onMenuItemChange(MenuItems.Notifications)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <SIconRender name="grid" :class="isNotifyActive" />
        <p :class="`${isNotifyActive} font-size-12 s-mt-1`">
          {{ $t("lang-12ebb268-22bc-470c-b696-394bd7c1a45f") }}
        </p>
      </div>
      <div
        @click="onMenuItemChange(MenuItems.Cabinet)"
        class="cursor-pointer d-flex flex-col items-center"
      >
        <img src="../../../app/assets/img/empty-ava.svg" alt="" />
        <p :class="`${isCabinetActive} font-size-12 s-mt-1`">
          {{ currentUser?.firstName }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { MenuItems } from "@/shared/lib/utils/enums";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const activeButton = ref("");
const currentUser = ref(JSON.parse(window.localStorage.getItem("currentUser")));

Object.values(MenuItems).forEach((item: any) => {
  if (route.path.includes(item)) {
    activeButton.value = item;
  }
});

const isProductsActive = computed(() => {
  return activeButton.value === MenuItems.Products
    ? "s-text-violet-700"
    : "s-text-gray-500";
});
const isOrdersActive = computed(() => {
  return activeButton.value === MenuItems.Orders
    ? "s-text-violet-700"
    : "s-text-gray-500";
});
const isNotifyActive = computed(() => {
  return activeButton.value === MenuItems.Notifications
    ? "s-text-violet-700"
    : "s-text-gray-500";
});
const isCabinetActive = computed(() => {
  return activeButton.value === MenuItems.Cabinet
    ? "color-violet-700"
    : "gray-500";
});

function onMenuItemChange(value: MenuItems) {
  router.push("/" + value);
  activeButton.value = value;
}
</script>

<style lang="scss" scoped>
@import "../../../app/style/colors.scss";
.header {
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 40px;
}

.ogogo-img {
  width: 180px;
  height: 48px;
}

.header-navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  .header-profile {
    background: $gray-150;
    padding: 4px 12px;
    border-radius: 8px;
    .profile-name {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 3px;
    }
    .profile-number {
      font-weight: 500;
      font-size: 14px;
    }
  }
}
</style>
