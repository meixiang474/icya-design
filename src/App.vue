<template>
  <i-alert title="标题" content="这是内容" @close="handleClose"></i-alert>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IMessage, IAlert } from "./components";

export default defineComponent({
  name: "App",
  components: {
    IAlert,
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
