<template>
  <transition
    name="message"
    @before-leave="handleClose"
    @after-leave="handleDestroy"
  >
    <div v-show="visible" :class="classes" :style="styles">
      <i-icon
        class="icyad-message-icon"
        :icon="iconMap[type]"
        :color="iconColorMap[type]"
        width="14px"
        height="14px"
      ></i-icon>
      <span>
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref,
} from "@vue/runtime-core";
import { MessageType } from "./types";
import IIcon from "../Icon";
import icons from "../icons";

const iconMap: Record<MessageType, keyof typeof icons> = {
  warning: "alert",
  error: "close",
  success: "check",
  info: "info",
};

const iconColorMap: Record<MessageType, string> = {
  warning: "white",
  error: "white",
  success: "white",
  info: "#6c757d",
};

export default defineComponent({
  name: "i-message",
  components: {
    IIcon,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<MessageType>,
      default: "success",
    },
    duration: {
      type: Number,
      default: 2000,
    },
    onClose: {
      type: Function as PropType<(id: string) => any>,
    },
    offset: {
      type: Number,
      default: 20,
    },
  },
  setup(props, ctx) {
    const offset = ref(props.offset);
    const visible = ref(false);
    const timer = ref(0);
    const styles = computed(() => {
      return {
        top: `${offset.value}px`,
      };
    });
    const classes = computed(() => {
      const classes = ["icyad-message", `icyad-message-${props.type}`];
      return classes;
    });

    onMounted(() => {
      visible.value = true;
      timer.value = setTimeout(() => {
        visible.value = false;
      }, props.duration);
    });
    onUnmounted(() => {
      clearTimeout(timer.value);
    });

    const handleDestroy = () => {
      ctx.emit("destroy");
    };

    const handleClose = () => {
      props.onClose?.(props.id);
    };

    return {
      styles,
      visible,
      classes,
      handleDestroy,
      handleClose,
      iconMap,
      iconColorMap,
    };
  },
});
</script>
