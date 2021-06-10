<template>
  <div
    class="icyad-virtual-list-viewport"
    ref="viewportRef"
    @scroll="handleScroll"
  >
    <div class="scroll-bar" ref="scrollBarRef"></div>
    <div
      class="scroll-list"
      :style="{ transform: `translate3d(0, ${offset}px, 0)` }"
      ref="listRef"
    >
      <div v-for="item in visibleData" :vid="item.id" :key="item.id">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUpdated,
  PropType,
  ref,
} from "@vue/runtime-core";
import { throttle } from "lodash-es";
import { ItemProps } from "./types";

export default defineComponent({
  name: "IVirtualList",
  props: {
    size: {
      type: Number,
      required: true,
    },
    remain: {
      type: Number,
      required: true,
    },
    items: {
      type: Array as PropType<ItemProps[]>,
      default: () => [],
    },
    variable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const viewportRef = ref({} as HTMLDivElement);
    const scrollBarRef = ref({} as HTMLDivElement);
    const listRef = ref({} as HTMLDivElement);

    const start = ref(0);
    const end = ref(props.remain);
    const offset = ref(0);
    const positions = ref<{ top: number; height: number; bottom: number }[]>(
      []
    );
    const prevCount = computed(() => {
      return Math.min(start.value, props.remain);
    });
    const nextCount = computed(() => {
      return Math.min(props.remain, props.items.length - end.value);
    });

    const visibleData = computed(() => {
      const finalStart = start.value - prevCount.value;
      const finalEnd = end.value + nextCount.value;
      return props.items.slice(finalStart, finalEnd);
    });
    const getStartIndex = (value: number) => {
      let l = 0;
      let r = positions.value.length;
      while (l < r) {
        const mid = Math.floor(l + (r - l) / 2);
        if (positions.value[mid].bottom >= value) {
          r = mid;
        } else {
          l = mid + 1;
        }
      }
      if (positions.value[l].bottom === value) {
        return l + 1;
      }
      return l;
    };

    const handleScroll = throttle(
      () => {
        const scrollTop = viewportRef.value.scrollTop;
        if (props.variable) {
          start.value = getStartIndex(scrollTop);
          end.value = start.value + props.remain;
          offset.value =
            positions.value[start.value - prevCount.value]?.top || 0;
        } else {
          start.value = Math.floor(scrollTop / props.size);
          end.value = start.value + props.remain;
          // 减去预留的
          offset.value =
            start.value * props.size - props.size * prevCount.value;
        }
      },
      200,
      { leading: false }
    );

    const cacheList = () => {
      positions.value = props.items.map((item, index) => ({
        top: index * props.size,
        height: props.size,
        bottom: (index + 1) * props.size,
      }));
    };

    onMounted(() => {
      viewportRef.value.style.height = props.size * props.remain + "px";
      scrollBarRef.value.style.height = props.items.length * props.size + "px";
      if (props.variable) {
        cacheList();
      }
    });
    onUpdated(() => {
      if (props.variable) {
        nextTick(() => {
          const list = listRef.value;
          const nodes = [...list.children];
          if (!nodes || nodes.length === 0) return;
          nodes.forEach((node) => {
            const { height } = node.getBoundingClientRect();
            const id = node.getAttribute("vid");
            const index = props.items.findIndex((item) => item.id === id);
            const oldHeight = positions.value[index].height;
            // 高度是否有变化
            const val = oldHeight - height;
            if (val) {
              positions.value[index].height = height;
              positions.value[index].bottom =
                positions.value[index].bottom - val;
              for (let i = index + 1; i < positions.value.length; i++) {
                positions.value[i].top = positions.value[i - 1].bottom;
                positions.value[i].bottom = positions.value[i].bottom - val;
              }
            }
          });
          scrollBarRef.value.style.height =
            positions.value[positions.value.length - 1].bottom + "px";
        });
      }
    });
    return {
      viewportRef,
      scrollBarRef,
      visibleData,
      handleScroll,
      offset,
      listRef,
    };
  },
});
</script>
