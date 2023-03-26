<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import {useMatchesStore} from "@/stores/MatchesStore";
import { MatchTab } from "@/models/enums/MatchTab";

const matchesStore = useMatchesStore()

const isRecommendedMediaTab: Ref<boolean> = ref(matchesStore.activeMatchTab === MatchTab.RECOMMENDED_TAB)
const isTogetherConsumedMediaTab: Ref<boolean> = ref(matchesStore.activeMatchTab === MatchTab.TogetherConsumedMedia)

</script>

<template>
<div class="matches-tab-container">
  <div
      class="matches-tab-btn"
      :style="{ active : isRecommendedMediaTab }"
      @click="matchesStore.activeMatchTab = MatchTab.RECOMMENDED_TAB"
  >Recommended Media</div>
  <div
      class="matches-tab-btn"
      :style="{ active : isTogetherConsumedMediaTab }"
      @click="matchesStore.activeMatchTab = MatchTab.TogetherConsumedMedia"
  >Together Consumed</div>
</div>
</template>



<style scoped lang="scss">
.matches-tab-container {
  width: 100%;
  height: 45px;
  border-radius: 5px;
  padding: 10px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $secondary-background-color;
  margin-bottom: 15px;

  .matches-tab-btn {
    flex: 1;
    height: 100%;
    background-color: $secondary-background-color;
    color: $primary-text-color;
  }

  .matches-tab-btn.active {
    background-color: #2c2c2c;
  }
}


</style>
