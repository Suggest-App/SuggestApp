<script setup lang="ts">
import {computed } from 'vue'
import type { ComputedRef } from 'vue'
import {useMatchesStore} from "@/stores/MatchesStore";
import { MatchTab } from "@/models/enums/MatchTab";

const matchesStore = useMatchesStore()

const isRecommendedMediaTab: ComputedRef<boolean> = computed(() => matchesStore.activeMatchTab === MatchTab.RECOMMENDED_TAB)
const isTogetherConsumedMediaTab: ComputedRef<boolean> = computed(() => matchesStore.activeMatchTab === MatchTab.TogetherConsumedMedia)

</script>

<template>
<div class="matches-tab-container">
  <div
      class="matches-tab-btn"
      :class="{ active : isRecommendedMediaTab }"
      @click="matchesStore.activeMatchTab = MatchTab.RECOMMENDED_TAB"
  > {{ $t('recommendedMediaView.newSongButton') }}</div>
  <div
      class="matches-tab-btn"
      :class="{ active : isTogetherConsumedMediaTab }"
      @click="matchesStore.activeMatchTab = MatchTab.TogetherConsumedMedia"
  >{{ $t('recommendedMediaView.togetherConsumedBtn') }}</div>
</div>
</template>



<style scoped lang="scss">
.matches-tab-container {
  width: 100%;
  max-width: 570px;
  height: 52px;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c1c1c;
  margin-bottom: 15px;
  margin-top: 15px;

  .matches-tab-btn {
    flex: 1;
    height: 100%;
    background-color: #1c1c1c;
    color: $primary-text-color;
    text-align: center;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .matches-tab-btn.active {
    background-color: #282828;
  }
}

@media only screen and (min-width: 991px) {
  .matches-tab-container {
    margin-top: 25px;
  }
}
</style>

