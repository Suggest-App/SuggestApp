<script lang="ts" setup>
import ArchiveIcon from "@/components/icons/ArchiveIcon.vue";
import {useProfileStore} from "@/stores/ProfileStore";

const profileStore = useProfileStore()
</script>

<template>
  <RouterLink :to="{ name : 'archive' }" class="archive-btn">
    <ArchiveIcon />
    <span class="hidden-count">{{ profileStore.hiddenMediaCount }}</span>
    <span>{{ $t('archiveBtnText') }}</span>
  </RouterLink>
</template>

<style lang="scss">
.archive-btn {
  position: relative;
  width: calc(100% - 30px);
  margin-left: 15px;
  height: 45px;
  margin-bottom: 28px;
  margin-top: -8px;
  background-color: #202020;
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding-left: 25px;
  cursor: pointer;
  border-radius: 4px;

  svg {
    width: 18px;
    height: 18px;
    margin-top: -4px;
    fill: #FFFFFF;
  }

  .hidden-count {
    position: absolute;
    bottom: 7px;
    left: 35px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #FA8231;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
    line-height: 14px;
  }
}
</style>