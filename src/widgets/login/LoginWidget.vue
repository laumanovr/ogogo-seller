<template>
  <div class="login-container">
    <div class="login-block">
      <div class="login-logo">
        <img src="../../shared/ui/assets/Ogogo-logo.png" alt="img" />
      </div>
      <SForm class="form-block" ref="loginForm">
        <div class="form-title">
          {{ $t("lang-eff9e30c-a766-47df-b026-189d888586b8") }}
        </div>
        <div class="flex justify-between">
          <SInput
            class="w-p-100"
            :rules="[requiredField]"
            v-model="loginObj.pin"
            v-maska:[options]
            :label="$t('lang-c53d0190-9e48-42e2-b346-ee9ea934955c')"
          />
        </div>
        <div class="input-password s-mb-5">
          <SInput
            type="password"
            :label="$t('lang-5e3537d8-1a60-49cc-879c-1a1ad38c9d9d')"
            width="100%"
            :rules="[requiredField]"
            v-model="loginObj.password"
          />
          <p
            class="color-violet-600 font-semibold s-mt-2 cursor-pointer"
            @click="onForgetPassword"
          >
            {{ $t("lang-11d828ce-a252-4271-a12c-9291c52de2bd") }}
          </p>
        </div>
        <div class="light">
          <SButton size="large" @click="onSubmitLogin" class="s-mb-2">
            {{ $t("lang-91041855-c915-481e-a265-42816765bf51") }}
          </SButton>
          <!-- <SButton size="large" type="secondary" @click="onSellerRegistration">
            {{ $t("lang-dff486df-0927-4f56-afc7-d543d3ba89e7") }}
          </SButton> -->
        </div>
      </SForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SButton, SForm, SInput } from "@tumarsoft/ogogo-ui";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { requiredField } from "@/shared/lib/utils/rules";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { vMaska } from "maska";
import { useAuthStore } from "@/shared/store/auth";

const options = reactive({
  mask: "996-(###)-##-##-##",
  eager: true,
});

const authStore = useAuthStore();
const alertStore = useAlertStore();
const loaderStore = useLoaderStore();
const router = useRouter();

const loginObj = reactive({ pin: "", password: "" });
const loginForm = ref(null);

const onForgetPassword = () => {
  router.push("/password-reset");
};

// const onSellerRegistration = () => {
//   router.push("/seller-registration");
// };

const onSubmitLogin = () => {
  const removedDashesAndBrackets = loginObj.pin.replace(/\D/g, "");
  loginObj.pin = removedDashesAndBrackets;

  loginForm.value.validate().then((isValid: boolean) => {
    if (isValid) {
      loaderStore.setLoaderState(true);
      authStore
        .login(loginObj)
        .then(() => {
          loaderStore.setLoaderState(false);
          router.push("/profile");
        })
        .catch((err: any) => {
          loaderStore.setLoaderState(false);
          alertStore.showError(err?.error?.errorMessage);
        });
    }
  });
};
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
