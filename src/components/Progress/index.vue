<template>
  <div
    class="icyad-progress"
    :style="{ backgroundColor: base, width: `${width}px` }"
  >
    <div
      class="icyad-progress-content"
      :style="{ backgroundColor: primary, width: `${count}%` }"
    ></div>
    <div class="icyad-progress-text">{{ text || `${count}%` }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "i-progress",
  props: {
    count: {
      type: Number,
      default: 30,
    },
    width: {
      type: Number,
      default: 500,
    },
    text: String,
    primary: {
      type: String,
      default: "#1890ff",
    },
    base: {
      type: String,
      default: "#f5f5f5",
    },
  },
});
</script>
