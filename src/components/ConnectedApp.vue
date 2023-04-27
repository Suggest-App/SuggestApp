<script lang="ts" setup>
import { disconnectUser } from "@/services/TokenService";
import SpotifyIcon from "@/components/icons/SpotifyIcon.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";
</script>

<template>
  <div class="base-wrapper apps">
    <SpotifyIcon />
    <h3>Spotify</h3>
    <div class="connection-info">
      <div class="connect-status">
        <CheckIcon />
        <span>{{ $t('connectedAppsView.connectStatus') }}</span>
      </div>
      <div class="disconnect-link" @click="disconnectUser">
        {{ $t('connectedAppsView.disconnectLink') }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.base-wrapper.apps {
  @include flex-center-y;
  width: calc(100% - (2 * $wrapper-padding-x));
  margin: 0 $wrapper-padding-x;
  column-gap: 16px;
  padding: 25px 0;
  border-bottom: 2px solid #282828;

  svg {
    width: 30px;
    height: 32px;
    fill: #3bd23b;
  }

  h3 {
    flex: 1;
    font-weight: 400;
  }

  .connection-info {
    .connect-status {
      @include flex-center-y;
      column-gap: 8px;
      margin-bottom: 5px;

      span {
        font-size: $font-size-l;
        font-weight: 400;
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }

    .disconnect-link {
      width: calc(100% - 28px);
      margin-left: 28px;
      height: 100%;
      text-decoration: underline;
      color: $secondary-text-color;
      font-size: $font-size-m;
      text-align: center;
      cursor: pointer;
    }
  }
}

@media only screen and (min-width: 768px) {
  .base-wrapper.apps {
    max-width: 500px;
    margin: 0 45px;
    border-bottom: 2px solid #363636;
  }
}
</style>
