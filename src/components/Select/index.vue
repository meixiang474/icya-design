<template>
  <div class="icyad-select">
    <div class="icyad-select-input-container">
      <i-input ref="inputRef" readonly></i-input>
    </div>
    <div class="icyad-select-input-mask" @click="handleToggle"></div>
    <transition>
      <ul class="icyad-select-options-container" v-if="open">
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/runtime-core";
import IInput from "../Input";

export default defineComponent({
  name: "i-select",
  components: {
    IInput,
  },
  setup(props, ctx) {
    const inputRef = ref();
    const open = ref(false);

    const handleToggle = () => {
      inputRef.value.inputRef.focus();
      open.value = !open.value;
    };

    return {
      handleToggle,
      inputRef,
      open,
    };
  },
});
</script>
