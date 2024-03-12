<template>
  <div class="login-container">
    <div class="login-block">
      <div class="login-logo">
        <img src="../../shared/ui/assets/Ogogo-logo.png" alt="img" />
      </div>
      <SForm class="form-block" ref="loginForm">
        <div class="form-title">
          {{ $t("lang-cee0b1ca-cad5-4827-955b-ebd6a3dbf660") }}
        </div>

        <p class="">
          {{ $t("lang-71ebd9a8-09f5-4a3a-a45d-7420459d2b4b") }}
        </p>
        <div class="flex justify-between">
          <SInput
            class="w-p-100 mt-18 mb-44"
            :rules="requiredField"
            v-model="loginObj.pin"
            v-maska:[options]
            :label="$t('lang-c53d0190-9e48-42e2-b346-ee9ea934955c')"
          />
        </div>

        <SButton
          size="large"
          color="violet"
          @click="onSubmitPasswordReset"
          class="mb-8 w-p50"
        >
          {{ $t("lang-c4fdfffa-0730-4213-869b-e689860fa95d") }}
        </SButton>
      </SForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SForm, SInput } from "@tumarsoft/ogogo-ui";
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

const onSubmitPasswordReset = () => {};
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
