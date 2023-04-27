<script setup lang="ts">
import router from "@/router";
</script>

<template>
  <div class="content-container">
    <h3 class="description">Die gesuchte Seite wurde leider nicht gefunden.</h3>
    <p class="error-code">Error 404</p>
    <button @click="router.push('/profile')" class="home-button">
      <p>Return to home</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
    </button>
  </div>
</template>

<style lang="scss">
.content-container {
  @include flex-center-xy;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: $secondary-background-color;
  color: $primary-text-color;

  .description {
    width: 24%;
    font-size: 2em;
    text-align: center;
    margin-bottom: 40px;
  }

  .error-code {
    font-size: 1.5em;
    margin-bottom: 40px;
  }
  .home-button {
    display: flex;
    background-color: $secondary-background-color;
    color: $primary-text-color;
    padding: 10px;
    align-items: center;

    p {
      color: $primary-text-color;
      font-size: 1.2em;
      margin-right: 8px;
      text-decoration: none;
    }
    svg {
      fill: #FFF;
      height: 13px;
    }
  }
}

</style>
