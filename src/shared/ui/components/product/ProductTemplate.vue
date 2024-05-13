<template>
  <div class="product-tabs-container mr-40 pt-15">
    <STabs :tab-mode="'content-tabs'">
      <STabItem value="one" :active-tab="tab" @changeTab="selectTab">
        Товары
      </STabItem>
      <STabItem value="two" :active-tab="tab" @changeTab="selectTab">
        Шаблоны
      </STabItem>
    </STabs>
    <STabWindow value="one" :active-tab="tab">
      <div
        class="d-flex sample"
        :class="{ active: i + 1 === sampleIndex }"
        v-for="(item, i) in selectedTemplates"
        :key="i"
        @click="selectSample(i, item)"
      >
        <img
          :src="'data:image/png;base64,' + item.iconBase64"
          alt="img"
          class="sample__img"
        />
        <div>
          <div class="sample__badge">Шаблон</div>
          <div class="sample__name">
            {{ item.productName }}
          </div>
          <SIconRender name="TrashIcon" @click="deleteSample(item.id)" />
        </div>
      </div>
    </STabWindow>
    <STabWindow value="two" :active-tab="tab">
      <SInput
        placeHolder="Поиск..."
        isSearchable
        width="100%"
        class="mt-12 mb-12"
      />
      <div class="template-container">
        <div class="template" v-for="(item, i) in templates" :key="i">
          <SCheckbox v-model="item.selected">
            <img
              :src="'data:image/png;base64,' + item.iconBase64"
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
          color="violet"
          size="large"
          class="w-p-100 mt-24"
          @click="addTemplates"
          :disabled="isDisabled"
        >
          Добавить шаблоны
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
} from "@tumarsoft/ogogo-ui";
import { ref, onMounted } from "vue";
import { useProductStore } from "@/entities/products/store/product.store";
import SmallLoader from "@/shared/ui/components/SmallLoader.vue";

const productStore = useProductStore();
const tab = ref("one");
const sampleIndex = ref(0);
const selectedTemplates = ref([]);
const templates = ref([]);
const isDisabled = ref(false);

onMounted(() => {
  fetchTemplates();
});

const fetchTemplates = () => {
  productStore.getAllProducts({ productType: 14700 }).then((response) => {
    templates.value = response.result.items;
  });
};

const selectTab = (selectedTab: string) => {
  tab.value = selectedTab;
};

const selectSample = (index: number, item: any) => {
  sampleIndex.value = index + 1;
  productStore.setSelectedTemplate(item);
};

const addTemplates = () => {
  isDisabled.value = true;
  selectedTemplates.value = templates.value.filter((item) => item.selected);
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

<style lang="scss">
@import "../../../../app/style/colors.scss";
.product-tabs-container {
  width: 32%;
  .tabs {
    width: 100%;
    .tab-item {
      margin: 0;
      width: 50%;
      text-align: center;
      &.active {
        color: $violet-600;
        border-color: $violet-600;
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
