<script lang="ts" setup>
import type { ComputedRef, Ref } from "vue";
import { computed, ref } from "vue";
import SelectArrowIcon from "@/components/icons/SelectArrowIcon.vue";

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    required: true,
  },
  defaultSelection: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
})

// Bool that indicates, if the select is open or not
const selectIsOpen: Ref<boolean> = ref(false)

// Render default value if model value is null
const selectedValue: ComputedRef<string> = computed(() => {
  return props.modelValue ? props.modelValue : props.defaultSelection
})

// Rotate the select arrow on click or blur event
function setSelectArrow(action: string) {
  switch (action) {
    case 'open':
      selectIsOpen.value = !selectIsOpen.value
      break
    case 'blur':
      selectIsOpen.value = false
      break
  }
}
</script>

<template>
  <div class="base-wrapper">
    <label class="label">
      <span>{{ label }}</span>
      <select
          :value="selectedValue"
          v-bind="{
        ...$attrs,
        onClick: () => setSelectArrow('open'),
        onBlur: () => setSelectArrow('blur'),
        onChange: ($event) => {
          $emit('update:modelValue', $event.target.value)
        },
      }"
      >
        <option
            v-for="option in options"
            :value="option.value"
            :key="option.value"
            :selected="option.value === modelValue"
        >
          {{ option.text }}
        </option>
      </select>

      <SelectArrowIcon :select-is-open="selectIsOpen" />
    </label>
  </div>
</template>

<style lang="scss">
.base-wrapper {
  .label {
    display: block;
    position: relative;
    width: 100%;

    span {
      display: block;
      font-size: $font-size-m;
      margin-bottom: 6px;
    }
  }
}
</style>
