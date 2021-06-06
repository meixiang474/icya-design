<template>
  <a v-if="btnType === 'link' && href" :href="href" :class="classes">
    <slot>link</slot>
  </a>
  <button v-else :class="classes" :disabled="disabled">
    <slot name="icon">
      <i-icon
        v-if="icon || loading"
        :icon="icon || 'loading'"
        :spin="loading"
      ></i-icon>
    </slot>
    <slot>button</slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/runtime-core";
import IIcon from "../Icon";
import icons from "../icons";

type ButtonSize = "lg" | "sm" | "md";
type ButtonType = "primary" | "default" | 'success' | "warning" | "danger" | "link";

export default defineComponent({
  name: "i-button",
  components: {
    IIcon,
  },
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
    icon: {
      type: String as PropType<keyof typeof icons>,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
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
      if (props.round) {
        classes.push("icyad-is-round");
      }
      return classes;
    });
    return {
      classes,
    };
  },
});
</script>
