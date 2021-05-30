<template>
  <slot :label="label" :value="value">
    <li :class="classes" @click="handleClick">
      {{ finalLabel }}
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
    const {
      internalValue,
      internalValues,
      multiple,
      externalValue,
      availableValues,
      activeIndex,
    } = inject<SelectContext>(SELECT_CONTEXT)!;

    const finalLabel = computed(() => {
      return props.label == null ? props.value : props.label;
    });

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

    const isActive = computed(() => {
      return availableValues.value[activeIndex.value] === props.value;
    });

    const classes = computed(() => {
      const classes = ["icyad-select-item"];
      if (props.disabled) {
        classes.push("icyad-is-disabled");
      }
      if (isActive.value) {
        classes.push("icyad-is-active");
      }
      if (isChecked.value) {
        classes.push("icyad-is-checked");
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
      finalLabel,
    };
  },
});
</script>
