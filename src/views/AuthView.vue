<script setup lang="ts">
import SpotifyAuthButton from "@/components/auth-view/SpotifyAuthButton.vue";
</script>

<template>
  <section id="auth-view">
    <form action="/signin" method="post" class="container">
      <h1>CONNECT WITH SPOTIFY</h1>
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p>
      <SpotifyAuthButton />
    </form>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/auth-view/auth-view.scss";
</style>
