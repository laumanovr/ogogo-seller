<template>
  <component :is="currentComponent">
    <SAlert :items="alertItems" @close="closeAlert" />
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import Layout from "@/shared/ui/layouts/Layout.vue";
import Empty from "@/shared/ui/layouts/Empty.vue";
import { computed } from "vue";
import { SAlert } from "@tumarsoft/ogogo-ui";
import { useAlertStore } from "@/shared/store/alert";
import { useAuthStore } from "@/shared/store/auth";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const alertItems = computed(() => alertStore.getAlertItems);

const closeAlert = (id: string) => {
  alertStore.closeAlert(id);
};

const currentComponent = computed(() => {
  if (authStore.getSessionId) {
    return Layout;
  }
  return Empty;
});
</script>
