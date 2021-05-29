<template>
  <slot :label="label" :value="value">
    <li :class="classes" @click="handleClick">
      {{ label == null ? value : label }}
      <i-icon icon="check" color="#0d6efd" v-if="isChecked"></i-icon>
    </li>
  </slot>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "@vue/runtime-core";
import { SELECT_CONTEXT, SELECT_EVENT } from "../constant";
import { SelectContext } from "../types";
import IIcon from "../Icon";
import { emitter } from "../utils";

export default defineComponent({
  name: "i-option",
  components: {
    IIcon,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { internalValue, internalValues, multiple, externalValue } = inject<
      SelectContext
    >(SELECT_CONTEXT)!;

    const isChecked = computed(() => {
      if (multiple.value) {
        if (
          (externalValue.value && externalValue.value.includes(props.value)) ||
          internalValues.value.includes(props.value)
        ) {
          return true;
        }
      } else {
        if (
          externalValue.value === props.value ||
          internalValue.value === props.value
        ) {
          return true;
        }
      }
      return false;
    });

    const classes = computed(() => {
      const classes = ["icyad-select-item"];
      if (props.disabled) {
        classes.push("icyad-is-disabled");
      }
      if (isChecked.value) {
        classes.push("icyad-is-active");
      }
      return classes;
    });

    const handleClick = () => {
      emitter.emit(SELECT_EVENT, props.value);
    };

    return {
      handleClick,
      classes,
      isChecked,
    };
  },
});
</script>
