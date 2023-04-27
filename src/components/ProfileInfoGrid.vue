<template>
  <div class="base-wrapper info-grid">
    <slot name="columns"></slot>
  </div>
</template>

<style lang="scss">
.base-wrapper.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

@media only screen and (min-width: 768px) {
  #matching-profile-view .base-wrapper.info-grid:not(#matching-profile-view .base-wrapper.match-header .base-wrapper.info-grid) {
    max-width: 500px;
    margin: 0 auto 60px;
  }
}
</style>
