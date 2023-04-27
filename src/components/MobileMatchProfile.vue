<script lang="ts" setup>
import router from "@/router";
import ProfileImageWrapper from "@/components/ProfileImageWrapper.vue";
import ProfileInfoGrid from "@/components/ProfileInfoGrid.vue";
import ProfileInfoColumn from "@/components/ProfileInfoColumn.vue";
import ProfileTopNavigation from "@/components/ProfileTopNavigation.vue";
import GoBackIcon from "@/components/icons/GoBackIcon.vue";
import {useI18n} from "vue-i18n";
import {useMainStore} from "@/stores/MainStore";
import type { PropType } from "vue";
import { UserMatch } from "@/classes/UserMatch";

// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore()

defineProps({
  match: {
    type: Object as PropType<UserMatch>
  }
})
</script>

<template>
  <ProfileTopNavigation :has-loading-anim="true">
    <template #left>
      <GoBackIcon @click="router.push({ name: 'matches'})" />
    </template>
    <template #middle>
      <h2>{{ $t('matchingProfileView.introduction') }} {{ match.getUsername() }}</h2>
    </template>
  </ProfileTopNavigation>

  <ProfileImageWrapper
      :image-src="match.getProfileImgSrc()"
      :has-loading-anim="true"
  >
    <template #rank>
      <span class="rank">{{ match.getRank() }}</span>
    </template>
  </ProfileImageWrapper>

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
</template>
