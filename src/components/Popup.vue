<script setup lang="ts">
import CloseIcon from "@/components/icons/controls/CloseIcon.vue";
import {usePopupStore} from "@/stores/PopupStore";


const popupStore = usePopupStore()

</script>
<template>
  <div v-if="popupStore.popUp.popupIsOpen" class="popup-underlay">
    <div class="popup-container">
      <CloseIcon  @click="popupStore.popUp.popupIsOpen = false" />
      <h3>{{ popupStore.popUp.popupHeading }}</h3>
      <p>{{ popupStore.popUp.popupText }}</p>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/popup.scss";
</style>