<template>
  <div :class="classes" :style="styles">
    <slot>
      <div class="icyad-alert-title" v-if="title">
        {{ title }}
      </div>
      <div class="icyad-alert-content">
        {{ content }}
      </div>
    </slot>
    <div v-if="closable" class="icyad-alert-close" @click="handleClose">
      关闭
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onUnmounted,
  PropType,
  ref,
} from "@vue/runtime-core";

type AlertType = "success" | "default" | "danger" | "warning";

export default defineComponent({
  name: "i-alert",
  props: {
    closable: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String as PropType<AlertType>,
      default: "default",
    },
    isUnmount: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 0.2,
    },
    title: String,
    content: String,
  },
  emits: ["close"],
  setup(props, ctx) {
    const hide = ref(false);
    const umnount = ref(false);
    const timer = ref(0);
    // Alert classes
    const classes = computed(() => {
      const classes = ["icyad-alert", `icyad-alert-${props.type}`];
      if (umnount.value) {
        classes.push("icyad-alert-unmount");
      }
      return classes;
    });

    // Alert styles
    const styles = computed(() => {
      const styles: { [key: string]: any } = {};
      if (hide.value) {
        styles.animation = `hide ${props.delay}s ease-in-out forwards`;
      }
      return styles;
    });

    const handleClose = () => {
      hide.value = true;
      ctx.emit("close");
      timer.value = setTimeout(() => {
        if (props.isUnmount) {
          umnount.value = true;
        }
      }, props.delay * 1000);
    };

    onUnmounted(() => {
      clearTimeout(timer.value);
    });

    return {
      classes,
      handleClose,
      styles,
    };
  },
});
</script>
