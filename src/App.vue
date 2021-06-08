<template>
  <i-alert title="标题" content="这是内容" @close="handleClose"></i-alert>
  <i-menu mode="vertical">
    <i-menu-item :index="0">menu0</i-menu-item>
    <i-menu-item :index="1">menu1</i-menu-item>
    <i-menu-item :index="2" disabled>menu2</i-menu-item>
    <i-sub-menu :index="3" title="menu3">
      <i-menu-item index="3-1">menu3-1</i-menu-item>
      <i-menu-item index="3-2">menu3-2</i-menu-item>
    </i-sub-menu>
  </i-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IMessage, IAlert, IMenu, ISubMenu, IMenuItem } from "./components";

export default defineComponent({
  name: "App",
  components: {
    IAlert,
    IMenu,
    ISubMenu,
    IMenuItem,
  },
  setup() {
    const handleClose = () => {
      IMessage.success("close事件触发成功");
    };
    return {
      handleClose,
    };
  },
});
</script>
