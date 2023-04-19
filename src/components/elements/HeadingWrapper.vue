<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { computed } from "vue";

// Props from parent component
const props = defineProps({
  heading: {
    type: String,
    required: true
  },
  route: {
    type: String,
    default: ''
  },
  labelText: {
    type: String,
    default: ''
  }
})

// Render router link if route is defined along with label text
const showLink = computed(() =>
    props.route !== '' && props.labelText !== ''
)

// Render none clickable label if route is not defined but label text is
const showLabel = computed(() =>
    props.route === '' && props.labelText !== ''
)
</script>

<template>
  <div class="heading-wrapper">
    <h3>{{ heading }}</h3>

    <RouterLink
        v-if="showLink"
        :to="route"
    >{{ labelText }}</RouterLink>

    <p v-if="showLabel">{{ labelText }}</p>
  </div>
</template>

<style lang="scss">
.heading-wrapper {
  width: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;

  a {
    color: $secondary-text-color;
    font-size: 12px;
    font-weight: 500;
    text-decoration: underline;
    line-height: 1.8;
    text-align: center;
  }

  p {
    color: $secondary-text-color;
    font-size: 12px;
    line-height: 1.8;
    font-weight: 500;
    margin: 0;
    text-align: center;
  }
}
</style>
