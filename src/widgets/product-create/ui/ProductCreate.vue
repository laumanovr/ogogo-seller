<template>
  <div class="product-create-content">
    <div class="d-flex items-center">
      <SButton color="white">
        <SIconRender name="ArrowIcon" direction="left" color="black" />
        <span>Назад</span>
      </SButton>
    </div>

    <div class="d-flex mt-25">
      <div class="tabs-container mr-40 pt-15">
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
            :class="{ active: i === sampleIndex }"
            @click="selectSample(i)"
            v-for="i in 3"
            :key="i"
          >
            <img
              src="../../../app/assets/img/iphone.jpg"
              alt="img"
              class="sample__img"
            />
            <div>
              <div class="sample__badge">Шаблон</div>
              <div class="sample__name">
                Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM HK/CN
              </div>
              <SIconRender name="TrashIcon" />
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
            <div class="template" v-for="i in 10" :key="i">
              <SCheckbox>
                <img
                  src="../../../app/assets/img/iphone.jpg"
                  alt="img"
                  class="sample__img"
                />
                <div class="template__info">
                  <div class="template__name">
                    Смартфон Apple iPhone 15 Pro 256Gb Natural Titanium 2 SIM
                    HK/CN
                  </div>
                  <div class="template__desc">
                    15 Pro • Natural Titanium • 128 ГБ
                  </div>
                </div>
              </SCheckbox>
            </div>
          </div>
          <SButton color="violet" size="large" class="w-p-100 mt-24">
            Добавить шаблоны
          </SButton>
        </STabWindow>
      </div>
      <div class="form-container"></div>
    </div>
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
import { ref } from "vue";

const tab = ref("one");
const sampleIndex = ref(0);

const selectTab = (selectedTab: string) => {
  tab.value = selectedTab;
};

const selectSample = (index: number) => {
  sampleIndex.value = index;
};
</script>

<style lang="scss">
@import "../../../app/style/colors.scss";
.product-create-content {
  .tabs-container {
    width: 32%;
    height: 200px;
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
  }

  .form-container {
    width: 68%;
    height: 200px;
    border: 1px solid;
  }
}
</style>
