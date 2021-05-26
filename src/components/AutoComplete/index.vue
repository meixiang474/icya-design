<template>
  <div>
    <i-input></i-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";
import Input, { inputProps } from "../Input/index.vue";

export default defineComponent({
  name: "i-autocomplete",
  components: {
    IInput: Input,
  },
  props: {
    ...inputProps,
    fetchSuggestions: {
      type: Function as PropType<(str: string) => string[] | Promise<string[]>>,
    },
  },
  emits: ["select", "change"],
});
</script>
