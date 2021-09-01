<template>
  <li :class="classes" @click="handleClick">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import { MENU_CONTEXT } from "../constant";
import { MenuContext } from "../types";

export default defineComponent({
  name: "i-menu-item",
  props: {
    index: {
      type: [String, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { activeIndex, onSelect } = inject<MenuContext>(MENU_CONTEXT)!;

    const classes = computed(() => {
      const classes = ["icyad-menu-item"];
      if (props.disabled) {
        classes.push("icyad-menu-item-disabled");
      }
      if (activeIndex.value === props.index) {
        classes.push("icyad-menu-item-active");
      }
      return classes;
    });

    const handleClick = () => {
      if (!props.disabled) {
        onSelect(props.index);
      }
    };

    return {
      classes,
      handleClick,
    };
  },
});
</script>
