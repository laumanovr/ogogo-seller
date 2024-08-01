<template>
  <div class="product-tabs-container s-mr-8 s-pt-4">
    <SLoader v-if="isLoading"/>
    <STabs :tab-mode="'content-tabs'">
      <STabItem :value="TabValue.ONE" :active-tab="tab" @changeTab="selectTab">
        {{ $t("lang-d7069093-a1a5-4544-8a29-e516288d719b") }}
      </STabItem>
      <STabItem :value="TabValue.TWO" :active-tab="tab" @changeTab="selectTab">
        {{ $t("lang-2edf1954-daaa-4b6b-830d-9e8488fbe03a") }}
      </STabItem>
    </STabs>
    <STabWindow :value="TabValue.ONE" :active-tab="tab">
      <div
        class="s-flex sample"
        :class="{ active: i + 1 === selectedSampleIndex }"
        v-for="(item, i) in selectedTemplates"
        :key="i"
        @click="selectSample(i, item)"
      >
        <img
          :src="getFullIcon(item.iconBase64)"
          alt="img"
          class="sample__img"
        />
        <div>
          <div class="sample__badge">
            {{ $t("lang-9dd76e10-ff80-4296-be42-2311538b5cb7") }}
          </div>
          <div class="sample__name">
            {{ item.productName }}
          </div>
          <SIconRender
            name="delete"
            size="small"
            @click="deleteSample(item.id)"
          />
        </div>
      </div>
    </STabWindow>
    <STabWindow :value="TabValue.TWO" :active-tab="tab">
      <SInput
        :placeHolder="$t('lang-034dcb9a-5b5b-4886-abfe-c4f5d88d140c')"
        isSearchable
        class="s-mt-3 s-mb-3"
      />
      <div class="template-container">
        <div class="template" v-for="(item, i) in productTemplates" :key="i">
          <SCheckbox v-model="item.selected">
            <img
              :src="getFullIcon(item.iconBase64)"
              alt="img"
              class="sample__img"
            />
            <div class="template__info">
              <div class="template__name">
                {{ item.productName }}
              </div>
              <div class="template__desc">
                <!-- {{ item.desc }} -->
              </div>
            </div>
          </SCheckbox>
        </div>
      </div>
      <div class="btn-container">
        <SButton
          size="large"
          class="s-w-full s-mt-5"
          @click="addTemplates"
          :disabled="isDisabled"
        >
          {{ $t("lang-0f8b6b66-a9d9-489f-94d7-4457517a6ccf") }}
        </SButton>
        <SmallLoader v-if="isDisabled" />
      </div>
    </STabWindow>
  </div>
</template>

<script lang="ts" setup>
import {
  SButton,
  SIconRender,
  STabs,
  STabItem,
  STabWindow,
  SInput,
  SCheckbox,
  SLoader
} from "@tumarsoft/ogogo-ui";
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "@/entities/products/store/product.store";
import SmallLoader from "@/shared/ui/components/SmallLoader.vue";
import { TabValue } from "@/shared/lib/utils/enums";
import { getFullIcon } from "@/shared/composable";

const productStore = useProductStore();
const tab = ref("one");
const selectedSampleIndex = ref(0);
const selectedTemplates = ref([]);
const isDisabled = ref(false);
const isLoading = ref(false);
const productTemplates = computed(() => productStore.getProducts);

onMounted(() => {
  fetchTemplates();
});

const fetchTemplates = () => {
  isLoading.value = true;
  productStore.getAllProducts({ productType: 14700 }).finally(() => {
    isLoading.value = false;
  });
};

const selectTab = (selectedTab: string) => {
  tab.value = selectedTab;
};

const selectSample = (index: number, item: any) => {
  selectedSampleIndex.value = index + 1;
  productStore.setSelectedTemplateOrProduct({
    product: item,
    type: "template",
  });
};

const addTemplates = () => {
  isDisabled.value = true;
  selectedTemplates.value = productTemplates.value.filter(
    (item: any) => item.selected
  );
  setTimeout(() => {
    isDisabled.value = false;
  }, 800);
};

const deleteSample = (id: number) => {
  const index = selectedTemplates.value.findIndex(
    (template) => template.id === id
  );
  selectedTemplates.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
@import "../../../../app/style/colors.scss";
.product-tabs-container {
  width: 32%;
  .tabs {
    width: 100%;
    .tab-item {
      margin: 0;
      width: 50%;
      &.active {
        color: $violet-600;
        border-color: $violet-600;
      }
      .tab-item-content {
        justify-content: center;
      }
    }
  }
  .sample {
    padding: 8px;
    margin-top: 16px;
    cursor: pointer;
    &__img {
      width: 56px;
      height: 56px;
      object-fit: cover;
      margin-right: 12px;
    }
    &__badge {
      font-size: 10px;
      font-weight: 500;
      color: $sky-600;
      padding: 4px;
      background: $sky-100;
      border-radius: 4px;
      display: inline-block;
    }
    &__name {
      font-size: 14px;
      font-weight: 600;
      margin: 8px 0 12px;
      max-height: 50px;
      overflow-y: hidden;
    }
    &.active {
      background: $violet-500;
      border-radius: 10px;
      .sample__badge {
        color: $white;
        background: rgba($black, 0.12);
      }
      .sample__name {
        color: $white;
      }
    }
  }
  .template-container {
    max-height: 500px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $gray-300;
      border-radius: 4px;
    }
    .template {
      margin-bottom: 15px;
      &__name {
        font-size: 14px;
        font-weight: 600;
        max-height: 50px;
        overflow-y: hidden;
      }
      &__desc {
        font-size: 12px;
        font-weight: 500;
        color: $gray-500;
        margin-top: 8px;
      }
      .checkbox-container {
        align-items: center;
      }
      .checkbox-title {
        display: flex;
      }
    }
  }
  .btn-container {
    position: relative;
    .small-loader {
      position: absolute;
      top: 16px;
      right: 12px;
    }
  }
}
</style>
