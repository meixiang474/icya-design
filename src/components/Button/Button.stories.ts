import Button from "./index.vue";
import ButtonGroup from "../ButtonGroup";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    // slots
    default: {
      table: {
        category: "slots",
      },
      description: "自定义按钮内容插槽",
      control: {
        type: null,
      },
      default: "button ｜ link",
    },
    // props
    disabled: {
      table: {
        category: "props",
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
    btnType: {
      table: {
        category: "props",
      },
      description: "按钮类型 'primary' | 'default' | 'danger' | 'link'",
      control: {
        type: "radio",
        options: ["primary", "default", "danger", "link"],
      },
    },
    href: {
      description: "可选",
    },
  },
};

const Template = (args: any) => ({
  components: { IButton: Button },
  setup() {
    const handleClick = () => {
      alert("click");
    };
    return { args, handleClick };
  },
  template:
    '<i-button v-bind="args" @click="handleClick" icon="loading" loading ></i-button>',
});

export const Primary: any = Template.bind({});
export const Large: any = Template.bind({});
Large.args = {
  size: "lg",
};

export const 按钮组 = (args: any) => ({
  components: { IButton: Button, IButtonGroup: ButtonGroup },
  setup() {
    return { args };
  },
  template: `
    <i-button-group>
      <i-button v-bind="args">111</i-button>
      <i-button v-bind="args"/>
      <i-button v-bind="args"/>
    </i-button-group>
  `,
});
