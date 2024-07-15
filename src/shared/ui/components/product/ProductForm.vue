<template>
  <div class="product-form-container">
    <!-- TODO: localize titles -->
    <div class="head-title md">Главное о товаре</div>
    <SForm ref="productForm">
      <div>
        <!-- TODO: localize placeholder -->
        <!-- TODO: use ui kit class for width value -->
        <SInput
          label="Наименование товара"
          width="100%"
          :rules="[requiredField]"
          v-model="productStore.productTemplate.productName"
        />
        <!-- TODO: what a train of null coalescing operators! use computed getter from store -->
        <Comment
          :comment="
            productStore.productTemplate.validationDetails?.fields?.name
              ?.validationComment
          "
          :date="
            productStore.productTemplate.validationDetails?.fields?.name
              .moderationDate
          "
          v-if="
            productStore.productTemplate.validationDetails?.fields?.name
              ?.validationComment
          "
        />
      </div>
      <!-- TODO: remove preset classes and use ui kit classes -->
      <div class="d-flex items-end s-mt-4">
        <!-- TODO: localize text -->
        <!-- TODO: use ui kit class for width value -->
        <!-- TODO: use computed getter for v-model value -->
        <SInput
          label="Ваш артикул"
          width="100%"
          class="article"
          :rules="[requiredField]"
          v-model="productStore.productTemplate.toArticle"
        />
      </div>
      <!-- TODO: remove preset classes and use ui kit classes -->
      <div class="s-mt-4 w-p-100">
        <!-- TODO: localize placeholder -->
        <!-- TODO: use ui kit class for width value -->
        <STextArea
          label="Описание товара"
          width="100%"
          v-model="productStore.productTemplate.description"
        />
        <Comment
          :comment="
            productStore.productTemplate.validationDetails?.fields?.description
              ?.validationComment
          "
          :date="
            productStore.productTemplate.validationDetails?.fields?.description
              .moderationDate
          "
          v-if="
            productStore.productTemplate.validationDetails?.fields?.description
              ?.validationComment
          "
        />
      </div>
      <!-- TODO: remove preset classes and use ui kit classes -->
      <div class="d-flex items-center justify-between s-mt-8 s-mb-6">
        <!-- TODO: localize titles -->
        <div class="head-title md">Цена</div>
        <!-- TODO: remove preset classes and use ui kit classes -->
        <div class="d-flex">
          <!-- TODO: use computed getter for v-model value -->
          <SRadioButtonGroup
            v-model="productStore.productTemplate.productPriceType"
          >
            <!-- TODO: use enum for value and checked -->
            <SRadioButton
              class="s-mr-5 radio-btn"
              value="14600"
              :checked="isPriceSelected(14600)"
            >
              <!-- TODO: localize text -->
              В сомах
            </SRadioButton>
            <!-- TODO: use enum for value and checked -->
            <SRadioButton
              class="radio-btn"
              value="14601"
              :checked="isPriceSelected(14601)"
            >
              <!-- TODO: localize text -->
              В долларах
            </SRadioButton>
          </SRadioButtonGroup>
        </div>
      </div>
      <div>
        <!-- TODO: remove preset classes and use ui kit classes -->
        <div class="d-flex justify-between">
          <!-- TODO: localize placeholder -->
          <!-- TODO: use ui kit class for width value -->
          <SInput
            label="Цена"
            width="32%"
            type="number"
            :rules="[requiredField]"
            v-model="productStore.productTemplate.price"
          />
          <!-- TODO: localize placeholder -->
          <!-- TODO: use ui kit class for width value -->
          <SInput
            type="number"
            label="Скидка в %"
            width="32%"
            v-model="productStore.productTemplate.discount"
            @input="countPriceDiscount"
          />
          <!-- TODO: localize placeholder -->
          <!-- TODO: use ui kit class for width value -->
          <SInput
            type="number"
            label="Цена со скидкой"
            width="32%"
            v-model="priceWithDiscount"
            @input="countDiscountPercentage"
          />
        </div>
        <!-- TODO: what a train of null coalescing operators! use computed getter from store -->
        <Comment
          :comment="
            productStore.productTemplate.validationDetails?.fields?.price
              ?.validationComment
          "
          :date="
            productStore.productTemplate.validationDetails?.fields?.price
              .moderationDate
          "
          v-if="
            productStore.productTemplate.validationDetails?.fields?.price
              ?.validationComment
          "
        />
      </div>
      <div class="s-mt-4 s-mb-8">
        <!-- TODO: localize placeholder -->
        <!-- TODO: use ui kit class for width value -->
        <!-- TODO: use required attribute for input -->
        <!-- TODO: use computed getter for v-model value -->
        <SInput
          label="Наличие (кол-во) *"
          width="100%"
          type="number"
          :rules="[requiredField]"
          v-model="productStore.productTemplate.countOfProduct"
        />
        <!-- TODO: what a train of null coalescing operators! use computed getter from store -->
        <Comment
          :comment="
            productStore.productTemplate.validationDetails?.fields
              ?.countofproduct?.validationComment
          "
          :date="
            productStore.productTemplate.validationDetails?.fields
              ?.countofproduct.moderationDate
          "
          v-if="
            productStore.productTemplate.validationDetails?.fields
              ?.countofproduct?.validationComment
          "
        />
      </div>
      <div class="content-block">
        <!-- TODO: localize titles -->
        <div class="head-title md">Фото</div>
        <p class="content-hint">
          <!-- TODO: localize text -->
          Добавьте изображение товара. Изображение максимум 2000 х 2000 px, в
          формате PNG или JPEG. <br />
          Размер файла – не более 15 МБ.
        </p>
        <!-- TODO: remove preset classes and use ui kit classes -->
        <div class="d-flex flex-wrap">
          <div class="photo" v-for="image in productImages" :key="image">
            <img :src="image" alt="img" />
            <SIconRender
              name="close"
              class="close-icon"
              size="small"
              @click="deleteImage(image)"
            />
          </div>
          <!-- TODO: extract to FileInput component in ui kit -->
          <label
            for="photo"
            class="add-content"
            :class="{ error: isEmptyPhoto }"
          >
            <input type="file" id="photo" @change="onSelectPhoto" />
            <span>+</span>
          </label>
        </div>
        <!-- TODO: what a train of null coalescing operators! use computed getter from store -->
        <Comment
          :comment="
            productStore.productTemplate.validationDetails?.files?.photo
              ?.validationComment
          "
          :date="
            productStore.productTemplate.validationDetails?.files?.photo
              .moderationDate
          "
          v-if="
            productStore.productTemplate.validationDetails?.files?.photo
              ?.validationComment
          "
        />
      </div>
      <div class="content-block s-mt-8">
        <!-- TODO: localize titles -->
        <div class="head-title md">Видео</div>
        <p class="content-hint">
          <!-- TODO: localize text -->
          На карточке может быть только одно видео – покажем его первым.
          Принимаем качественные ролики <br />
          не больше 30 МБ и не длинее 5 минут.
        </p>
        <div class="d-flex">
          <video
            class="video"
            controls
            width="180"
            height="180"
            :key="videoKey"
          >
            <source :src="videoUrl" type="video/mp4" />
          </video>
          <!-- TODO: extract to FileInput component in ui kit -->
          <label for="video" class="add-content s-ml-6">
            <input type="file" id="video" @change="onSelectVideo" />
            <span>+</span>
          </label>
        </div>
        <!-- TODO: what a train of null coalescing operators! use computed getter from store -->
        <Comment
          :comment="
            productStore.productTemplate.validationDetails?.files?.video
              ?.validationComment
          "
          :date="
            productStore.productTemplate.validationDetails?.files?.video
              .moderationDate
          "
          v-if="
            productStore.productTemplate.validationDetails?.files?.video
              ?.validationComment
          "
        />
      </div>
      <div class="content-block s-mt-8">
        <!-- TODO: localize titles -->
        <div class="head-title md">Характеристики</div>
        <p class="content-hint">
          <!-- TODO: localize text -->
          Это характеристики товара, которые могут быть выбраны покупателем при
          покупке. Например, цвет, <br />
          материал, объем и другие характеристики, которые могут варьироваться
          для одного и того же товара
        </p>
        <div class="d-flex justify-between flex-wrap">
          <div
            class="select-item s-mb-2"
            v-for="property in properties"
            :key="property.propertyId"
          >
            <!-- TODO: use ui kit class for width value -->
            <SSelect
              class="w-p-100"
              :label="showPropertyName(property)"
              :items="property.allowedValues"
              :rules="[requiredField]"
              itemTitle="propertyValueText"
              itemValue="propertyValueId"
              v-model="property.selectedValueId"
              @change="onSelectProperty(property)"
            />
          </div>
        </div>
      </div>
      <!-- TODO: set theme class at layout level -->
      <!-- TODO: remove preset classes and use ui kit classes -->
      <div class="light d-flex justify-end s-mt-10">
        <!-- TODO: extract mode to global enum  -->
        <SButton
          type="secondary"
          size="large"
          class="s-mr-2"
          @click="saveAsDraft"
          v-if="props.mode === 'create'"
        >
          <!-- TODO: localize text -->
          Сохранить как черновик
        </SButton>
        <!-- TODO: localize text -->
        <!-- TODO: use global enum for mode -->
        <SButton size="large" @click="submitProduct">
          {{ props.mode === "create" ? "Опубликовать" : "Редактировать" }}
        </SButton>
      </div>
    </SForm>
  </div>
