<template>
  <div :class="wrapperClasses">
    <div class="icyad-input-group-prepend" v-if="hasPrepend">
      <slot name="prepend"></slot>
    </div>
    <div class="icyad-input-container">
      <div className="icon-wrapper" v-if="icon">
        <i-icon :icon="icon"></i-icon>
      </div>
      <input
        class="icyad-input-inner"
        ref="inputRef"
        :type="type"
        @input="handleInput"
        :value="value == null ? internalValue : value"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
      />
    </div>
    <div class="icyad-input-group-append" v-if="hasAppend">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import icons from "../icons";
import IIcon from "../Icon";

type InputSize = "lg" | "sm" | "md";
type InputType = "password" | "text";

export const inputProps = {
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
  },
  size: {
    type: String as PropType<InputSize>,
    default: "md",
  },
  type: {
    type: String as PropType<InputType>,
    default: "text",
  },
  icon: {
    type: String as PropType<keyof typeof icons>,
  },
  value: String,
};

export default defineComponent({
  name: "i-input",
  props: {
    ...inputProps,
  },
  emits: ["change"],
  components: {
    IIcon,
  },
  setup(props, ctx) {
    const internalValue = ref("");
    const inputRef = ref({} as HTMLInputElement);
    const hasPrepend = computed(() => {
      return ctx.slots.prepend;
    });
    const hasAppend = computed(() => {
      return ctx.slots.append;
    });
    const wrapperClasses = computed(() => {
      const classes = ["icyad-input-wrapper", `icyad-input-${props.size}`];
      if (ctx.slots.prepend) {
        classes.push("icyad-input-prepend");
      }
      if (ctx.slots.append) {
        classes.push("icyad-input-append");
      }
      return classes;
    });
    const handleInput = (e: Event) => {
      ctx.emit("change", (e.target as any).value);
      if (props.value != null) return;
      internalValue.value = (e.target as any).value;
    };
    return {
      internalValue,
      wrapperClasses,
      inputRef,
      handleInput,
      hasPrepend,
      hasAppend,
    };
  },
});
</script>
