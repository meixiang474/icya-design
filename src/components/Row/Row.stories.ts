import IRow from "./index.vue";
import ICol from "../Col";

export default {
  title: "Components/Layout",
  component: IRow,
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
  components: { IRow, ICol },
  setup() {
    return { args };
  },
  template: `
    <i-row v-bind="args" :gutter="10">
      <i-col :span="6">test</i-col>
      <i-col :span="6">test</i-col>
      <i-col :span="6">test</i-col>
    </i-row>
  `,
});

export const Primary: any = Template.bind({});