</template>

<script lang="ts" setup>
import {
  SInput,
  SButton,
  STextArea,
  SSelect,
  SRadioButton,
  SRadioButtonGroup,
  SIconRender,
  SForm,
} from "@tumarsoft/ogogo-ui";
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "@/entities/products/store/product.store";
import { useCategoryStore } from "@/entities/category/store/category.store";
import { useProfileStore } from "@/entities/profile/store/profile.store";
import { requiredField } from "@/shared/lib/utils/rules";
import Comment from "./Comment.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios";

const props = defineProps({
  mode: {
    type: String,
    default: "create",
  },
  productCategoryId: {
    type: String,
  },
});

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();

// TODO: can be extracted to a store state
const priceWithDiscount = ref(0);
// TODO: can be removed if videoUrl is extracted to a store state
const videoKey = ref(0);
// TODO: can be extracted to a store state
const videoUrl = ref("");
// TODO: can be extracted to a store state
const properties = ref([]);
// TODO: can be extracted to a store state
const selectedCategoryId = route.query.id || props.productCategoryId;
// TODO: can be extracted to a store state
const propertyObject = ref<any>({});
// TODO: can be extracted to a store state
const productImages = ref([]);
const productForm = ref(null);
// TODO: can be removed and replaced by SForm with input component validations via rules attribute
const isPhotoValid = ref(true);

