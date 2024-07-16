<template>
  <div>
    <div class="loader-container s-bg-white"></div>
    <img src="@/shared/ui/assets/loader.gif" class="loader" />
  </div>
</template>

<style lang="scss" scoped>
.loader-container {
  position: fixed;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.loader {
  width: 200px;
  height: 200px;
  z-index: 99999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
