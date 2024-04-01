<template>
  <div class="filter-search">
    <SInput isSearchable width="90%" @input="onInput" />
    <SButton color="white" @click="onClick">
      <SIconRender name="SettingsIcon" />
      {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
    </SButton>
    <SButton color="white" v-if="props.showExcel">Скачать Excel</SButton>
  </div>
</template>

<script lang="ts" setup>
import { SInput, SButton, SIconRender } from "@tumarsoft/ogogo-ui";

const emit = defineEmits(["click", "input"]);
const props = defineProps({
  showExcel: {
    type: Boolean,
    default: false,
  },
});

const onClick = () => {
  emit("click");
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("input", target.value);
};
</script>

<style lang="scss">
.filter-search {
  display: flex;
  margin-bottom: 25px;

  .button {
    margin-left: 12px;
    white-space: nowrap;
    svg {
      min-width: 16px;
    }
  }
}
</style>
