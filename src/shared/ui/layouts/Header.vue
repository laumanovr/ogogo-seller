<template>
  <div class="s-flex s-flex-row s-justify-between padding-16-40 s-h-13 s-mb-4">
    <img src="@/shared/ui/assets/Ogogo-logo.png" class="ogogo-img" />

    <div class="header-navigation">
      <router-link
        to="/products"
        class="cursor-pointer s-flex s-flex-col s-items-center"
      >
        <SIconRender
          name="box"
          :class="[
            route.name === MenuItems.Products
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        />
        <span
          class="s-mt-1"
          :class="[
            route.name === MenuItems.Products
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        >
          {{ $t("lang-d7069093-a1a5-4544-8a29-e516288d719b") }}
        </span>
      </router-link>
      <router-link
        to="/orders"
        class="cursor-pointer s-flex s-flex-col s-items-center"
      >
        <SIconRender
          name="shop"
          :class="[
            route.name === MenuItems.Orders
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        />
        <span
          class="s-mt-1"
          :class="[
            route.name === MenuItems.Orders
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        >
          {{ $t("lang-6f853bc8-3f4e-44d2-9770-49d98347fc6b") }}
        </span>
      </router-link>
      <router-link
        to="/notifications"
        class="cursor-pointer s-flex s-flex-col s-items-center"
      >
        <SIconRender
          name="grid"
          :class="[
            route.name === MenuItems.Notifications
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        />
        <span
          class="s-mt-1"
          :class="[
            route.name === MenuItems.Notifications
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        >
          {{ $t("lang-12ebb268-22bc-470c-b696-394bd7c1a45f") }}
        </span>
      </router-link>
      <router-link
        to="/profile"
        class="cursor-pointer s-flex s-flex-col s-items-center"
      >
        <img src="../../../app/assets/img/empty-ava.svg" alt="" />
        <span
          class="s-mt-1"
          :class="[
            route.name === MenuItems.Cabinet
              ? 's-text-violet-700'
              : 's-text-gray-500',
          ]"
        >
          {{ currentUser?.firstName }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SIconRender } from "@tumarsoft/ogogo-ui";
import { MenuItems } from "@/shared/lib/utils/enums";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/shared/store/auth";

const route = useRoute();
const authStore = useAuthStore();

const currentUser = computed(() => authStore.getCurrentProfile);
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
  a {
    text-decoration: none;
  }
  span {
    font-size: 12px;
  }
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
