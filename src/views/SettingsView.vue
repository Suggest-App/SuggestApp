<script setup lang="ts">
import ArrowLeftIcon from "@/components/icons/controls/ArrowLeftIcon.vue";
import BaseSelect from "@/components/inputs/BaseSelect.vue";
import { computed } from "vue";
import type { ComputedRef } from "vue";
import { allLocales, createLocaleObject, setLocale } from '@/i18n'
import { useI18n } from 'vue-i18n'
import { useMainStore } from "@/stores/MainStore";

const { t } = useI18n()
const mainStore = useMainStore()

// Get the currency select options
const localeOptions: ComputedRef<string[]> = computed((): string[] => {
      return createLocaleObject(allLocales)
})
</script>

<template>
  <section id="settings-view">
    <header>
      <RouterLink v-if="!mainStore.isDesktop" :to="{ name: 'ProfileView' }">
        <ArrowLeftIcon />
      </RouterLink>

      <h3>{{ $t('settingsView.heading') }}</h3>
    </header>

    <label class="app-locale" for="locale">
      <span>{{ $t('settingsView.localeLable') }}:</span>
      <BaseSelect
          id="locale"
          :options="localeOptions"
          :default-selection="$i18n.locale"
          :modelValue="$i18n.locale"
          @change="setLocale($event.target.value)"
      />
    </label>
  </section>
</template>

<style lang="scss">
@import "@/assets/scss/settings-view/settings-view.scss";
</style>
