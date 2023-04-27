<script lang="ts" setup>
import type { PropType } from "vue";
import { UserMatch } from "@/classes/UserMatch";
import { useI18n } from "vue-i18n";
import { useMainStore } from "@/stores/MainStore";
import UserImage from "@/components/UserImage.vue";

// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore()

defineProps({
  match: {
    type: Object as PropType<UserMatch>,
    required: true,
  },
})
</script>

<template>
  <div class="base-wrapper match" :class="{ 'sk-anim': mainStore.isLoading }">
    <span class="rank">{{ match.getRank() }}</span>
    <div class="user-image-wrapper">
      <UserImage :image-src="match.getProfileImgSrc()" />
    </div>
    <span>
      <span class="username">{{ match.getUsername() }}</span>
      <span class="time">{{ match.getTogetherListenedTime() }} {{ $t('headingWrapper.label.listenedTogether') }}</span>
    </span>
  </div>
</template>

<style lang="scss">
.base-wrapper.match {
  @include flex-center-y;
  column-gap: 15px;
  margin-bottom: 20px;
  cursor: pointer;

  .rank {
    @include flex-center-xy;
    width: 20px;
    font-size: $font-size-s;
  }

  .user-image-wrapper,
  .profile-image {
    width: 56px;
    height: 56px;
  }

  .username {
    font-size: $font-size-m;
    margin-bottom: 5px;
  }

  .time {
    color: $secondary-text-color;
    font-size: $font-size-s;
  }
}
</style>
