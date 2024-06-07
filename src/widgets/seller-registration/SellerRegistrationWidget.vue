<template>
  <div class="login-container">
    <div class="login-block">
      <div class="login-logo">
        <img src="../../shared/ui/assets/Ogogo-logo.png" alt="img" />
      </div>
      <SForm class="form-block" ref="loginForm">
        <div class="form-title">
          {{ $t("lang-d3d23ff7-606a-47c3-aa39-0e6ee4c00752") }}
        </div>

        <p class="">
          {{ $t("lang-5a7148a6-bad0-43eb-bed7-f9e92158b53a") }}
        </p>
        <div class="flex flex-col">
          <SInput
            class="w-p-100 s-mt-4"
            :rules="requiredField"
            v-model="loginObj.pin"
            v-maska:[options]
            :label="$t('lang-c53d0190-9e48-42e2-b346-ee9ea934955c')"
          />
          <SInput
            class="w-p-100 s-mt-4"
            :rules="requiredField"
            v-model="loginObj.pin"
            v-maska:[options]
            :label="$t('lang-6b722e0f-5196-40cc-856b-39635c043750')"
          />
          <SSelect
            :label="$t('lang-d0c19d1f-b018-45d1-93fa-2dc4a8b6878e')"
            class="w-p-100 s-mt-4"
          />
          <SCheckbox class="w-p-100 s-mt-4" placeholder="emir">
            {{ $t("lang-33c946fe-b106-4901-b3a0-356c7b421566") }}
          </SCheckbox>
        </div>

        <SButton
          size="large"
          color="violet"
          @click="onSubmitSellerRegistration"
          class="s-mb-2 w-p50 s-mt-4"
        >
          {{ $t("lang-c4fdfffa-0730-4213-869b-e689860fa95d") }}
        </SButton>
      </SForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  SButton,
  SForm,
  SInput,
  SSelect,
  SCheckbox,
} from "@tumarsoft/ogogo-ui";
import { ref, reactive } from "vue";
// import { useRouter } from "vue-router";
import { requiredField } from "@/shared/lib/utils/rules";
// import { useAlertStore } from "@/shared/store/alert";
// import { useLoaderStore } from "@/shared/store/loader";
import { vMaska } from "maska";
// import { useAuthStore } from "@/shared/store/auth";

const options = reactive({
  mask: "996-(###)-##-##-##",
  eager: true,
});

// const authStore = useAuthStore();
// const alertStore = useAlertStore();
// const loaderStore = useLoaderStore();
// const router = useRouter();

const loginObj = reactive({ pin: "", password: "" });
const loginForm = ref(null);

const onSubmitSellerRegistration = () => {};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login-block {
    .login-logo {
      text-align: center;
      margin-bottom: 32px;
    }
  }

  .form-block {
    background: #fff;
    width: 360px;
    padding: 24px;
    border-radius: 16px;
    box-shadow: 0 12px 32px 0 rgba(40, 43, 48, 0.15);

    .form-title {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 35px;
    }

    .button {
      width: 100%;
    }

    // .input-container {
    //   width: 100%;
    // }
  }
}
</style>
