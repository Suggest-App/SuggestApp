<template>
  <div class="skeleton-heading sk-anim"></div>

  <div
      v-for="index in 14"
      :key="index"
      class="skeleton-profile-container"
  >
    <div class="skeleton-rank sk-anim"></div>
    <div class="skeleton-profile-image sk-anim"></div>
    <div class="skeleton-profile-information">
      <div class="skeleton-profile-name sk-anim"></div>
      <div class="skeleton-listened-minutes sk-anim"></div>
    </div>
  </div>
</template>

<style lang="scss">
.skeleton-heading {
  width: 205px;
  height: 18px;
  margin-bottom: 30px;
}

.skeleton-profile-container {
  @include flex-align-center;
  width: 100%;
  height: 62px;
  column-gap: 15px;
  margin-bottom: 20px;

  .skeleton-rank {
    width: 8px;
    height: 10px;
  }

  .skeleton-profile-image {
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: $round-border-radius;
  }

  .skeleton-profile-information {
    flex: 1;

    .skeleton-profile-name {
      width: 115px;
      height: 15px;
      margin-bottom: 6px;
    }

    .skeleton-listened-minutes {
      width: 198px;
      height: 14px;
    }
  }
}
</style>
