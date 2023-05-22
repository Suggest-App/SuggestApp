<script lang="ts" setup>
import type {PropType, ComputedRef, Ref} from "vue";
import type { Media } from "@/models/Media";
import {computed, onMounted, ref} from "vue";
import { secondsToTime } from "@/composables/MediaInformationFormatting";
import { useI18n } from "vue-i18n";
import { useMainStore } from "@/stores/MainStore";
import MediaImage from "@/components/media/list/MediaListImage.vue";
import ListMediaElementInfo from "@/components/media/list/ListMediaElementInfo.vue";
import {useProfileStore} from "@/stores/ProfileStore";
import MediaService from "@/services/MediaService";
import {useRoute} from "vue-router";

// Initialize localization plugin and stores
const { t } = useI18n()
const mainStore = useMainStore()
const profileStore = useProfileStore()
const route = useRoute();

const props =  defineProps({
  media: {
    type: Object as PropType<Media>,
    default: {} as Media
  },
  index: {
    type: Number,
    default: 0
  }
})

/************************** Template Variables **************************/

// Access song title prop
const songTitle: ComputedRef<string> = computed(() => {
  return (props.media && props.media.songTitle)
      ? props.media.songTitle
      : 'song title unknown'
})

// Access artist prop
const artists: ComputedRef<string> = computed(() => {
  return (props.media && props.media.allArtists)
      ? props.media.allArtists.join().replace(',', ', ')
      : 'artist unknown'
})

// Flag that indicates if title is explicit
const isExplicit: ComputedRef<boolean> = computed(() => {
  return props.media && props.media.explicitFlag
})

// Access media image url
const mediaImage: ComputedRef<string> = computed(() => {
  return (props.media && props.media.albumImages)
      ? props.media.albumImages[0].imageUrl
      : ''
})

const showMedia: Ref<boolean> = ref(true)
const isArchive: Ref<boolean> = ref(route.name === 'archive')

// Check if media select flag is active, if so don't redirect and instead call hide or restore endpoint
function clickMedia(event: Event, mediaId: string) {
  if (profileStore.selectMediaFlag || isArchive.value) {
    event.preventDefault();

    if (isArchive.value) {
      MediaService.restoreClickedMedia(mediaId);

      // Ensure that the media is getting removed from the store array
      if (profileStore.profile) {
        let hiddenMedia = profileStore.profile.getHiddenMedia();
        let filteredMediaIndex = hiddenMedia.findIndex(media => media.mediumId === mediaId);



        // Remove the specific media item using splice
        if (filteredMediaIndex > -1) {
          hiddenMedia.splice(filteredMediaIndex, 0);
          console.log(filteredMediaIndex);
          console.log(hiddenMedia);
        } else if (filteredMediaIndex === 0) {
          hiddenMedia = []
        }

        profileStore.profile.setHiddenMedia(hiddenMedia);
      }

      profileStore.hiddenMediaCount--;
    } else {
      MediaService.hideClickedMedia(mediaId);
      profileStore.hiddenMediaCount++;
    }

    showMedia.value = false;
  }
}


</script>

<template>
  <a
      v-show="showMedia"
      class="media-element-wrapper"
      :class="{ 'sk-anim': mainStore.isLoading }"
      :href="props.media.linkToMedia"
      @click="clickMedia($event, props.media.mediumId)"
  >
    <span v-show="!profileStore.selectMediaFlag && !isArchive" class="rank">{{ index + 1 }}</span>
    <span
        v-show="!mainStore.isLoading && (profileStore.selectMediaFlag || isArchive)"
        class="archive-action"
        :class="(isArchive) ? 'restore' : 'hide'"
    >
      {{ (isArchive) ? '+' : '-' }}
    </span>
    <MediaImage :src="mediaImage" />
    <ListMediaElementInfo
      :song-title="songTitle"
      :artists="artists"
      :is-explicit="isExplicit"
    />
    <slot name="right"></slot>
  </a>

</template>

<style lang="scss">
.media-element-wrapper {
  @include flex-center-y;
  column-gap: 12px;
  margin-bottom: 15px;

  .rank {
    @include flex-center-xy;
    width: 20px;
    font-size: $font-size-s;
  }

  .archive-action {
    width: 20px;
    height: 20px;
    pointer-events: none;
    border-radius: 50%;
    color: #FFFFFF;
    font-weight: 600;
    text-align: center;
    line-height: 16px;
  }

  .archive-action.hide {
    background-color: #ff4d4d;
  }

  .archive-action.restore {
    background-color: #43bb83;
  }

  .time {
    color: $secondary-text-color;
    font-size: $font-size-s;
  }
}
</style>