onMounted(() => {
  // TODO: use global enum for mode
  if (props.mode === "update") {
    // TODO: use getters from auth store. no direct access to sessionId should be allowed!
    const sessionId = JSON.parse(window.localStorage.getItem("sessionId"));
    // TODO: set baseUrl here??? set base url in main or use service provider for another domain request
    const defaultUrl = axios.defaults.baseURL;
    // TODO: image src should be defined at image src attribute. example: src="getImageUrl(image)"
    productStore.productTemplate.photos.forEach((photoId) => {
      const photo = `${defaultUrl}File/FileById?id=${photoId}&sessionId=${sessionId}`;
      productImages.value.push(photo);
    });

    // TODO: video src should be defined at video src attribute. example: src="getVideoUrl(video)"
    if (productStore.productTemplate.videos.length) {
      const videoId = productStore.productTemplate.videos[0];
      videoUrl.value = `${defaultUrl}File/FileById?id=${videoId}&sessionId=${sessionId}`;
    }
  } else {
    priceWithDiscount.value = 0;
  }

  categoryStore
    .getCategoryWithPropertiesById(selectedCategoryId as string)
    .then((response) => {
      // TODO: set items and page params to store
      // TODO: getCategoryWithPropertiesById should return only properties object. no response.result accessing
      properties.value = response.result.properties;
      // TODO: use global enum for mode
      if (props.mode === "update") {
        const selectedPropValues: any = [];
        categoryStore.saveSelectedCategoryPath([
          { name: response.result.categoryName },
        ]);
        // TODO: set data to store and use getters from store
        Object.entries(productStore.productTemplate.properties).forEach(
          (item) => {
            selectedPropValues.push({ key: item[0], valueId: item[1] });
          }
        );

        // TODO: set selectedValueId at the store level
        properties.value = properties.value.map((property) => {
          const selectedObj = selectedPropValues.find(
            (item: any) => item.key === property.key
          );
          if (selectedObj) {
            property.selectedValueId = selectedObj.valueId;
          }
          return property;
        });
      }
    });
});

