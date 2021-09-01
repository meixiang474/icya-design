<template>
  <transition name="fade">
    <div
      :class="`icyad-tag icyad-tag-${size} icyad-tag-${type}`"
      v-if="visible"
    >
      <div class="icyad-tag-content">
        <slot>tag</slot>
      </div>

      <div class="icyad-tag-icon" v-if="closable" @click="handleClose">
        <i-icon icon="closeAlt" :color="colorMap[type]"></i-icon>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import IIcon from "../Icon";

type TagType = "info" | "primary" | "warning" | "danger" | "success";
type TagSize = "lg" | "md" | "sm";

const colorMap = {
  primary: "#0d6efd",
  info: "#adb5bd",
  warning: "#fadb14",
  danger: "#dc3545",
  success: "#52c41a",
};

export default defineComponent({
  name: "i-tag",
  components: {
    IIcon,
  },
  props: {
    size: {
      type: String as PropType<TagSize>,
      default: "md",
    },
    type: {
      type: String as PropType<TagType>,
      default: "primary",
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  setup(props, ctx) {
    const visible = ref(true);

    const handleClose = () => {
      ctx.emit("close");
      visible.value = false;
    };

    return {
      colorMap,
      visible,
      handleClose,
    };
  },
});
</script>
