<script lang="ts" setup>
import router from "@/router";
import ProfileTopNavigation from "@/components/ProfileTopNavigation.vue";
import GoBackIcon from "@/components/icons/GoBackIcon.vue";
import { useI18n } from "vue-i18n";
import type { PropType } from "vue";
import { UserMatch } from "@/classes/UserMatch";
import DesktopMatchHeader from "@/components/DesktopMatchHeader.vue";

// Initialize localization plugin and stores
const { t } = useI18n()

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
      <h2>{{ $t('matchingProfileView.goBack') }}</h2>
    </template>
  </ProfileTopNavigation>

  <DesktopMatchHeader :match="match" />
</template>
