<script lang="ts" setup>
import {computed, ref } from "vue";
import type { PropType,ComputedRef,Ref } from "vue";
import type { Media } from "@/models/Media";
import { useI18n } from "vue-i18n";
import { secondsToTime } from "@/composables/MediaInformationFormatting";
import { useMainStore } from "@/stores/MainStore";
import ListMediaElementInfo from "@/components/media/list/ListMediaElementInfo.vue";
import type {ProfileMedia} from "@/models/ProfileMedia";
import type {TogetherMedia} from "@/models/TogetherMedia";


// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore()

const props = defineProps({
  slide: {
    type: Object as PropType<ProfileMedia | TogetherMedia>,
    default: {} as Media
  }
})

/** --------------------- Template Properties --------------------- */

const slide:ComputedRef<Media> = computed(
    () => props.slide
)

// Access media image url
const mediaImageSrc: ComputedRef<string> = computed(() =>{
  if (slide.value.albumImages) {
    return slide.value.albumImages[1].imageUrl
  }
  return ''
})

// Access song title
const linkToMedia: ComputedRef<string> = computed(() => {
  if (slide.value.linkToMedia) {
    return slide.value.linkToMedia
  }
  return ''
})

// Access username
const artists: ComputedRef<string> = computed(() => {
  if (slide.value.allArtists) {
    return slide.value.allArtists.join().replace(',', ', ')
  }
  return ''
})

const isHovered: Ref<boolean> = ref(false)
</script>

<template>
  <div class="media-slide"
       :class="{ active: isHovered}"
       @mouseenter="isHovered = true"
       @mouseleave="isHovered = false"
  >
    <div class="album-wrapper" @click="window.open(linkToMedia)">
      <a :href="slide.linkToMedia">
        <img
            v-show="!mainStore.isLoading"
            class="media-image"
            v-lazy="mediaImageSrc"
            :alt="slide.songTitle"
        />
        <div
            v-show="mainStore.isLoading"
            class="media-image"
        ></div>
      </a>
      <div
          class="vinyl-plate"
          v-show="!mainStore.isLoading"
          @click="window.open(slide.linkToMedia)"
      >
        <img v-lazy="mediaImageSrc" :alt="slide.songTitle"/>
      </div>
    </div>

    <div class="media-information">
      <span class="title">{{ slide.songTitle }}</span>
      <span class="artist">{{ artists }}</span>
    </div>

    <div class="tracking-information">
      <slot name="tracking-information"></slot>
    </div>
  </div>
</template>
