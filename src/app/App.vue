<template>
  <component :is="currentComponent">
    <Loader v-if="isLoading" />
    <SAlert :items="alertItems" @close="closeAlert" />
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import Layout from "@/shared/ui/layouts/Layout.vue";
import Empty from "@/shared/ui/layouts/Empty.vue";
import Loader from "@/shared/ui/components/Loader.vue";
import { shallowRef, watch, computed } from "vue";
import { SAlert } from "@tumarsoft/ogogo-ui";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { useAuthStore } from "@/shared/store/auth";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const loaderStore = useLoaderStore();

let currentComponent = shallowRef(Empty);

const route = useRoute();

const alertItems = computed(() => alertStore.getAlertItems);
const isLoading = computed(() => loaderStore.getLoadingState);

const closeAlert = (id: string) => {
  alertStore.closeAlert(id);
};

// TODO: change component value to via computed
watch(
  () => route.path,
  () => {
    if (Boolean(authStore.getSessionId)) {
      currentComponent.value = Layout;
    } else {
      currentComponent.value = Empty;
    }
  }
);

// const currentComponent = computed(() => {
//   if (Boolean(getItem("sessionId"))) {
//     return Layout;
//   }
//   return Empty;
// });
</script>
