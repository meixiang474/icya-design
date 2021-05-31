<template>
  <slot></slot>
  <slot name="title" :label="label ? label : name">
    {{ label ? label : name }}
  </slot>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "i-tab-item",
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
