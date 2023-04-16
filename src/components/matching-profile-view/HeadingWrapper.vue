<script lang="ts" setup>
import { RouterLink } from "vue-router";
import {computed} from "vue";

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
