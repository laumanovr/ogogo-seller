<template>
  <div class="small-loader"></div>
</template>

<style lang="scss">
@import "../../../app/style/colors.scss";
.small-loader {
  border: 3px solid $gray-200;
  border-radius: 50%;
  border-top-color: $violet-500;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
