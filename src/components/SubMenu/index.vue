<template>
  <li :class="classes" v-on="mode === 'horizontal' ? events : {}">
    <div class="icyad-submenu-title" v-on="mode === 'vertical' ? events : {}">
      {{ title }}
      <i-icon
        icon="arrowdown"
        :class="`icyad-arrow-icon ${menuOpen ? 'icyad-is-opened' : ''}`"
      ></i-icon>
    </div>
    <transition name="open">
      <ul v-show="menuOpen" :class="`icyad-submenu`">
        <slot> </slot>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onUnmounted, ref } from "vue";
import { MENU_CONTEXT } from "../constant";
import { MenuContext } from "../types";
import Icon from "../Icon";

export default defineComponent({
  name: "i-sub-menu",
  components: {
    IIcon: Icon,
  },
  props: {
    index: {
      type: [String, Number],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { activeIndex, mode, defaultOpenSubmenus } = inject<MenuContext>(
      MENU_CONTEXT
    )!;
    const timer = ref(0);
    const isOpened =
      mode.value === "vertical"
        ? defaultOpenSubmenus.includes(props.index)
        : false;
    const menuOpen = ref(isOpened);
    const classes = computed(() => {
      const classes = ["icyad-menu-item icyad-submenu-item"];
      if (activeIndex.value === props.index) {
        classes.push("icyad-menu-item-active icyad-submenu-item-active");
      }
      return classes;
    });

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      const current = !menuOpen.value;
      menuOpen.value = current;
    };

    const handleMouse = (e: MouseEvent, toggle: boolean) => {
      clearTimeout(timer.value);
      e.preventDefault();
      timer.value = setTimeout(() => {
        menuOpen.value = toggle;
      }, 300);
    };

    onUnmounted(() => {
      clearTimeout(timer.value);
    });

    const events = computed(() => {
      const events: { [key: string]: any } = {};
      if (mode.value === "vertical") {
        events.click = handleClick;
      } else {
        events.mouseenter = (e: MouseEvent) => {
          handleMouse(e, true);
        };
        events.mouseleave = (e: MouseEvent) => {
          handleMouse(e, false);
        };
      }
      return events;
    });

    return {
      classes,
      menuOpen,
      events,
      mode,
      handleMouse,
    };
  },
});
</script>
