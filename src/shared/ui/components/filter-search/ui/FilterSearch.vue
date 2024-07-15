<template>
  <div class="filter-search">
    <!-- TODO: use ui kit class for width value -->
    <!-- TODO: use slots for input with form tag for via slot tag -->
    <SInput isSearchable width="90%" @input="onInput" />
    <!-- TODO: set theme class at layout level -->
    <div class="light">
      <SButton variant="outlined" type="secondary" @click="onClick">
        <SIconRender name="filter" size="small" />
        {{ $t("lang-7de4a879-828e-48b2-997c-310f0d6e0d75") }}
      </SButton>
    </div>
    <!-- TODO: remove color attribute -->
    <!-- TODO: localize text -->
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

<!-- TODO: set scoped for style or use ui kit classes -->
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
