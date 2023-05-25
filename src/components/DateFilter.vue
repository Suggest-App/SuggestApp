<script lang="ts" setup>
import {useProfileStore} from "@/stores/ProfileStore";

const profileStore = useProfileStore()

function filterDate(date: string) {
  profileStore.listFilterDate = date
  profileStore.updateMediaSummary()
}
</script>

<template>
  <div class="base-wrapper date-filter">
    <div class="filter" :class="{ active : profileStore.listFilterDate === ''}" @click="filterDate('')">Max</div>
    <div class="filter" :class="{ active : profileStore.listFilterDate === '1Y'}" @click="filterDate('1Y')">1J</div>
    <div class="filter" :class="{ active : profileStore.listFilterDate === '1M'}" @click="filterDate('1M')">1M</div>
    <div class="filter" :class="{ active : profileStore.listFilterDate === '1W'}" @click="filterDate('1W')">1W</div>
  </div>
</template>

<style lang="scss">
.base-wrapper.date-filter {
  display: flex;
  justify-content: space-between;
  max-width: 390px;
  margin: 0 0 35px;

  .filter {
    width: 70px;
    @include flex-center-xy;
    padding: 5px;
    color: $secondary-text-color;
    font-weight: 500;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  .filter.active {
    color: $primary-text-color;
    background-color: $secondary-background-color;
  }
}
</style>