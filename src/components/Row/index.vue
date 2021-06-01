<template>
  <component :is="tag" :class="classes" :style="styles">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
} from "@vue/runtime-core";
import { LAYOUT_CONTEXT } from "../constant";

type JustifyType =
  | "start"
  | "end"
  | "center"
  | "space-around"
  | "space-between";

export default defineComponent({
  name: "i-row",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    gutter: {
      type: Number,
      default: 0,
    },
    justify: {
      type: String as PropType<JustifyType>,
      default: "start",
    },
  },
  setup(props) {
    const gutter = computed(() => props.gutter);

    provide(LAYOUT_CONTEXT, { gutter });

    const styles = computed(() => {
      const styles = {
        marginLeft: "0",
        marginRight: "0",
      };
      if (props.gutter) {
        styles.marginLeft = `-${props.gutter / 2}px`;
        styles.marginRight = `-${props.gutter / 2}px`;
      }
      return styles;
    });

    const classes = computed(() => {
      const classes = [
        "icyad-row",
        props.justify !== "start" ? `icyad-row-${props.justify}` : "",
      ];
      return classes;
    });

    return {
      styles,
      classes,
    };
  },
});
</script>
