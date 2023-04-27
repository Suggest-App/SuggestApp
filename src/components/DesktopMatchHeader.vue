<script lang="ts" setup>
import type { PropType } from "vue";
import { UserMatch } from "@/classes/UserMatch";
import UserImage from "@/components/UserImage.vue";
import {useI18n} from "vue-i18n";
import {useMainStore} from "@/stores/MainStore";
import ProfileInfoGrid from "@/components/ProfileInfoGrid.vue";
import ProfileInfoColumn from "@/components/ProfileInfoColumn.vue";

// Initialize localization plugin and stores
const { t } = useI18n()

defineProps({
  match: {
    type: Object as PropType<UserMatch>
  }
})
</script>

<template>
  <header class="base-wrapper match-header">
    <UserImage :image-src="match.getProfileImgSrc()" />

    <div class="match-info">
      <span class="rank" v-if="match.getRank() !== 0">{{ $t('matchingProfileView.rank') }} #{{ match.getRank() }}</span>
      <h2>{{ match.getUsername() }}</h2>
    </div>

    <ProfileInfoGrid>
      <template #columns>
        <ProfileInfoColumn
            :label-text="$t('profileInfo.totalListenedTime')"
            :value="match.getTotalListenedTime()"
            :has-loading-anim="true"
        />
        <ProfileInfoColumn
            :label-text="$t('profileInfo.togetherListenedTime')"
            :value="match.getTogetherListenedTime()"
            :has-loading-anim="true"
        />
        <ProfileInfoColumn
            :label-text="$t('profileInfo.songTrackingSince')"
            :value="match.getTrackingSince()"
            :has-loading-anim="true"
        />
      </template>
    </ProfileInfoGrid>
  </header>
</template>

<style lang="scss">
.base-wrapper.match-header {
  @include flex-center-y;
  flex-wrap: wrap;
  max-width: unset;
  column-gap: 25px;
  row-gap: 45px;
  margin-bottom: 70px;

  .profile-image {
    width: 140px;
    height: 140px;
  }

  .match-info {

    .rank {
      color: $secondary-text-color;
      margin-bottom: 8px;
      font-size: $font-size-l;
    }

    h2 {
      font-size: 42px;
    }
  }

  .base-wrapper.info-grid {
    margin-bottom: 0;
  }
}
</style>
