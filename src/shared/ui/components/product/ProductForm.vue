<template>
  <div class="product-form-container">
    <div class="s-text-title-1 s-mb-6 s-mt-6">
      {{ $t("lang-3c525f10-24ab-44fa-9eda-8a503e97b2e9") }}
    </div>
    <SForm ref="productForm">
      <div>
        <SInput
          :label="$t('lang-cb1dea14-fb31-4e97-9364-9e33b4227c3a')"
          :rules="[requiredField]"
          v-model="productTemplate.productName"
        />
        <Comment
          :comment="validationName?.validationComment"
          :date="validationName?.moderationDate"
          v-if="validationName?.validationComment"
        />
      </div>
      <div class="s-flex s-items-end s-mt-4">
        <SInput
          :label="$t('lang-55e1b440-eda4-4966-96a0-220a338bcda1')"
          class="article"
          :rules="[requiredField]"
          v-model="productTemplate.toArticle"
        />
      </div>
      <div class="s-mt-4 s-w-full">
        <STextArea
          :label="$t('lang-240d2d7a-5a93-4647-a066-22a368702e04')"
          v-model="productTemplate.description"
        />
        <Comment
          :comment="validationDesc?.validationComment"
          :date="validationDesc?.moderationDate"
          v-if="validationDesc?.validationComment"
        />
      </div>
      <div class="s-flex s-items-center s-justify-between s-mt-8 s-mb-6">
        <div class="s-text-title-1 s-mb-6 s-mt-6">
          {{ $t("lang-333319c2-2df4-4057-a56a-28ddd7a790a1") }}
        </div>
        <div class="s-flex">
          <SRadioButtonGroup v-model="productTemplate.productPriceType">
            <SRadioButton
              class="s-mr-5 radio-btn"
              :value="PriceType.KGS"
              :checked="isPriceSelected(PriceType.KGS)"
            >
              {{ $t("lang-b72e9501-50f0-4b6f-947f-ff1a0fa982f4") }}
            </SRadioButton>
            <SRadioButton
              class="radio-btn"
              :value="PriceType.USD"
              :checked="isPriceSelected(PriceType.USD)"
            >
              {{ $t("lang-8367cd2d-3749-406a-a51d-21ada23297f8") }}
            </SRadioButton>
          </SRadioButtonGroup>
        </div>
      </div>
      <div>
        <div class="s-flex s-justify-between">
          <SInput
            :label="$t('lang-333319c2-2df4-4057-a56a-28ddd7a790a1')"
            class="s-w-64"
            type="number"
            :rules="[requiredField]"
            v-model="productTemplate.price"
          />
          <SInput
            type="number"
            :label="$t('lang-1f6f2dca-070c-48bc-941f-e1300024ffbb')"
            class="s-w-64"
            v-model="productTemplate.discount"
            @input="countPriceDiscount"
          />
          <SInput
            type="number"
            :label="$t('lang-5eb99c46-ed5f-4a24-85ad-d551ad812256')"
            class="s-w-64"
            v-model="priceWithDiscount"
            @input="countDiscountPercentage"
          />
        </div>
        <Comment
          :comment="validationPrice?.validationComment"
          :date="validationPrice?.moderationDate"
          v-if="validationPrice?.validationComment"
        />
      </div>
      <div class="s-mt-4 s-mb-8">
        <SInput
          :label="$t('lang-3997683f-c3d7-42a4-8f3e-f5aa235c4655')"
          class="s-w-full"
          type="number"
          required
          :rules="[requiredField]"
          v-model="productTemplate.countOfProduct"
        />
        <Comment
          :comment="validationCount?.validationComment"
          :date="validationCount?.moderationDate"
          v-if="validationCount?.validationComment"
        />
      </div>
      <div class="content-block">
        <div class="s-text-title-1 s-mb-6 s-mt-6">
          {{ $t("lang-d820a72f-7c7f-4ac0-b993-8d57d1904dde") }}
        </div>
        <p class="content-hint">
          {{ $t("lang-24ffb5fa-8580-4360-903e-8368b2102a65") }}
        </p>
        <div class="s-flex s-flex-wrap">
          <div
            class="photo"
            v-for="imageId in productTemplate.photos"
            :key="imageId"
          >
            <img :src="getFileById(imageId)" alt="img" />
            <SIconRender
              name="close"
              class="close-icon"
              size="small"
              @click="deleteImage(imageId)"
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
        <Comment
          :comment="validationFile?.photo?.validationComment"
          :date="validationFile?.photo?.moderationDate"
          v-if="validationFile?.photo?.validationComment"
        />
      </div>
      <div class="content-block s-mt-8">
        <div class="s-text-title-1 s-mb-6 s-mt-6">
          {{ $t("lang-65a33216-17a3-4f12-9e78-ef1b73efcdf0") }}
        </div>
        <p class="content-hint">
          {{ $t("lang-7e304bc9-dc84-4bbc-8433-3a819a81b006") }}
        </p>
        <div class="s-flex">
          <video
            class="video"
            controls
            width="180"
            height="180"
            :key="videoKey"
          >
            <source
              :src="getFileById(productTemplate.videos[0])"
              type="video/mp4"
            />
          </video>
          <!-- TODO: extract to FileInput component in ui kit -->
          <label for="video" class="add-content s-ml-6">
            <input type="file" id="video" @change="onSelectVideo" />
            <span>+</span>
          </label>
        </div>
        <Comment
          :comment="validationFile?.video?.validationComment"
          :date="validationFile?.video?.moderationDate"
          v-if="validationFile?.video?.validationComment"
        />
      </div>
      <div class="content-block s-mt-8">
        <div class="s-text-title-1 s-mb-6 s-mt-6">
          {{ $t("lang-c00a03d8-8bb2-4d54-93e7-fc0379b86f51") }}
        </div>
        <p class="content-hint">
          {{ $t("lang-57fa3e1f-c77d-4680-971b-cfbeff2846c8") }}
        </p>
        <div class="s-flex justify-between flex-wrap">
          <div
            class="select-item s-mb-2"
            v-for="property in properties"
            :key="property.propertyId"
          >
            <SSelect
              class="s-w-full"
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
      <div class="s-flex s-justify-end s-mt-10">
        <SButton
          type="secondary"
          size="large"
          class="s-mr-2"
          @click="saveAsDraft"
          v-if="props.mode === ProductMode.CREATE"
        >
          {{ $t("lang-7456f0e4-daa3-4886-b15e-5fc41b19b2d4") }}
        </SButton>
        <SButton size="large" @click="submitProduct">
          {{
            props.mode === ProductMode.CREATE
              ? $t("lang-01b61f03-58d8-4b95-880e-a6b75920efad")
              : $t("lang-8f48f729-499b-4bc4-af8c-fe41ecee4475")
          }}
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
import { PriceType, ProductMode } from "@/shared/lib/utils/enums";
import { useAlertStore } from "@/shared/store/alert";
import { getFileById } from "@/shared/composable";

