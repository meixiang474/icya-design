<template>
  <div class="icyad-tabs">
    <ul :class="titleClasses">
      <li
        :class="
          `icyad-tabs-title-item ${
            title.name ===
            (activeName == null ? internalActiveName : activeName)
              ? 'is-active'
              : ''
          } ${title.disabled === '' || title.disabled ? 'disabled' : ''}`
        "
        v-bind="title"
        v-for="title in titles"
        :key="title.name"
        @click="handleClick(title.name)"
      >
        <render-vnode v-if="title.vnode" :v-node="title.vnode"></render-vnode>
        <template v-else>
          {{ title.label ? title.label : title.name }}
        </template>
      </li>
    </ul>
    <div class="icyad-tabs-content">
      <render-vnode
        v-for="(item, index) in activeContents"
        :vNode="item"
        :key="index"
      ></render-vnode>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from "@vue/runtime-core";
import RenderVnode from "../RenderVnode";

type TabsMode = "card" | "line";

export default defineComponent({
  name: "i-tabs",
  components: {
    RenderVnode,
  },
  props: {
    defaultName: {
      type: [String, Number],
    },
    activeName: {
      type: [String, Number],
    },
    mode: {
      type: String as PropType<TabsMode>,
      default: "line",
    },
  },
  emits: ["change"],
  setup(props, ctx) {
    const slots = computed(() => {
      return ctx.slots.default!();
    });
    const titles = computed<{ [key: string]: any }>(() => {
      return slots.value.map((slot) => ({
        ...slot.props,
        vnode: (slot.children as any).title
          ? (slot.children as any).title({
              label: slot.props!.label ? slot.props!.label : slot.props!.name,
            })
          : null,
      }));
    });
    const titleClasses = computed(() => {
      const classes = ["icyad-tabs-title", `icyad-tabs-title-${props.mode}`];
      return classes;
    });
    const internalActiveName = ref<string | number>(
      props.defaultName == null ? slots.value[0].props!.name : props.defaultName
    );
    const activeContents = computed<any[]>(() => {
      const activeSlot = slots.value.find((slot) => {
        return (
          slot.props!.name ===
          (props.activeName == null
            ? internalActiveName.value
            : props.activeName)
        );
      });
      return (activeSlot!.children as any).default();
    });
    const handleClick = (name: string | number) => {
      if (props.activeName) {
        ctx.emit("change", name);
        return;
      }
      internalActiveName.value = name;
    };
    return {
      activeContents,
      titles,
      handleClick,
      titleClasses,
      internalActiveName,
    };
  },
});
</script>
