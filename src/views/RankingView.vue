<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import RankingCard from "@/components/ranking-view/RankingCard.vue";
import userData from "@/data/user-data.json";
import ProfileSection from "@/components/profile-view/ProfileSection.vue";
import ArrowBack from "@/components/icons/controls/ArrowBack.vue";

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

    <ProfileSection v-if="showProfileModal">
      <template #heading>
        <h2>Top 5 Song die du noch nicht kennst</h2>
      </template>
       <template #header>
         <h3 class="profile-name">Benutzername</h3>
         <div class="shared-minutes">12.682 gemeinsame Minuten gehört</div>
       </template>
      <template #controls>
        <ArrowBack @click="closeProfile" />
      </template>
     </ProfileSection>

     <Navbar />
   </section>
 </template>

 <style lang="scss">
 @import "@/assets/scss/ranking-view/ranking-view.scss";
 </style>
