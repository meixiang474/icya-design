<template>
  <a v-if="btnType === 'link' && href" :href="href" :class="classes">
    <slot>link</slot>
  </a>
  <button v-else :class="classes" :disabled="disabled">
    <slot>button</slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/runtime-core";

type ButtonSize = "lg" | "sm" | "md";
type ButtonType = "primary" | "default" | "danger" | "link";

export default defineComponent({
  name: "i-button",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ButtonSize>,
      default: "md",
    },
    btnType: {
      type: String as PropType<ButtonType>,
      default: "default",
    },
    href: String,
  },
  setup(props) {
    // button classes
    const classes = computed(() => {
      const classes = [
        "icyad-btn",
        `icyad-btn-${props.btnType}`,
        `icyad-btn-${props.size}`,
      ];

      // 为链接并且disabled为true时添加 disabled类名
      if (props.disabled && props.btnType === "link") {
        classes.push("disabled");
      }
      return classes;
    });
    return {
      classes,
    };
  },
});
</script>
