<script setup lang="ts">
import SuggestLogo from "@/components/icons/SuggestLogo.vue";
import SpotifyAuthButton from "@/components/auth-view/SpotifyAuthButton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from 'swiper';

// define your modules list here
const modules = [Pagination, Autoplay]

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
</script>

<template>
  <section id="auth-view">
    <div class="image-container">
      <!-- import must be this way because of static PWA import -->
      <img src="@/../public/images/auth-view-background.png" alt="Suggest Background Image" />
    </div>
    <form action="/signin" method="post" class="auth-form">
      <SuggestLogo />
      <swiper
          :slides-per-view="1"
          :modules="modules"
          :loop="true"
          :pagination="{
            clickable: true,
          }"
          :autoplay="{
            delay: 3500,
            disableOnInteraction: false,
          }"
      >
        <swiper-slide>
          <h1>Suggest</h1>
          <p>Find new stunning music you don’t know,
            based on the taste of users that are
            the same as you.</p>
        </swiper-slide>
        <swiper-slide>
          <h1>Suggest</h1>
          <p>Find new stunning music you don’t know,
            based on the taste of users that are
            the same as you.</p>
        </swiper-slide>
        <swiper-slide>
          <h1>Suggest</h1>
          <p>Find new stunning music you don’t know,
            based on the taste of users that are
            the same as you.</p>
        </swiper-slide>
      </swiper>
      <SpotifyAuthButton />
    </form>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/auth-view/auth-view.scss";
</style>
