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
          <!-- :label="$t('lang-5b5360db-a6ff-43a7-a8d4-f35517b9c4a8')" -->
          <SInput
            class="w-p-100"
            :rules="requiredField"
            v-model="loginObj.pin"
            v-maska:[options]
            :label="$t('lang-c53d0190-9e48-42e2-b346-ee9ea934955c')"
          />
        </div>
        <!-- <div class="input-password mb-36 mt-16">
          <SInput
            type="password"
            :label="$t('lang-5e3537d8-1a60-49cc-879c-1a1ad38c9d9d')"
            width="100%"
            :rules="requiredField"
            v-model="loginObj.password"
          />
          <p
            class="color-violet-600 font-semibold mt-16"
            @click="onForgetPassword"
          >
            {{ $t("lang-11d828ce-a252-4271-a12c-9291c52de2bd") }}
          </p>
        </div> -->
        <SButton
          size="large"
          color="violet"
          @click="onSubmitLogin"
          class="mb-8 w-p50"
        >
          {{ $t("lang-c4fdfffa-0730-4213-869b-e689860fa95d") }}
        </SButton>
        <!-- <SButton size="large" color="grey" @click="onSubmitLogin">
          {{ $t("lang-dff486df-0927-4f56-afc7-d543d3ba89e7") }}
        </SButton> -->
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

const onSubmitLogin = () => {
  console.log(loginObj.pin);

  const removedDashesAndBrackets = loginObj.pin.replace(/\D/g, "");

  loginObj.pin = removedDashesAndBrackets;

  if (loginForm.value.validateForm()) {
    loaderStore.setLoaderState(true);
    authStore
      .login(loginObj)
      .then(() => {
        loaderStore.setLoaderState(false);
        router.push("/property");
      })
      .catch((err: any) => {
        loaderStore.setLoaderState(false);
        alertStore.showError(err?.error?.errorMessage);
      });
  }
};

// @Prop({ type: String, default: null })
// tooltip

// @Prop({ type: Boolean, default: false })
// required

//   get commonAttrs() {
//     return {
//       value: '996 (',
//       dense: true,
//       outlined: true,
//       'validate-on-blur': true,
//       autocomplete: 'off',
//       hint: '996 (700) 12-34-56',
//       rules: Rules.getRule()[this.required ? 'mobile' : 'notRequiredMobile'].concat(
//         Array.isArray(this.$attrs.rules) ? this.$attrs.rules : []
//       )
//     }
//   }

//  {
//   }

//   onPaste(event: ClipboardEvent) {
//     const data = event.clipboardData.getData('text')
//     const target = event.target as HTMLInputElement

//     let phoneNumber = formatPhoneNumber(data)
//     if (phoneNumber.length > 9) {
//       phoneNumber = phoneNumber.slice(phoneNumber.length - 9)
//     }

//     target.value = conformPhoneNumber(phoneNumber)
//   }
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
