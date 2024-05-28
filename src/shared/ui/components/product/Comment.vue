<template>
  <div class="container mt-10">
    <div class="info">
      <span class="name">Модератор:</span>
      <span class="date">{{ formatDate(props.date) }}</span>
    </div>
    <div class="comment-body">{{ props.comment }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  comment: {
    type: String,
  },
  date: {
    type: String,
  },
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("ru");
};
</script>

<style lang="scss">
@import "../../../../app/style/colors.scss";
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  background: $gray-50;
  border-radius: 8px;
  border: 1px solid $red-500;
  padding: 5px;

  .info {
    display: flex;
    gap: 12px;

    .name {
      font-weight: 600;
      font-size: 12px;
    }

    .date {
      font-size: 12px;
      font-weight: 500;
      color: $gray-500;
    }
  }

  .comment-body {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
