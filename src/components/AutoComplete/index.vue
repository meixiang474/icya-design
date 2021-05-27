<template>
  <div class="icyad-auto-complete">
    <i-input
      :value="value == null ? internalValue : value"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      :size="size"
      :icon="icon"
      @change="handleChange"
      ref="inputRef"
    ></i-input>
    <ul v-if="suggestions.length > 0">
      <li
        v-for="(item, index) in suggestions"
        :key="index"
        @click="handleSelect(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@vue/runtime-core";
import Input, { inputProps } from "../Input/index.vue";

export default defineComponent({
  name: "i-auto-complete",
  components: {
    IInput: Input,
  },
  props: {
    ...inputProps,
    fetchSuggestions: {
      type: Function as PropType<(str: string) => string[] | Promise<string[]>>,
    },
  },
  emits: ["select", "change"],
  setup(props, ctx) {
    const inputRef = ref();
    const internalValue = ref("");
    const suggestions = ref<string[]>([]);

    const handleChange = (val: string) => {
      ctx.emit("change", val);
      if (props.value == null) {
        internalValue.value = val;
      }
      if (!val) {
        suggestions.value = [];
        return;
      }
      if (props.fetchSuggestions) {
        const results = props.fetchSuggestions(val);
        if (results instanceof Promise) {
          results.then((res) => {
            suggestions.value = res;
          });
        } else {
          suggestions.value = results;
        }
      }
      console.log(suggestions.value);
    };

    const handleSelect = (val: string) => {
      ctx.emit("select", val);
      if (props.value == null) {
        internalValue.value = val;
      }
      suggestions.value = [];
    };

    return {
      inputRef,
      internalValue,
      handleChange,
      suggestions,
      handleSelect,
    };
  },
});
</script>
