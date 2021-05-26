import Input from "./index.vue";
import Icon from "../Icon/index.vue";

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
  },
};

const Template = (args: any) => ({
  components: { IInput: Input, IIcon: Icon },
  setup() {
    return { args };
  },
  template: `<div :style="{width: '420px'}">
  <i-input v-bind="args" >
    <template #prepend>
      111
    </template>
    <template #append>
      111
    </template>
  </i-input>
  </div>`,
});

export const Primary: any = Template.bind({});
