<script setup lang="ts">
const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="no-matches-container">
    <div class="icon-box"></div>
    <h3>{{ heading }}</h3>
    <p>{{ text }}</p>
  </div>
</template>

<style lang="scss">
.no-matches-container {
  @include flex-center-all;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;
  height: calc(100vh - 120px);

  .icon-box {
    @include bc-attr;
    @include flex-center-all;
    width: 45px;
    height: 45px;
    background-color: $secondary-background-color;
    border-radius: $primary-border-radius;
    background-image: url("data:image/svg+xml,%3Csvg fill='%23696969' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M504.1 471l-134-134C399.1 301.5 415.1 256.8 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c48.79 0 93.55-16.91 129-45.04l134 134C475.7 509.7 481.9 512 488 512s12.28-2.344 16.97-7.031C514.3 495.6 514.3 480.4 504.1 471zM48 208c0-88.22 71.78-160 160-160s160 71.78 160 160s-71.78 160-160 160S48 296.2 48 208z'/%3E%3C/svg%3E%0A");
    background-size: 24px;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 22px;
    color: #818181;
  }

  p {
    max-width: 340px;
    color: #696969;
    text-align: center;
    line-height: 1.6;
  }
}
</style>