// TODO: can be removed after SForm with input component validations via rules attribute is used
const isEmptyPhoto = computed(
  () => !isPhotoValid.value && !productStore.productTemplate.photos.length
);

// TODO: priceType should be type of enum
const isPriceSelected = (priceType: number) => {
  return productStore.productTemplate.productPriceType == priceType;
};

// TODO: use FileInput component in ui kit with upload handler
const onSelectPhoto = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target?.files[0];
  if (file) {
    productStore.uploadFile(file).then((response) => {
      productImages.value.push(URL.createObjectURL(file));
      productStore.productTemplate.photos.push(response.result.fileId);
    });
  }
};

const deleteImage = (imgUrl: string) => {
  const index = productStore.productTemplate.photos.findIndex(
    (imageUrl: any) => imageUrl === imgUrl
  );
  productImages.value.splice(index, 1);
  productStore.productTemplate.photos.splice(index, 1);
};

const countPriceDiscount = () => {
  const discountSum =
    Number(productStore.productTemplate.price) *
    (productStore.productTemplate.discount / 100);
  priceWithDiscount.value =
    Number(productStore.productTemplate.price) - discountSum;
};

const countDiscountPercentage = () => {
  const diffSum =
    Number(productStore.productTemplate.price) - priceWithDiscount.value;
  productStore.productTemplate.discount =
    (diffSum / productStore.productTemplate.price) * 100;
};

const onSelectVideo = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target?.files[0];
  if (file) {
    productStore.uploadFile(file).then((response) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        videoUrl.value = reader.result as string;
        videoKey.value++;
        productStore.productTemplate.videos = [response.result.fileId];
      };
    });
  }
};

const showPropertyName = (property: any) => {
  return property.name;
};

const onSelectProperty = (property: any) => {
  propertyObject.value[property.key] = property.selectedValueId;
};

const prepareFormFields = () => {
  productStore.productTemplate.organizationId =
    profileStore.currentUser.organizationId;
  productStore.productTemplate.productType = 14701;
  productStore.productTemplate.categoryId = selectedCategoryId as string;
  delete productStore.productTemplate.validationDetails;
  if (Object.entries(propertyObject.value).length) {
    productStore.productTemplate.properties = propertyObject.value;
  }
};

const submitProduct = () => {
  isPhotoValid.value = Boolean(productStore.productTemplate.photos.length);
  productForm.value.validate().then((isValid: boolean) => {
    if (isValid && !isEmptyPhoto.value) {
      prepareFormFields();
      if (props.mode === "create") {
        productStore.createProduct(productStore.productTemplate).then(() => {
          router.push("/products");
        });
      } else {
        productStore.updateProduct(productStore.productTemplate).then(() => {
          router.push("/products");
        });
      }
    }
  });
};

const saveAsDraft = () => {
  prepareFormFields();
  productStore.productTemplate.isSaveAsDraft = true;
  productStore.createProduct(productStore.productTemplate).then(() => {
    router.push("/products");
  });
};
</script>

<!-- TODO: set scoped for style or use ui kit classes -->
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
  .content-block {
    .head-title {
      margin: 0;
    }
    .content-hint {
      font-size: 14px;
      font-weight: 500;
      margin: 8px 0 24px;
    }
    .photo {
      position: relative;
      width: 180px;
      height: 180px;
      margin: 0 8px 8px 0;
      border-radius: 8px;
      border: 1px solid $gray-200;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
      }
      .close-icon {
        position: absolute;
        top: -7px;
        right: -7px;
        background: $gray-100;
        border-radius: 6px;
      }
    }
    .add-content {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 35px;
      width: 180px;
      height: 180px;
      background: $gray-150;
      border-radius: 8px;
      cursor: pointer;
      #photo,
      #video {
        display: none;
      }
      &.error {
        border: 1px solid $red-500;
      }
    }
    .select-item {
      width: calc(50% - 6px);
    }
  }
  .article.disabled {
    opacity: 0.9;
  }
}
</style>
