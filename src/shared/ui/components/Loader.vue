<template>
  <div class="loader-container">
    <img src="@/shared/ui/assets/loader.gif" class="loader" />
  </div>
</template>

<!-- TODO: set scoped for this component -->
<style lang="scss">
@import "../../../app/style/colors.scss";

// TODO: set bacground by class
.loader-container {
  position: fixed;
  z-index: 999;
  background: rgba($white, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
  }
}

// TODO: extract spin animation to ui kit utility class
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
