<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  provide,
} from "@vue/runtime-core";
import { MENU_CONTEXT } from "../constant";

type MenuMode = "horizontal" | "vertical";

export default defineComponent({
  name: "i-menu",
  props: {
    defaultIndex: {
      type: [String, Number],
      default: 0,
    },
    mode: {
      type: String as PropType<MenuMode>,
      default: "horizontal",
    },
    defaultOpenSubmenus: {
      type: Array as PropType<(string | number)[]>,
      default: () => [],
    },
  },
  emits: ["select"],
  setup(props, ctx) {
    const activeIndex = ref(props.defaultIndex);
    const onSelect = (selectedIndex: string | number) => {
      activeIndex.value = selectedIndex;
      ctx.emit("select", selectedIndex);
    };
    const mode = computed(() => props.mode);
    provide(MENU_CONTEXT, {
      activeIndex,
      onSelect,
      mode,
      defaultOpenSubmenus: props.defaultOpenSubmenus,
    });
    const classes = computed(() => {
      const classes = ["icyad-menu", `icyad-menu-${props.mode}`];
      return classes;
    });
    return {
      classes,
      onSelect,
    };
  },
});
</script>
