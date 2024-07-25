<template>
  <div class="profile-content">
    <div class="profile-title">
      {{ $t("lang-82e229f2-c516-4ca4-aeae-b04cbf3f0bcf") }}
    </div>
    <div class="profile-info-block">
      <div class="profile-tabs">
        <SButton type="text" class="tab" @click="changeTab(ProfileTab.GENERAL)">
          <SIconRender
            name="user-edit"
            :class="{ 's-text-violet-600': tab === ProfileTab.GENERAL }"
          />
          <span :class="{ active: tab === ProfileTab.GENERAL }">{{
            $t("lang-41ad3377-6945-4978-8a3a-ad8d08292155")
          }}</span>
        </SButton>
        <SButton type="text" class="tab" @click="changeTab(ProfileTab.SHOP)">
          <SIconRender
            name="shop"
            :class="{ 's-text-violet-600': tab === ProfileTab.SHOP }"
          />
          <span :class="{ active: tab === ProfileTab.SHOP }">
            {{ $t("lang-595227fd-b603-43ea-a918-0b7f9edc6bac") }}</span
          >
        </SButton>
        <SButton
          type="text"
          class="tab"
          @click="changeTab(ProfileTab.PASSWORD)"
        >
          <SIconRender
            name="lock"
            :class="{ 's-text-violet-600': tab === ProfileTab.PASSWORD }"
          />
          <span :class="{ active: tab === ProfileTab.PASSWORD }">
            {{ $t("lang-ad3a8ec6-bcb6-4dce-9ff6-a3ccc17c1e8d") }}
          </span>
        </SButton>
        <SButton type="text" class="tab" @click="changeTab(ProfileTab.SESSION)">
          <SIconRender
            name="tv"
            :class="{ 's-text-violet-600': tab === ProfileTab.SESSION }"
          />
          <span :class="{ active: tab === ProfileTab.SESSION }">
            {{ $t("lang-3d338844-bc4d-4147-bfd3-c4d72659611e") }}
          </span>
        </SButton>
        <div class="divider"></div>
        <SButton type="text" class="tab">
          <SIconRender
            name="whatsapp"
            :class="{ 's-text-violet-600': tab === ProfileTab.HELP }"
          />
          <span :class="{ active: tab === ProfileTab.HELP }">
            {{ $t("lang-53b4af08-0a92-4732-abc4-544486b1887a") }}
          </span>
        </SButton>
        <SButton type="text" class="tab" @click="logout">
          <SIconRender name="logout" />
          <span>{{ $t("lang-3cca1d55-3859-4aad-8f7a-2dc7e81dd716") }}</span>
        </SButton>
      </div>

      <div class="profile-data">
        <div class="content-block" v-if="tab === ProfileTab.GENERAL">
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
            <div class="data-info">
              {{ $t("lang-6a3f0b82-3b93-4348-8788-a2ea2dcb2c88") }}
            </div>
          </div>
        </div>

        <div class="content-block" v-if="tab === ProfileTab.SHOP">
          <div class="photo s-flex items-center s-mb-8">
            <img :src="profileImageUrl" alt="" v-if="profileImageUrl" />
            <div class="photo-action s-ml-5">
              <div class="hint gray s-mb-3 mw-400">
                {{ $t("lang-f1c8caf8-4ba1-45c7-94a5-42c4ec1bd59b") }}
              </div>
              <!-- TODO: change to file input component -->
              <label for="file">
                <input type="file" id="file" @change="onSelectFile" />
                <span class="upload-btn">
                  {{ $t("lang-c1d4974f-d48f-4107-99d8-d6a188b31129") }}
                </span>
              </label>
            </div>
          </div>
          <div class="data-title s-mb-2">
            {{ $t("lang-b9b9a34d-ccef-4f0a-bf1d-a0c0ee522954") }}
          </div>
          <div class="hint s-mb-4">
            {{ $t("lang-6711b6ad-a725-48d6-b231-1b8f90f23cf3") }}
          </div>
          <div class="s-mb-4">
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
          <div class="light">
            <SButton size="large" class="s-mt-5" @click="updateProfile">
              {{ $t("lang-a7a081b0-bf2e-421d-9393-443f97ae0ef0") }}
            </SButton>
          </div>
        </div>

        <div class="content-block" v-if="tab === ProfileTab.PASSWORD">
          <div class="data-title s-mb-5">
            {{ $t("lang-df4b9d52-4813-4ed9-9111-278577ba5cf7") }}
          </div>
          <div class="s-mb-3">
            <SInput
              :label="$t('lang-9dc6d3da-f6ff-4700-8b46-9b52d75deae0')"
              type="password"
              v-model="newPassword"
            />
          </div>
          <div class="s-mb-6">
            <SInput
              :label="$t('lang-0184de30-27b6-48af-bafc-3995afbb020d')"
              type="password"
              v-model="repeatPassword"
            />
          </div>
          <div class="light">
            <SButton size="large" @click="updatePassword">
              {{ $t("lang-fe4564b9-e2c0-4905-8dac-30f81dd94081") }}
            </SButton>
          </div>
        </div>

        <div class="content-block" v-if="tab === ProfileTab.SESSION">
          <div class="data-title s-mb-4">
            {{ $t("lang-b6a40817-e615-4625-9aa0-0a3f59ef6bf2") }}
          </div>
          <div class="session-block">
            <div class="hint">Mac OS X, Mac • Браузер Chrome</div>
            <div class="hint gray">
              сегодня в 14:48 • Бишкек • 94.143.197.184 • Активный сеанс
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { SButton, SInput, STextArea, SIconRender } from "@tumarsoft/ogogo-ui";
import { useRouter } from "vue-router";
import { useProfileStore } from "@/entities/profile/store/profile.store";
import { useAlertStore } from "@/shared/store/alert";
import { ProfileTab } from "@/shared/lib/utils/enums";
import i18n from "@/shared/lib/plugins/i18n";

const router = useRouter();
const profileStore = useProfileStore();
const alertStore = useAlertStore();
const tab = ref("");
const newPassword = ref("");
const repeatPassword = ref("");
const currentUser = computed(() => profileStore.getCurrentUser);
const profileObj = computed(() => profileStore.getProfileObj);
profileObj.value.id = currentUser.value.tradeMarkId;

onMounted(() => {
  changeTab(ProfileTab.GENERAL);
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

// TODO: URL.createObjectURL(file) instead of this
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
    profileObj.value.logoFileName = file.name;
    profileObj.value.logoBase64 = await convertToBase64(file);
  }
};

const fetchProfileInfo = () => {
  profileStore.getProfileInfo();
};

const updateProfile = () => {
  profileStore.updateProfileInfo(profileObj.value);
};

const logout = () => {
  router.push({ name: "login" });
  // TODO: remove direct usage of localStorage actions - only through store
  window.localStorage.clear();
};

const updatePassword = () => {
  if (newPassword.value !== repeatPassword.value) {
    alertStore.showInfo(
      i18n.global.t("lang-00ada6c1-f6fc-4ab9-aa11-67280334a86d")
    );
    return;
  }
  if (newPassword.value.length) {
    profileStore
      .updateUserPassword({ newPassword: newPassword.value })
      .then(() => {
        newPassword.value = "";
        repeatPassword.value = "";
        alertStore.showSuccess(
          i18n.global.t("lang-07c7e723-8d94-4595-9cbc-86754bf563d1")
        );
      });
  }
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
