<script setup lang="ts">
import { computed } from "vue";
import { allLocales, createLocaleObject, setLocale } from "@/i18n";
import router from "@/router";
import type { ComputedRef } from "vue";
import ProfileTopNavigation from "@/components/ProfileTopNavigation.vue";
import GoBackIcon from "@/components/icons/GoBackIcon.vue";
import BaseSelect from "@/components/BaseSelect.vue";

// Get the currency select options
const localeOptions: ComputedRef<string[]> = computed((): string[] => {
  return createLocaleObject(allLocales)
})
</script>

<template>
  <main>
    <ProfileTopNavigation>
      <template #left>
        <GoBackIcon @click="router.push({ name: 'profile'})" />
      </template>
      <template #middle>
        <h2>{{ $t('settingsView.heading') }}</h2>
      </template>
    </ProfileTopNavigation>

    <BaseSelect
        :label="$t('settingsView.localeLable')"
        :options="localeOptions"
        :default-selection="$i18n.locale"
        :modelValue="$i18n.locale"
        @change="setLocale($event.target.value)"
    />
  </main>
</template>

<style lang="scss">
@media only screen and (min-width: 991px) {
  .base-wrapper.nav-grid {
    margin-bottom: 78px;
  }
}
</style>