const props = defineProps({
  mode: {
    type: String,
    default: "create",
  },
  productCategoryId: {
    type: String,
  },
});

const alertStore = useAlertStore();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();
const priceWithDiscount = ref(0);
const videoKey = ref(0);
const selectedCategoryId = route.query.id || props.productCategoryId;
const propertyObject = ref<any>({});
const productForm = ref(null);
const isPhotoValid = ref(true);
const productTemplate = computed(() => productStore.getProductTemplate);
const validationName = computed(() => productStore.getValidationName);
const validationDesc = computed(() => productStore.getValidationDescription);
const validationPrice = computed(() => productStore.getValidationPrice);
const validationCount = computed(() => productStore.getValidationCount);
const validationFile = computed(() => productStore.getValidationFile);
const properties = computed(() => categoryStore.getCategoryWithProperties);

onMounted(() => {
  if (props.mode === ProductMode.CREATE) {
    priceWithDiscount.value = 0;
  }
  categoryStore.getCategoryWithPropertiesById(selectedCategoryId as string);
});

const isEmptyPhoto = computed(
  () => !isPhotoValid.value && !productTemplate.value.photos.length
);

const isPriceSelected = (priceType: number) => {
  return productTemplate.value.productPriceType == priceType;
};

// TODO: use FileInput component in ui kit with upload handler
const onSelectPhoto = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target?.files[0];
  if (file) {
    productStore.uploadFile(file).then((response) => {
      productTemplate.value.photos.push(response.result.fileId);
    });
  }
};

const deleteImage = (imgUrl: string) => {
  const index = productTemplate.value.photos.findIndex(
    (imageUrl: any) => imageUrl === imgUrl
  );
  productTemplate.value.photos.splice(index, 1);
};

const countPriceDiscount = () => {
  const discountSum =
    Number(productTemplate.value.price) *
    (productTemplate.value.discount / 100);
  priceWithDiscount.value = Number(productTemplate.value.price) - discountSum;
};

const countDiscountPercentage = () => {
  const diffSum = Number(productTemplate.value.price) - priceWithDiscount.value;
  productTemplate.value.discount =
    (diffSum / productTemplate.value.price) * 100;
};

const onSelectVideo = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target?.files[0];
  if (file) {
    productStore.uploadFile(file).then((response) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        videoKey.value++;
        productTemplate.value.videos = [response.result.fileId];
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
  productTemplate.value.organizationId =
    profileStore.currentUser.organizationId;
  productTemplate.value.productType = 14701;
  productTemplate.value.categoryId = selectedCategoryId as string;
  delete productTemplate.value.validationDetails;
  if (Object.entries(propertyObject.value).length) {
    productTemplate.value.properties = propertyObject.value;
  }
};

const submitProduct = () => {
  isPhotoValid.value = Boolean(productTemplate.value.photos.length);
  productForm.value.validate().then((isValid: boolean) => {
    if (isValid && !isEmptyPhoto.value) {
      prepareFormFields();
      if (props.mode === ProductMode.CREATE) {
        productStore.createProduct(productTemplate.value).then(() => {
          router.push({ name: "products" });
          alertStore.showSuccess("Успешно создано");
        });
      } else {
        productStore.updateProduct(productTemplate.value).then(() => {
          router.push({ name: "products" });
          alertStore.showSuccess("Успешно обновлено");
        });
      }
    }
  });
};

const saveAsDraft = () => {
  prepareFormFields();
  productTemplate.value.isSaveAsDraft = true;
  productStore.createProduct(productTemplate.value).then(() => {
    router.push({ name: "products" });
    alertStore.showSuccess("Черновик создан");
  });
};
</script>

<style lang="scss" scoped>
@import "../../../../app/style/colors.scss";
.product-form-container {
  width: 68%;
  .radio-btn {
    .radio-label {
      height: 20px;
    }
  }
  .content-block {
    .content-hint {
      font-size: 14px;
      font-weight: 500;
      margin: 8px 0 24px;
      white-space: break-spaces;
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
