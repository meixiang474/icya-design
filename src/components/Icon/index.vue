<template>
  <svg :class="svgClasses" viewBox="0 0 1024 1024" width="20px" height="20px">
    <path :d="icons[icon]" :style="{ fill: color }"></path>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/runtime-core";
import icons from "../icons";

export default defineComponent({
  name: "i-icon",
  props: {
    icon: {
      type: String as PropType<keyof typeof icons>,
      required: true,
    },
    block: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "black",
    },
  },
  setup(props) {
    const svgClasses = computed(() => {
      const classes = ["icyad-icon"];
      if (props.block) {
        classes.push("is-block");
      }
      return classes;
    });
    return {
      icons,
      svgClasses,
    };
  },
});
</script>
