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
    <template v-if="multiple">
      <div
        v-for="(item, index) in inputValues"
        :key="item"
        class="icyad-select-tag"
      >
        <i-tag @close="handleClose(index)" closable>{{ item }}</i-tag>
      </div>
    </template>
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
import ITag from "../Tag";
import { SELECT_CONTEXT, SELECT_EVENT, KEYBOARD } from "../constant";
import { emitter, exchangeValueToLabel } from "../utils";

export default defineComponent({
  name: "i-select",
  components: {
    IInput,
    IIcon,
    ITag,
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
    const internalLabel = computed(() => {
      return exchangeValueToLabel(
        typeof externalValue.value === "string"
          ? externalValue.value
          : internalValue.value,
        ctx
      ) as string;
    });
    const internalValues = ref<string[]>(
      Array.isArray(props.defaultValue) ? props.defaultValue : []
    );
    const internalLabels = computed(() => {
      return exchangeValueToLabel(
        Array.isArray(externalValue.value)
          ? externalValue.value
          : internalValues.value,
        ctx
      ) as string[];
    });
    const containerRef = ref({} as HTMLDivElement);
    const inputRef = ref();
    const open = ref(false);
    const isEmpty = computed(
      () =>
        ctx.slots.default == null ||
        ctx.slots
          .default()
          .filter(
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
      return multiple.value ? "" : internalLabel.value;
    });
    const inputPlaceholder = computed(() => {
      return multiple.value
        ? (!Array.isArray(externalValue.value)
            ? internalValues.value
            : externalValue.value
          ).length > 0
          ? ""
          : props.placeholder
        : props.placeholder;
    });
    const inputValues = computed(() => {
      return multiple.value ? internalLabels.value : [];
    });

    const activeIndex = ref(-1);
    const availableValues = computed(() => {
      return ctx.slots.default!()
        .filter(
          (item) =>
            item.props &&
            item.props.value &&
            (item.props.disabled == null || item.props.disabled === false)
        )
        .map((item) => item.props!.value);
    });

    provide(SELECT_CONTEXT, {
      externalValue,
      internalValue,
      internalValues,
      multiple,
      activeIndex,
      availableValues,
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
        let values = [
          ...(Array.isArray(externalValue.value)
            ? externalValue.value
            : internalValues.value),
        ];
        if (values.includes(val!)) {
          values = values.filter((item) => item !== val);
        } else {
          values.push(val!);
        }
        ctx.emit("change", val);
      } else {
        ctx.emit("change", val);
      }
      if (
        Array.isArray(externalValue.value) ||
        typeof externalValue.value === "string"
      ) {
        nextTick(() => {
          open.value = false;
        });
        return;
      }
      if (multiple.value) {
        if (internalValues.value.includes(val!)) {
          internalValues.value = internalValues.value.filter(
            (item) => item !== val
          );
        } else {
          internalValues.value.push(val!);
        }
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

    const highlight = (index: number) => {
      if (index < 0) {
        activeIndex.value = 0;
        return;
      }
      if (index >= availableValues.value.length) {
        activeIndex.value = availableValues.value.length - 1;
        return;
      }
      activeIndex.value = index;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (!open.value) return;
      switch (e.key) {
        case KEYBOARD.ENTER:
          if (availableValues.value[activeIndex.value]) {
            handleEvent(availableValues.value[activeIndex.value]);
          }
          break;
        case KEYBOARD.UP:
          highlight(activeIndex.value - 1);
          break;
        case KEYBOARD.DOWN:
          highlight(activeIndex.value + 1);
          break;
        case KEYBOARD.ESC:
          open.value = false;
          break;
        default:
          break;
      }
    };

    const handleClose = (index: number) => {
      let values = [
        ...(Array.isArray(externalValue.value)
          ? externalValue.value
          : internalValues.value),
      ];
      values.splice(index, 1);
      ctx.emit("change", values);
      if (Array.isArray(externalValue.value)) return;
      internalValues.value.splice(index, 1);
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
      inputValues,
      handleClose,
    };
  },
});
</script>
