<template>
  <div class="product-form-container">
    <div class="head-title md">Главное о товаре</div>
    <SForm ref="productForm">
      <div>
        <SInput
          label="Наименование товара"
          width="100%"
          :rules="requiredField"
          v-model="productStore.productTemplate.productName"
        />
      </div>
      <div class="d-flex items-end mt-16">
        <SInput
          label="Ваш артикул"
          width="85%"
          class="article"
          :rules="requiredField"
          v-model="productStore.productTemplate.toArticle"
        />
        <SButton color="gray" class="ml-12">Сгенерировать</SButton>
      </div>
      <div class="mt-16 w-p-100">
        <STextArea
          label="Описание товара"
          width="100%"
          v-model="productStore.productTemplate.description"
        />
      </div>
      <div class="d-flex items-center justify-between mt-40 mb-30">
        <div class="head-title md">Цена</div>
        <div class="d-flex">
          <SRadioButton
            class="mr-24 radio-btn"
            isSelected
            @onChange="onSelectPriceType(14600)"
          >
            В сомах
          </SRadioButton>
          <SRadioButton class="radio-btn" @onChange="onSelectPriceType(14601)">
            В долларах
          </SRadioButton>
        </div>
      </div>
      <div class="d-flex justify-between">
        <SInput
          label="Цена"
          width="32%"
          :rules="requiredField"
          v-model="productStore.productTemplate.price"
        />
        <SInput
          type="number"
          label="Скидка в %"
          width="32%"
          v-model="productStore.productTemplate.discount"
          @input="countPriceDiscount"
        />
        <SInput
          type="number"
          label="Цена со скидкой"
          width="32%"
          v-model="priceWithDiscount"
        />
      </div>
      <div class="mt-16 mb-40">
        <SInput
          label="Наличие (кол-во) *"
          width="100%"
          :rules="requiredField"
          v-model="productStore.productTemplate.countOfProduct"
        />
      </div>
      <div class="content-block">
        <div class="head-title md">Фото</div>
        <p class="content-hint">
          Добавьте изображение товара. Изображение максимум 2000 х 2000 px, в
          формате PNG или JPEG. <br />
          Размер файла – не более 15 МБ.
        </p>
        <div class="d-flex flex-wrap">
          <div class="photo" v-for="image in productImages" :key="image">
            <img :src="image" alt="img" />
            <SIconRender
              name="CloseRoundIcon"
              color="grey"
              class="close-icon"
              @click="deleteImage(image)"
            />
          </div>
          <label for="photo" class="add-content">
            <input type="file" id="photo" @change="onSelectPhoto" />
            <span>+</span>
          </label>
        </div>
      </div>
      <div class="content-block mt-40">
        <div class="head-title md">Видео</div>
        <p class="content-hint">
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
          <label for="video" class="add-content ml-10">
            <input type="file" id="video" @change="onSelectVideo" />
            <span>+</span>
          </label>
        </div>
      </div>
      <div class="content-block mt-40">
        <div class="head-title md">Характеристики</div>
        <p class="content-hint">
          Это характеристики товара, которые могут быть выбраны покупателем при
          покупке. Например, цвет, <br />
          материал, объем и другие характеристики, которые могут варьироваться
          для одного и того же товара
        </p>
        <div class="d-flex justify-between flex-wrap">
          <div
            class="select-item mb-16"
            v-for="property in properties"
            :key="property.propertyId"
          >
            <SSelect
              class="w-p-100"
              :label="showPropertyName(property)"
              :items="property.allowedValues"
              :rules="requiredField"
              showValue="propertyValueText"
              getValue="propertyValueId"
              v-model="property.selectedValueId"
              @onChange="onSelectProperty(property)"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-end mt-60">
        <SButton color="violet" size="large" @click="submitProduct">
          Опубликовать
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
  SIconRender,
  SForm,
} from "@tumarsoft/ogogo-ui";
import { ref, onMounted } from "vue";
import { useProductStore } from "@/entities/products/store/product.store";
import { useCategoryStore } from "@/entities/category/store/category.store";
import { useProfileStore } from "@/widgets/profile/store/profile.store";
import { requiredField } from "@/shared/lib/utils/rules";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();
const priceWithDiscount = ref(0);
const videoKey = ref(0);
const videoUrl = ref("");
const properties = ref([]);
const selectedCategoryId = route.query.id;
const propertyObject = ref<any>({});
const productImages = ref([]);
const productForm = ref(null);

onMounted(() => {
  onSelectPriceType(14600);
  categoryStore
    .getCategoryWithPropertiesById(selectedCategoryId as string)
    .then((response) => {
      properties.value = response.result.properties;
    });
});

const onSelectPhoto = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files[0];
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
    productStore.productTemplate.price *
    (productStore.productTemplate.discount / 100);
  priceWithDiscount.value = productStore.productTemplate.price - discountSum;
};

const onSelectVideo = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files[0];
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

const onSelectPriceType = (priceType: number) => {
  productStore.productTemplate.productPriceType = priceType;
};

const showPropertyName = (property: any) => {
  return property.name;
};

const onSelectProperty = (property: any) => {
  propertyObject.value[property.key] = property.selectedValueId;
};

const submitProduct = () => {
  console.log("isValid:", productForm.value.validateForm());
  productStore.productTemplate.organizationId =
    profileStore.currentUser.organizationId;
  productStore.productTemplate.productType = 14701;
  productStore.productTemplate.categoryId = selectedCategoryId as string;
  productStore.productTemplate.properties = propertyObject.value;
  console.log(productStore.productTemplate);
  // productStore.createProduct(productStore.productTemplate).then(() => {
  //   router.push("/products");
  // });
};
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
        object-fit: cover;
        border-radius: 8px;
      }
      .close-icon {
        position: absolute;
        top: -7px;
        right: -7px;
        & > rect {
          fill-opacity: 0.12;
        }
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
