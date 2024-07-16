<template>
  <div class="filter-search">
    <!-- TODO: use slots for input with form tag for via slot tag -->
    <SInput isSearchable hide-detailsdd @input="onInput" />
    <SButton variant="outlined" type="secondary" @click="onClick">
      <SIconRender name="filter" size="small" />
      {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
    </SButton>
    <SButton v-if="props.showExcel">
      {{ $t("lang-2e502d97-f33a-4fa6-b3f7-ada3177e70d2") }}
    </SButton>
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

<style lang="scss" scoped>
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
