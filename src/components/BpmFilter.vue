<script lang="ts" setup>
import {useMainStore} from "@/stores/MainStore";
import {useProfileStore} from "@/stores/ProfileStore";
import {useMatchesStore} from "@/stores/MatchesStore";
import BaseSelect from "@/components/BaseSelect.vue"
import type {Ref} from "vue";
import {ref} from "vue";

const mainStore = useMainStore()
const profileStore = useProfileStore()
const matchesStore = useMatchesStore()

const props = defineProps({
  view: {
    type: String,
    default: 'matching-profile'
  }
})

const bpmOptions: Ref<string[]> = ref([
    'Acid Techno 135-150',
    'Ambient 80',
    'Blues 120',
    'Chillout 90',
    'Dance / House 120-130',
    'Deep House 120-125',
    'Downtempo 90-120',
    'Drum and Bass 160-180',
    'Drumstep 170-180',
    'Dub 60-90',
    'Dubstep 130-145 (Halftime 70)',
    'Electro 128',
    'Electro House 125-130',
    'Electro Pop 115',
    'Goa Trance 140+',
    'Grave 30',
    'Grime 140',
    'Hardcore 160-200',
    'hard house 145-150',
    'Hardstyle 150',
    'Hip Hop 80–115',
    'House 115–130',
    'Juke 160',
    'Progressive House 125-130',
    'Rock Alternative 120',
    'Tech House 120-130',
    'Techno 120-160',
    'Techno Trance 130-140'
])

function filterBpm(bpm: string) {
  mainStore.listBpmFilter = bpm
  mainStore.updateBpmFilter(props.view, profileStore, matchesStore)
}
</script>

<template>
  <BaseSelect
      :label="$t('matchingProfileView.bpmFilter')"
      :options="bpmOptions"
      :default-selection="bpmOptions[0]"
      :modelValue="$i18n.locale"
      @change="filterBpm($event.target.value)"
  />
</template>

<style lang="scss">
.base-wrapper.bpm-filter {

}
</style>