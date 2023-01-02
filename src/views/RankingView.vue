<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import RankingCard from "@/components/ranking-view/RankingCard.vue";
import userData from "@/data/user-data.json";
import ArrowBack from "@/components/icons/controls/ArrowBackIcon.vue";

const showProfileModal: Ref<boolean> = ref(false)
const openProfile = () => { showProfileModal.value = true }
const closeProfile = () => { showProfileModal.value = false }
</script>

<template>
  <section id="ranking-view">
    <RankingCard
        v-for="user in userData"
        :key="user.uuid"
        :user="user"
        @click="openProfile"
    />

     <Navbar />
   </section>
 </template>

 <style lang="scss">
 @import "@/assets/scss/ranking-view/ranking-view.scss";
 </style>
