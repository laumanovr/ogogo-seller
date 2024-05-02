<template>
  <div class="product-form-container">
    <div class="head-title md">Главное о товаре</div>
    <div>
      <SInput
        label="Наименование товара *"
        width="100%"
        v-model="productObj.productName"
      />
    </div>
    <div class="d-flex items-end mt-16">
      <SInput
        label="Ваш артикул"
        width="85%"
        class="article"
        disabled
        v-model="productObj.toArticle"
      />
      <SButton color="gray" class="ml-12">Сгенерировать</SButton>
    </div>
    <!-- <div class="mt-16">
      <SInput label="Артикул производителя" width="100%"  />
    </div> -->
    <div class="mt-16 w-p-100">
      <STextArea
        label="Описание товара"
        width="100%"
        v-model="productObj.description"
      />
    </div>
    <div class="d-flex items-center justify-between mt-40 mb-30">
      <div class="head-title md">Цена</div>
      <div class="d-flex">
        <SRadioButton
          class="mr-24 radio-btn"
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
      <SInput label="Цена" width="32%" v-model="productObj.price" />
      <SInput label="Скидка в %" width="32%" v-model="productObj.discount" />
      <SInput label="Цена со скидкой" width="32%" v-model="priceWithDiscount" />
    </div>
    <div class="mt-16 mb-40">
      <SInput
        label="Наличие (кол-во) *"
        width="100%"
        v-model="productObj.countOfProduct"
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
        <div class="photo" v-for="image in productObj.photos" :key="image">
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
        На карточке может быть только одно видео – покажем его первым. Принимаем
        качественные ролики <br />
        не больше 30 МБ и не длинее 5 минут.
      </p>
      <div class="video"></div>
      <label for="video" class="add-content">
        <input type="file" id="video" @change="onSelectVideo" />
        <span>+</span>
      </label>
    </div>
    <div class="content-block mt-40">
      <div class="head-title md">Характеристики</div>
      <p class="content-hint">
        Это характеристики товара, которые могут быть выбраны покупателем при
        покупке. Например, цвет, <br />
        материал, объем и другие характеристики, которые могут варьироваться для
        одного и того же товара
      </p>
      <div class="d-flex justify-between flex-wrap">
        <div class="select-item mb-16" v-for="i in 4" :key="i">
          <SSelect label="Конфигурация памяти" class="w-p-100" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-end mt-60">
      <SButton color="violet" size="large" @click="submitProduct">
        Опубликовать
      </SButton>
    </div>
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
} from "@tumarsoft/ogogo-ui";
import { ref } from "vue";

const productObj = ref({
  toArticle: "",
  productName: "",
  description: "",
  categoryId: "",
  price: 0,
  discount: 0,
  organizationId: "",
  productType: 0,
  productPriceType: 0,
  photos: [],
  videos: [],
  templateId: "",
  countOfProduct: 0,
  isSaveAsDraft: false,
  properties: {},
});

const priceWithDiscount = ref("");

const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const onSelectPhoto = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files[0];
  if (file) {
    const convertedImage = await convertToBase64(file);
    productObj.value.photos.push(convertedImage);
  }
};

const deleteImage = (imgUrl: string) => {
  const index = productObj.value.photos.findIndex(
    (imageUrl) => imageUrl === imgUrl
  );
  productObj.value.photos.splice(index, 1);
};

const onSelectVideo = (e: Event) => {
  console.log(e);
};

const onSelectPriceType = (priceType: number) => {
  productObj.value.productPriceType = priceType;
};

const submitProduct = () => {
  console.log(productObj.value);
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
