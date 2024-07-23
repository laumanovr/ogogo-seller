<template>
  <div class="order-content">
    <div class="s-text-h-2 s-mb-6 s-mt-6">
      {{ $t("lang-6f853bc8-3f4e-44d2-9770-49d98347fc6b") }}
    </div>
    <template v-if="isOrderExist">
      <FilterSearch @input="onSearch" />

      <STabs :tab-mode="'filter-tabs'" class="s-mb-5">
        <STabItem
          :value="OrderStatus.ACTIVE"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-dd1a9bc2-31f2-4197-9a7d-01a23229ea82") }}
        </STabItem>
        <STabItem
          :value="OrderStatus.ALL"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-7db32df9-54d2-4561-ba8b-c43073ee42e9") }}
        </STabItem>
        <STabItem
          :value="OrderStatus.CANCELLED"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-b5ea90d6-b263-4058-b295-b41b2d72c542") }}
        </STabItem>
        <STabItem
          :value="OrderStatus.ARCHIVED"
          :active-tab="tab"
          @changeTab="selectTab"
        >
          {{ $t("lang-9801cd40-7281-47f7-8478-6731dc9d8388") }}
        </STabItem>
      </STabs>

      <STable
        :headers="headers"
        :data="orderData"
        :totalItems="totalItems"
        itemsPerPage="10"
        paginateRange="2"
        @onSelectPage="onChangePage"
        v-if="hasOrders"
      >
        <template v-slot:price="{ item }">
          <div>{{ item.price }} сом</div>
          <div class="price-usd">{{ item.priceUsd }} $</div>
        </template>
        <template v-slot:status="{ item }">
          <SBadge
            :content="showStatusData(item, 'name')"
            :color="showStatusData(item, 'color')"
          />
        </template>
        <template v-slot:registrationDate="{ item }">
          {{ showPurchaseDate(item) }}
        </template>
        <template v-slot:paymentType="{ item }">
          {{ showPaymentType(item) }}
        </template>
        <template v-slot:action>
          <SButton disabled type="text">
            {{ $t("lang-23981bea-cba2-425d-a435-41ae4a591794") }}
          </SButton>
        </template>
      </STable>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { STable, STabs, STabItem, SBadge } from "@tumarsoft/ogogo-ui";
import { ref, onMounted, computed } from "vue";
import { FilterSearch } from "@/shared/ui/components/filter-search";
import { useOrderStore } from "@/entities/order/store/order.store";
import { OrderEntity } from "@/entities/order/model/types";
import { OrderStatus, PaymentType } from "@/shared/lib/utils/enums";
import i18n from "@/shared/lib/plugins/i18n";

const headers = ref([
  {
    title: i18n.global.t("lang-38d23cac-13c8-48f7-ac75-ba28e214a121"),
    key: "orderNumber",
  },
  {
    title: i18n.global.t("lang-0d638a69-fc78-48bc-8b4f-58582c384a1d"),
    key: "status",
  },
  {
    title: i18n.global.t("lang-291d15a2-e9e7-4c34-b347-ad9301255aaa"),
    key: "registrationDate",
  },
  {
    title: i18n.global.t("lang-b6856c6b-d988-47de-955d-8fad999702ae"),
    key: "paymentType",
  },
  {
    title: i18n.global.t("lang-25e84a54-cb83-475c-b8b5-51592842bd51"),
    key: "price",
  },
  {
    title: i18n.global.t("lang-9d087818-5d05-424c-a631-1f9a4a981e21"),
    key: "count",
  },
  {
    title: i18n.global.t("lang-0543ee76-db56-47ac-b2e9-3b96fc831a8c"),
    key: "action",
  },
]);
const statuses = ref([
  {
    id: OrderStatus.ALL,
    name: i18n.global.t("lang-7db32df9-54d2-4561-ba8b-c43073ee42e9"),
    color: "green",
  },
  {
    id: OrderStatus.ACTIVE,
    name: i18n.global.t("lang-5195beba-a122-494a-893d-e37182f4b42f"),
    color: "green",
  },
  {
    id: OrderStatus.CANCELLED,
    name: i18n.global.t("lang-0e411f42-92fd-48f1-839f-b39e3b4c83c1"),
    color: "green",
  },
  {
    id: OrderStatus.ARCHIVED,
    name: i18n.global.t("lang-9801cd40-7281-47f7-8478-6731dc9d8388"),
    color: "green",
  },
]);
const orderStore = useOrderStore();
const tab = ref("one");
const searchTimer = ref(null);
const orderData = computed(() => orderStore.getOrders);
const isOrderExist = computed(() => orderStore.getIsOrderExist);
const hasOrders = computed(() => orderStore.getHasOrders);
const totalItems = computed(() => orderStore.getTotalItems);
const currentStatus = computed(() =>
  Number(tab.value) ? { queryParams: { statuses: [Number(tab.value)] } } : {}
);

onMounted(() => {
  selectTab(String(OrderStatus.ACTIVE));
});

const fetchOrders = (filterObj = {}) => {
  orderStore.getAllOrders({ ...filterObj });
};

const selectTab = (value: string) => {
  tab.value = value;
  fetchOrders(currentStatus.value);
};

const showStatusData = (item: OrderEntity, field: string) => {
  const foundStatus = statuses.value.find(
    (statusObj) => statusObj.id === item.status
  );
  return field === "name" ? foundStatus?.name : foundStatus?.color;
};

const showPurchaseDate = (item: OrderEntity) => {
  return new Date(item.registrationDate).toLocaleDateString("ru-RU");
};

const showPaymentType = (item: OrderEntity) => {
  return item.paymentType === PaymentType.CREDIT
    ? i18n.global.t("lang-49ee216a-cacc-4efa-aaa3-d61ca8d5471c")
    : i18n.global.t("lang-cab4e851-832e-4cfc-9b92-4133a05e7bcd");
};

const onChangePage = (page: number) => {
  fetchOrders({ ...currentStatus.value, pageIndex: page });
};

const onSearch = (value: string) => {
  window.clearTimeout(searchTimer.value);
  searchTimer.value = window.setTimeout(() => {
    fetchOrders({ search: value });
  }, 1500);
};
</script>

<style lang="scss" scoped>
@import "../../../app/style/colors.scss";
.order-content {
  .price-usd {
    color: $gray-500;
    font-weight: 500;
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>
