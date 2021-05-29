import Input from "./index.vue";
import Icon from "../Icon/index.vue";
import { ref } from "vue";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    // props
    disabled: {
      table: {
        category: "props",
      },
      control: {
        type: "boolean",
      },
      description: "是否禁用按钮",
    },
    size: {
      table: {
        category: "props",
      },
      description: "按钮大小 'lg' | 'sm' | 'md'",
      control: {
        type: "radio",
        options: ["lg", "sm", "md"],
      },
    },
    placeholder: {
      table: {
        category: "props",
      },
      control: {
        type: "text",
      },
    },
  },
};

const Template = (args: any) => ({
  components: { IInput: Input, IIcon: Icon },
  setup() {
    const inputRef = ref();
    const handleClick = () => {
      console.log(inputRef.value.inputRef);
      inputRef.value.inputRef.focus();
    };
    return { args, handleClick, inputRef };
  },
  template: `<div :style="{width: '420px'}">
  <i-input v-bind="args" ref="inputRef">
    <template #prepend>
      111
    </template>
    <template #append>
      111
    </template>
  </i-input>
  <button @click="handleClick">focus</button>
  </div>`,
});

export const Primary: any = Template.bind({});
