<template>
  <div class="icyad-auto-complete" ref="componentRef">
    <i-input
      :value="value == null ? internalValue : value"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      :size="size"
      :icon="icon"
      @change="handleChange"
      @keydown="handleKeyDown"
      ref="inputRef"
    ></i-input>
    <transition name="open">
      <ul
        class="icyad-suggestion-list"
        v-if="suggestions.length > 0 || loading"
      >
        <div v-if="loading" class="suggestions-loading-icon">
          <i-icon icon="loading" spin color="#bbb"></i-icon>
        </div>
        <template v-if="suggestions.length > 0 && !loading">
          <li
            v-for="(item, index) in suggestions"
            :key="index"
            @click="handleSelect(item)"
            class="suggestion-item"
            :class="{ 'is-active': index === highlightIndex }"
          >
            <slot :suggestion="item" :index="index">
              {{ item }}
            </slot>
          </li>
        </template>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@vue/runtime-core";
import Input, { inputProps } from "../Input/index.vue";
import Icon from "../Icon";
import { debounce } from "../utils";
import { KEYBOARD } from "../constant";
import { useClickOutside } from "../hooks";

export default defineComponent({
  name: "i-auto-complete",
  components: {
    IInput: Input,
    IIcon: Icon,
  },
  props: {
    ...inputProps,
    fetchSuggestions: {
      type: Function as PropType<(str: string) => any[] | Promise<any[]>>,
    },
  },
  emits: ["select", "change"],
  setup(props, ctx) {
    const inputRef = ref();
    const componentRef = ref({} as HTMLDivElement);
    const internalValue = ref("");
    const suggestions = ref<any[]>([]);
    const loading = ref(false);
    const highlightIndex = ref(-1);

    useClickOutside(componentRef, () => {
      suggestions.value = [];
    });

    const fetchSuggestions = debounce((val: string) => {
      if (!val) {
        loading.value = false;
        suggestions.value = [];
        return;
      }
      if (props.fetchSuggestions) {
        const results = props.fetchSuggestions(val);
        if (results instanceof Promise) {
          loading.value = true;
          results.then((res) => {
            if (
              (props.value == null ? internalValue.value : props.value) === ""
            ) {
              suggestions.value = [];
            } else {
              suggestions.value = res;
            }
            loading.value = false;
          });
        } else {
          suggestions.value = results;
        }
      }
    });

    const handleChange = (val: string) => {
      highlightIndex.value = -1;
      ctx.emit("change", val);
      if (props.value == null) {
        internalValue.value = val;
      }
      fetchSuggestions(val);
    };

    const handleSelect = (val: any) => {
      ctx.emit("select", val);
      if (props.value == null) {
        internalValue.value = val;
      }
      highlightIndex.value = -1;
      suggestions.value = [];
    };

    const highlight = (index: number) => {
      if (index < 0) index = 0;
      if (index >= suggestions.value.length) {
        index = suggestions.value.length - 1;
      }
      highlightIndex.value = index;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEYBOARD.ENTER:
          if (suggestions.value[highlightIndex.value]) {
            handleSelect(suggestions.value[highlightIndex.value]);
          }
          break;
        case KEYBOARD.UP:
          highlight(highlightIndex.value - 1);
          break;
        case KEYBOARD.DOWN:
          highlight(highlightIndex.value + 1);
          break;
        case KEYBOARD.ESC:
          suggestions.value = [];
          break;
        default:
          break;
      }
    };

    return {
      inputRef,
      internalValue,
      handleChange,
      suggestions,
      handleSelect,
      loading,
      handleKeyDown,
      highlightIndex,
      componentRef,
    };
  },
});
</script>
