<template>
  <div class="profile-content">
    <div class="profile-title">Личный кабинет</div>
    <div class="profile-info-block">
      <div class="profile-tabs">
        <div class="tab" @click="changeTab('general')">
          <SIconRender
            name="ProfileEditIcon"
            :color="tab === 'general' ? 'violet' : ''"
          />
          <span :class="{ active: tab === 'general' }">Общие данные</span>
        </div>
        <div class="tab" @click="changeTab('shop')">
          <SIconRender
            name="ShopIcon"
            :color="tab === 'shop' ? 'violet' : 'black'"
          />
          <span :class="{ active: tab === 'shop' }">Мой магазин</span>
        </div>
        <div class="tab" @click="changeTab('password')">
          <SIconRender
            name="PasswordIcon"
            :color="tab === 'password' ? 'violet' : ''"
          />
          <span :class="{ active: tab === 'password' }">Пароль</span>
        </div>
        <div class="tab" @click="changeTab('session')">
          <SIconRender
            name="SessionIcon"
            :color="tab === 'session' ? 'violet' : ''"
          />
          <span :class="{ active: tab === 'session' }">Активные сессии</span>
        </div>
        <div class="divider"></div>
        <div class="tab">
          <SIconRender name="WhatsAppIcon" />
          <span :class="{ active: tab === 'help' }">Помощь</span>
        </div>
        <div class="tab" @click="logout">
          <SIconRender name="LogoutIcon" />
          <span>Выйти</span>
        </div>
      </div>

      <div class="profile-data">
        <div class="content-block" v-if="tab === 'general'">
          <div class="data-title">Общие данные</div>
          <div class="data-block">
            <div class="data-label">Номер телефона</div>
            <div class="data-info">+996 775 899 080</div>
          </div>
          <div class="data-block">
            <div class="data-label">ФИО</div>
            <div class="data-info">Иван Иванов Иванович</div>
          </div>
          <div class="data-block">
            <div class="data-label">Тип товара</div>
            <div class="data-info">Категории товаров</div>
          </div>
        </div>

        <div class="content-block" v-if="tab === 'shop'">
          <div class="photo d-flex items-center mb-40">
            <img :src="profileImageUrl" alt="" />
            <div class="photo-action ml-24">
              <div class="hint gray mb-12">
                Формат: jpg, png. Максимальный размер файла: 2Mb. <br />
                Рекомендованный размер 200х200px.
              </div>
              <label for="file">
                <input type="file" id="file" @change="onSelectFile" />
                <span class="upload-btn">Загрузить</span>
              </label>
            </div>
          </div>
          <div class="data-title mb-8">Общие данные магазина</div>
          <div class="hint mb-20">
            Эта информация будет доступна для просмотра клиентами на
            маркетплейсе
          </div>
          <div class="mb-16"><SInput label="Наименование" width="100%" /></div>
          <div><STextArea label="Описание" width="100%" /></div>
          <SButton color="violet" size="large" class="mt-20">
            Запросить изменения
          </SButton>
        </div>

        <div class="content-block" v-if="tab === 'password'">
          <div class="data-title mb-20">Изменить пароль</div>
          <div class="mb-16">
            <SInput label="Старый пароль" width="100%" />
          </div>
          <div class="mb-16">
            <SInput label="Новый пароль" width="100%" />
          </div>
          <div class="mb-40">
            <SInput label="Еще раз новый пароль" width="100%" />
          </div>
          <SButton color="violet" size="medium">Изменить</SButton>
        </div>

        <div class="content-block" v-if="tab === 'session'">
          <div class="data-title mb-20">Последняя сессия</div>
          <div class="session-block">
            <div class="hint">Mac OS X, Mac • Браузер Chrome</div>
            <div class="hint gray">
              сегодня в 14:48 • Бишкек • 94.143.197.184 • Активный сеанс
            </div>
          </div>
        </div>
        <div class="content-block"></div>
        <div class="content-block"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { SButton, SInput, STextArea, SIconRender } from "@tumarsoft/ogogo-ui";
import { useRouter } from "vue-router";

const router = useRouter();
const tab = ref("");
const profileObj = ref({ image: null });

onMounted(() => {
  changeTab("general");
});

const changeTab = (val: string) => {
  tab.value = val;
};

const profileImageUrl = computed(() =>
  profileObj.value?.image
    ? profileObj.value?.image
    : "/src/app/assets/img/empty-photo.svg"
);

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

const onSelectFile = async (e: any) => {
  const file = e.target.files[0];
  if (file) {
    profileObj.value.image = await convertToBase64(file);
  }
};

const logout = () => {
  router.push("/");
  window.localStorage.removeItem("sessionId");
};
</script>

<style lang="scss" scoped>
@import "../../../app/style/colors.scss";
.profile-content {
  .profile-title {
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 35px;
  }
  .profile-info-block {
    display: flex;
  }
  .profile-tabs {
    margin-right: 40px;
    min-width: 280px;
    .tab {
      font-weight: 600;
      font-size: 16px;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 12px 50px 12px 0;
      span {
        margin-left: 16px;
      }
      .active {
        color: $violet-600;
      }
    }
  }
  .profile-data {
    padding-top: 12px;
    min-width: 550px;
  }
  .divider {
    border-bottom: 2px dotted $gray-200;
  }
  .content-block {
    .data-title {
      font-weight: 600;
      font-size: 16px;
    }
    .data-block {
      margin-top: 16px;
    }
    .data-label {
      font-weight: 500;
      font-size: 12px;
      color: $gray-500;
      margin-bottom: 4px;
    }
    .data-info {
      font-weight: 600;
      font-size: 14px;
    }
    .hint {
      font-weight: 500;
      font-size: 14px;
      &.gray {
        color: $gray-500;
      }
    }
    .session-block {
      border: 1px solid $gray-200;
      padding: 12px 16px;
      border-radius: 8px;
    }
    .photo {
      img {
        width: 96px;
        height: 96px;
        object-fit: cover;
      }
    }
  }
  #file {
    display: none;
  }
  .upload-btn {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    padding: 11px 16px;
    background: $white;
    border-radius: 8px;
    border: 1px solid $gray-200;
    cursor: pointer;
  }
  .textarea-container {
    width: 100%;
  }
}
</style>
