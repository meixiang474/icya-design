<template>
  <div class="icyad-select" ref="containerRef">
    <div class="icyad-select-input-container">
      <i-input
        :placeholder="inputPlaceholder"
        :value="inputValue"
        ref="inputRef"
        readonly
        :disabled="disabled"
        @keydown="handleKeyDown"
      ></i-input>
    </div>
    <div
      class="icyad-select-input-mask"
      @click="handleToggle"
      :class="{ 'icyad-is-disabled': disabled }"
    >
      <i-icon
        icon="arrowdown"
        :class="`icyad-arrow-icon ${open ? 'icyad-is-opened' : ''}`"
      ></i-icon>
    </div>
    <transition name="open">
      <ul class="icyad-select-options-container" v-if="open">
        <slot v-if="isEmpty" name="empty">
          <div
            class="options-container-empty"
            :style="{ height: `${containerHeight * 0.3}px` }"
          >
            当前无内容!
          </div>
        </slot>
        <slot v-else></slot>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  provide,
  PropType,
  onMounted,
  onUnmounted,
  nextTick,
} from "@vue/runtime-core";
import { useClickOutside } from "../hooks";
import IInput from "../Input";
import IIcon from "../Icon";
import { SELECT_CONTEXT, SELECT_EVENT } from "../constant";
import { emitter } from "../utils";

export default defineComponent({
  name: "i-select",
  components: {
    IInput,
    IIcon,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: [String, Array] as PropType<string | string[]>,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: [String, Array] as PropType<string | string[]>,
      default: "",
    },
  },
  emits: ["change"],
  setup(props, ctx) {
    const externalValue = computed(() => props.value);
    const multiple = computed(() => props.multiple);
    const internalValue = ref(
      Array.isArray(props.defaultValue) ? "" : props.defaultValue
    );
    const internalValues = ref<string[]>(
      Array.isArray(props.defaultValue) ? props.defaultValue : []
    );
    const containerRef = ref({} as HTMLDivElement);
    const inputRef = ref();
    const open = ref(false);
    const isEmpty = computed(
      () =>
        ctx.slots.default!().filter(
          (item) => item.props != null && (item.props as any).value != null
        ).length === 0
    );
    const containerHeight = computed(() => {
      if (containerRef.value) {
        return containerRef.value.getBoundingClientRect().width;
      }
      return 0;
    });
    const inputValue = computed(() => {
      return multiple.value
        ? ""
        : typeof externalValue.value === "string"
        ? externalValue.value
        : internalValue.value;
    });
    const inputPlaceholder = computed(() => {
      return multiple.value
        ? (externalValue.value == null
            ? internalValues.value
            : externalValue.value
          ).length > 0
          ? ""
          : props.placeholder
        : props.placeholder;
    });

    provide(SELECT_CONTEXT, {
      externalValue,
      internalValue,
      internalValues,
      multiple,
    });

    useClickOutside(containerRef, () => {
      open.value = false;
    });

    const handleToggle = () => {
      if (props.disabled) return;
      inputRef.value.inputRef.focus();
      open.value = !open.value;
    };

    const handleEvent = (val?: string) => {
      if (multiple.value) {
        ctx.emit("change", [
          ...(externalValue.value == null
            ? internalValues.value
            : externalValue.value),
          val,
        ]);
      } else {
        ctx.emit("change", val);
      }
      if (externalValue.value != null) return;
      if (multiple.value) {
        internalValues.value.push(val!);
      } else {
        internalValue.value = val!;
      }
      nextTick(() => {
        open.value = false;
      });
    };

    onMounted(() => {
      emitter.on(SELECT_EVENT, handleEvent);
    });

    onUnmounted(() => {
      emitter.off(SELECT_EVENT, handleEvent);
    });

    const handleKeyDown = () => {
      console.log(1);
    };

    return {
      handleToggle,
      inputRef,
      open,
      containerRef,
      externalValue,
      isEmpty,
      containerHeight,
      internalValue,
      internalValues,
      inputValue,
      inputPlaceholder,
      handleKeyDown,
    };
  },
});
</script>
