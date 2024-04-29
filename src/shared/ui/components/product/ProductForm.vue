<template>
  <div class="product-form-container">
    <div class="head-title md">Главное о товаре</div>
    <div>
      <SInput label="Наименование товара *" width="100%" />
    </div>
    <div class="d-flex items-end mt-16">
      <SInput label="Ваш артикул" width="85%" />
      <SButton color="gray" class="ml-12">Сгенерировать</SButton>
    </div>
    <div class="mt-16">
      <SInput label="Артикул производителя" width="100%" />
    </div>
    <div class="mt-16 w-p-100">
      <STextArea label="Описание товара" width="100%" />
    </div>
    <div class="d-flex items-center justify-between mt-40 mb-30">
      <div class="head-title md">Цена</div>
      <div class="d-flex">
        <SRadioButton class="mr-24 radio-btn">В сомах</SRadioButton>
        <SRadioButton class="radio-btn">В долларах</SRadioButton>
      </div>
    </div>
    <div class="d-flex justify-between">
      <SInput label="Цена в сомах" width="32%" />
      <SInput label="Скидка в %" width="32%" />
      <SInput label="Цена со скидкой" width="32%" />
    </div>
    <div class="mt-16 mb-40">
      <SInput label="Наличие (кол-во) *" width="100%" />
    </div>
    <div class="photo-block">
      <div class="head-title md">Фото</div>
      <p class="photo-hint">
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
        <label for="file" class="add-photo">
          <input type="file" id="file" @change="onSelectFile" />
          <span>+</span>
        </label>
      </div>
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
  photos: [],
});

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

const onSelectFile = async (e: Event) => {
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
  .photo-block {
    .head-title {
      margin: 0;
    }
    .photo-hint {
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
        top: -8px;
        right: -8px;
        & > rect {
          fill-opacity: 0.12;
        }
      }
    }
    .add-photo {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 35px;
      width: 180px;
      height: 180px;
      background: $gray-150;
      border-radius: 8px;
      cursor: pointer;
      #file {
        display: none;
      }
    }
  }
}
</style>
