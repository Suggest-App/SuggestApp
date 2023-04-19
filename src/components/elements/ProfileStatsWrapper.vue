<template>
  <div class="profile-stats-grid">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.profile-stats-grid {
  width: 100%;
  padding: 25px 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 25px;

  .stats {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .value {
      display: block;
      color: $primary-text-color;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .label {
      display: block;
      color: $secondary-text-color;
      font-size: 10px;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>
