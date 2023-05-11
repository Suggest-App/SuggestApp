<script setup lang="ts">
import SuggestLogo from "@/components/icons/SuggestLogo.vue";
import SpotifyAuthButton from "@/components/SpotifyAuthButton.vue";
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
      <div class="auth-form-wrapper">
        <SuggestLogo />
        <h1>Suggest</h1>
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
            <p>{{ $t('authView.slider.firstSlide') }}</p>
          </swiper-slide>
          <swiper-slide>
            <p>{{ $t('authView.slider.secondSlide') }}</p>
          </swiper-slide>
          <swiper-slide>
            <p>{{ $t('authView.slider.thirdSlide') }}</p>
          </swiper-slide>
        </swiper>
      </div>
      <SpotifyAuthButton />
    </form>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/auth-view.scss";
</style>
