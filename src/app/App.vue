<template>
  <component :is="currentComponent">
    <SAlert :items="alertItems" @close="closeAlert" />
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import Layout from "@/shared/ui/layouts/Layout.vue";
import Empty from "@/shared/ui/layouts/Empty.vue";
import { shallowRef, watch, computed } from "vue";
import { SAlert } from "@tumarsoft/ogogo-ui";
import { useAlertStore } from "@/shared/store/alert";
import { useAuthStore } from "@/shared/store/auth";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const alertStore = useAlertStore();
let currentComponent = shallowRef(Empty);
const route = useRoute();
const alertItems = computed(() => alertStore.getAlertItems);

const closeAlert = (id: string) => {
  alertStore.closeAlert(id);
};

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
</script>
