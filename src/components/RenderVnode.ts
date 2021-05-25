import { defineComponent } from "@vue/runtime-core";

const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [Object, String],
      required: true,
    },
  },
  render() {
    return this.vNode;
  },
});

export default RenderVnode;
