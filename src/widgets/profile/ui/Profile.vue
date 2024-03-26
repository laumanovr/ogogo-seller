<template>
  <div class="profile-content">
    <div class="profile-title">
      {{ $t("lang-82e229f2-c516-4ca4-aeae-b04cbf3f0bcf") }}
    </div>
    <div class="profile-info-block">
      <div class="profile-tabs">
        <div class="tab" @click="changeTab('general')">
          <SIconRender
            name="ProfileEditIcon"
            :color="tab === 'general' ? 'violet' : ''"
          />
          <span :class="{ active: tab === 'general' }">{{
            $t("lang-41ad3377-6945-4978-8a3a-ad8d08292155")
          }}</span>
        </div>
        <div class="tab" @click="changeTab('shop')">
          <SIconRender
            name="ShopIcon"
            :color="tab === 'shop' ? 'violet' : 'black'"
          />
          <span :class="{ active: tab === 'shop' }">
            {{ $t("lang-595227fd-b603-43ea-a918-0b7f9edc6bac") }}</span
          >
        </div>
        <div class="tab" @click="changeTab('password')">
          <SIconRender
            name="PasswordIcon"
            :color="tab === 'password' ? 'violet' : ''"
          />
          <span :class="{ active: tab === 'password' }">
            {{ $t("lang-ad3a8ec6-bcb6-4dce-9ff6-a3ccc17c1e8d") }}
          </span>
        </div>
        <div class="tab" @click="changeTab('session')">
          <SIconRender
            name="SessionIcon"
            :color="tab === 'session' ? 'violet' : ''"
          />
          <span :class="{ active: tab === 'session' }">
            {{ $t("lang-3d338844-bc4d-4147-bfd3-c4d72659611e") }}
          </span>
        </div>
        <div class="divider"></div>
        <div class="tab">
          <SIconRender name="WhatsAppIcon" />
          <span :class="{ active: tab === 'help' }">
            {{ $t("lang-53b4af08-0a92-4732-abc4-544486b1887a") }}
          </span>
        </div>
        <div class="tab" @click="logout">
          <SIconRender name="LogoutIcon" />
          <span>{{ $t("lang-3cca1d55-3859-4aad-8f7a-2dc7e81dd716") }}</span>
        </div>
      </div>

      <div class="profile-data">
        <div class="content-block" v-if="tab === 'general'">
          <div class="data-title">
            {{ $t("lang-41ad3377-6945-4978-8a3a-ad8d08292155") }}
          </div>
          <div class="data-block">
            <div class="data-label">
              {{ $t("lang-c53d0190-9e48-42e2-b346-ee9ea934955c") }}
            </div>
            <div class="data-info">+{{ currentUser?.phone }}</div>
          </div>
          <div class="data-block">
            <div class="data-label">
              {{ $t("lang-6b722e0f-5196-40cc-856b-39635c043750") }}
            </div>
            <div class="data-info">
              {{ currentUser?.firstName + " " + currentUser?.lastName }}
            </div>
          </div>
          <div class="data-block">
            <div class="data-label">
              {{ $t("lang-c295a98f-59c2-4da0-87ee-2d38af296c8b") }}
            </div>
            <div class="data-info">Категории товаров</div>
          </div>
        </div>

        <div class="content-block" v-if="tab === 'shop'">
          <div class="photo d-flex items-center mb-40">
            <img :src="profileImageUrl" alt="" />
            <div class="photo-action ml-24">
              <div class="hint gray mb-12 mw-400">
                {{ $t("lang-f1c8caf8-4ba1-45c7-94a5-42c4ec1bd59b") }}
              </div>
              <label for="file">
                <input type="file" id="file" @change="onSelectFile" />
                <span class="upload-btn">
                  {{ $t("lang-c1d4974f-d48f-4107-99d8-d6a188b31129") }}
                </span>
              </label>
            </div>
          </div>
          <div class="data-title mb-8">
            {{ $t("lang-b9b9a34d-ccef-4f0a-bf1d-a0c0ee522954") }}
          </div>
          <div class="hint mb-20">
            {{ $t("lang-6711b6ad-a725-48d6-b231-1b8f90f23cf3") }}
          </div>
          <div class="mb-16">
            <SInput
              :label="$t('lang-4572af8e-fb1f-4f76-a997-de5bc6aa89fb')"
              width="100%"
              v-model="profileObj.name"
            />
          </div>
          <div>
            <STextArea
              :label="$t('lang-b1c420fe-8beb-4452-bf7c-165f69e8eabf')"
              width="100%"
              v-model="profileObj.description"
            />
          </div>
          <SButton
            color="violet"
            size="large"
            class="mt-20"
            @click="updateProfile"
          >
            {{ $t("lang-a7a081b0-bf2e-421d-9393-443f97ae0ef0") }}
          </SButton>
        </div>

        <div class="content-block" v-if="tab === 'password'">
          <div class="data-title mb-20">
            {{ $t("lang-df4b9d52-4813-4ed9-9111-278577ba5cf7") }}
          </div>
          <div class="mb-16">
            <SInput
              :label="$t('lang-701623e1-52b5-40a1-b912-4e49b4ff56ce')"
              width="100%"
            />
          </div>
          <div class="mb-16">
            <SInput
              :label="$t('lang-9dc6d3da-f6ff-4700-8b46-9b52d75deae0')"
              width="100%"
            />
          </div>
          <div class="mb-40">
            <SInput
              :label="$t('lang-0184de30-27b6-48af-bafc-3995afbb020d')"
              width="100%"
            />
          </div>
          <SButton color="violet" size="medium">
            {{ $t("lang-fe4564b9-e2c0-4905-8dac-30f81dd94081") }}
          </SButton>
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
import { useProfileStore } from "../store/profile.store";
import { IProfile } from "../store/profile-store.types";
import { IProfileApi } from "../api/profile-api.types";

const router = useRouter();
const profileStore = useProfileStore();
const tab = ref("");
const currentUser = ref<IProfile>(profileStore.currentUser);
const profileObj = ref({
  id: currentUser.value.tradeMarkId,
  logoBase64: null,
  name: null,
  description: null,
});

onMounted(() => {
  changeTab("general");
  fetchProfileInfo();
});

const changeTab = (val: string) => {
  tab.value = val;
};

const profileImageUrl = computed(() =>
  profileObj.value?.logoBase64
    ? profileObj.value?.logoBase64
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
    profileObj.value.logoBase64 = await convertToBase64(file);
  }
};

const fetchProfileInfo = () => {
  profileStore.getProfileInfo().then((response: IProfileApi) => {
    profileObj.value.name = response.name;
    profileObj.value.description = response.description;
    profileObj.value.logoBase64 = response.logoBase64;
  });
};

const updateProfile = () => {
  profileStore.updateProfileInfo(profileObj.value);
};

const logout = () => {
  router.push("/");
  window.localStorage.clear();
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
  .mw-400 {
    max-width: 400px;
  }
}
</style>
