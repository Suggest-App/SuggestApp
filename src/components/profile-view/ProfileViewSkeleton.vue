<script setup lang="ts">
import { useMainStore } from "@/stores/MainStore";

const mainStore = useMainStore()
</script>

<template>
  <div v-if="!mainStore.isDesktop" class="skeleton-header">
    <div class="skeleton-profile-image sk-anim"></div>
    <div class="skeleton-profile-info">
      <div class="skeleton-username sk-anim"></div>
      <div class="skeleton-tracking-since sk-anim"></div>
    </div>
  </div>

  <div v-if="!mainStore.isDesktop" class="skeleton-connect-apps-btn sk-anim"></div>

  <div class="skeleton-profile-heading sk-anim"></div>

  <div
      v-for="index in 12"
      :key="index"
      class="skeleton-media-container"
  >
    <div class="skeleton-rank sk-anim"></div>
    <div class="skeleton-media-cover sk-anim"></div>
    <div class="skeleton-media-information">
      <div class="skeleton-media-title sk-anim"></div>
      <div class="skeleton-artists sk-anim"></div>
    </div>
  </div>
</template>

<style lang="scss">
.skeleton-header {
  @include flex-align-center;
  column-gap: 18px;
  margin-bottom: 15px;
  padding: 22px 0;

  .skeleton-profile-image {
    width: 64px;
    height: 64px;
    border-radius: $round-border-radius;
  }

  .skeleton-profile-info {
    flex: 1;

    .skeleton-username {
      width: 120px;
      height: 20px;
      margin-bottom: 4px;
    }

    .skeleton-tracking-since {
      width: 185px;
      height: 15px;
    }
  }
}

.skeleton-connect-apps-btn {
  width: 100%;
  height: 50px;
  border-radius: $primary-border-radius;
  margin-bottom: 32px;
}

.skeleton-profile-heading {
  width: 210px;
  height: 32px;
  margin-bottom: 32px;
}

.skeleton-media-container {
  @include flex-align-center;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  column-gap: 15px;

  .skeleton-rank {
    width: 8px;
    height: 10px;
  }

  .skeleton-media-cover {
    height: 100%;
    aspect-ratio: 1 / 1;
  }

  .skeleton-media-information {
    flex: 1;

    .skeleton-media-title {
      width: 195px;
      height: 18px;
      margin-bottom: 5px;
    }

    .skeleton-artists {
      width: 140px;
      height: 15px;
    }
  }
}

@media only screen and (min-width: 412px) {
  .skeleton-header {
    .skeleton-profile-image {
      width: 70px;
      height: 70px;
    }

    .skeleton-profile-info {
      .skeleton-username {
        width: 130px;
      }

      .skeleton-tracking-since {
        height: 18px;
      }
    }
  }

  .skeleton-connect-apps-btn {
    height: 52px;
  }

  .skeleton-media-container {
    height: 60px;

    .skeleton-rank {
      height: 18px
    }

    .skeleton-media-information {

      .skeleton-media-title {
        width: 205px;
        height: 20px;
      }

      .skeleton-artists {
        width: 160px;
        height: 17px;
      }
    }
  }
}
</style>
