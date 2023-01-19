<script setup lang="ts">
import type { ComputedRef, PropType } from "vue";
import type { MediaSummary } from "@/models/MediaSummary";
import { ref, computed } from "vue";
import { useI18n } from 'vue-i18n'
import { secondsToMinutes } from "@/composables/TimeCalculations";
import Swal from "sweetalert2";

const { t } = useI18n()

const props = defineProps({
  media: {
    type: Object as PropType<MediaSummary>,
    required: true,
  },
  index: {
    type: Number,
    required: true
  }
})

// The component that is getting rendered in the swal popup
const mediaComponent = ref(null);

function openSongInSpotify(): void {
  Swal.fire({
    showCancelButton: true,
    // @ts-ignore
    html: (mediaComponent.value) ? mediaComponent.value.outerHTML  : '',
    confirmButtonText: t('media.swalPopup.openInSpotify'),
    cancelButtonText: t('media.swalPopup.cancelBtn'),
    iconColor: '#FA8231',
    background: '#121212',
    color: '#FFFFFF',
    buttonsStyling: true,
    customClass: 'swal-media-container',
    confirmButtonColor: '#3bd23b',
    cancelButtonColor: '#1d1d1d'
  }).then((result) => {
    if (result.isConfirmed) {
      window.open(props.media.linkToMedia)
    }
  })
}

/************************** Template Variables **************************/

// Access index prop and increment it, in order to use it as rank
const rank: ComputedRef<number> = computed((): number => {
  return props.index + 1
})

// Access song title prop
const songTitle: ComputedRef<string> = computed((): string => {
  return (props.media && props.media.songTitle)
      ? props.media.songTitle
      : t('media.placeholders.noTitle')
})

// Access username prop
const artists: ComputedRef<string> = computed((): string => {
  return (props.media && props.media.allArtists)
      ? props.media.allArtists.join().replace(',', ', ')
      : t('media.placeholders.noArtists')
})

// Flag that indicates if title is explicit
const isExplicit: ComputedRef<boolean> = computed((): boolean => {
  return props.media && props.media.explicitFlag
})

// Access album image prop
const albumImage = computed(() => {
  return (props.media && props.media.albumImages)
      ? props.media.albumImages[0].imageUrl
      : t('media.placeholders.noImage')
})


const minutes: ComputedRef<string> = computed((): string => {
  return (props.media.listenedSeconds)
      ? secondsToMinutes(props.media.listenedSeconds)
      : t('media.placeholders.noMinutes')
})
</script>

<template>
  <div class="media-container" ref="mediaComponent" @click="openSongInSpotify">
    <div class="rank">{{ rank }}</div>
      <img
          class="media-cover"
          :src="albumImage"
          alt="album cover"
      />
    <div class="media-information">
      <p class="media-title">{{ songTitle }}</p>
      <div class="additional-media-info">
        <div v-if="isExplicit" class="explicit">E</div>
        <p class="artists">{{ artists }}</p>
      </div>
    </div>
    <span class="listened-minutes">{{ minutes }} {{ $t('media.listenedMinutes') }}</span>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/media.scss";
</style>
