<template>
  <div class="skeleton-heading sk-anim"></div>
  <div class="skeleton-subheading sk-anim"></div>

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

<style lang="scss" scoped>
.skeleton-heading {
  width: 205px;
  height: 20px;
  margin-bottom: 30px;
}

.skeleton-profile-container {
  display: flex;
  align-items: center;
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
    border-radius: 50%;
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

@media only screen and (min-width: 768px) {
  .skeleton-heading {
    width: 225px;
    height: 22px;
    margin-bottom: 12px;
  }

  .skeleton-subheading {
    width: 100%;
    max-width: 500px;
    height: 36px;
    margin-bottom: 35px;
  }
}
</style>
