<script lang="ts" setup>
import MatchingProfileNavigation from "@/components/matching-profile-view/MatchingProfileNavigation.vue";
import HeadingWrapper from "@/components/matching-profile-view/HeadingWrapper.vue";
import ProfileStat from "@/components/matching-profile-view/ProfileStat.vue";
import ProfileImage from "@/components/icons/ProfileImage.vue";
import ListMedia from "@/components/matching-profile-view/ListMedia.vue";
import MediaSlider from "@/components/matching-profile-view/MediaSlider.vue";
</script>

<template>
  <MatchingProfileNavigation />

  <div class="profile-image-wrapper">
    <ProfileImage/>
    <span class="rank">#1</span>
  </div>

  <div class="profile-stats-grid">
    <ProfileStat
        value="1.206 Std. 27 Min."
        label-text="Musik gehört<br>insgesamt"
    />
    <ProfileStat
        value="6 Std. 27 Min."
        label-text="gemeinsam<br>gehörte Zeit"
    />
    <ProfileStat
        value="03.01.2023"
        label-text="Song Erfassung<br>seit dem"
    />
  </div>

  <HeadingWrapper
      heading="Songs die ihr beide feiert:"
      label-text="Alle anzeigen"
      route="/profile"
  ></HeadingWrapper>

  <MediaSlider />

  <HeadingWrapper
      heading="Tobe feiert außerdem:"
      label-text="Alle anzeigen"
      route="/profile"
  ></HeadingWrapper>

  <MediaSlider />

  <HeadingWrapper
      heading="Tobe feiert außerdem:"
      label-text="gehörte Zeit:"
  ></HeadingWrapper>

  <ListMedia v-for="index in 12" />

</template>

<style lang="scss">
@import "@/assets/scss/redesign-theme.scss";
@import "@/assets/scss/matching-profile-view/matching-profile.scss";
</style>
