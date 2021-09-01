<template>
  <component :is="tag" :class="classes" :style="styles">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { LayoutContext } from "../types";
import { LAYOUT_CONTEXT } from "../constant";

export default defineComponent({
  name: "i-col",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { gutter } = inject<LayoutContext>(LAYOUT_CONTEXT)!;

    const classes = computed(() => {
      const pos = ["span", "offset"] as const;
      const classes = ["icyad-col"];
      pos.forEach((item) => {
        const size = props[item];
        if (typeof size === "number" && size > 0) {
          classes.push(`icyad-col-${item}-${size}`);
        }
      });
      return classes;
    });

    const styles = computed(() => {
      if (gutter.value !== 0) {
        return {
          paddingLeft: gutter.value / 2 + "px",
          paddingRight: gutter.value / 2 + "px",
        };
      }
      return {};
    });

    return {
      classes,
      styles,
    };
  },
});
</script>
