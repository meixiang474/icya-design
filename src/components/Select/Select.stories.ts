import { ref } from "vue";
import Select from "./index.vue";
import Option from "../Option";

export default {
  title: "Components/Select",
  component: Select,
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
  components: { ISelect: Select, IOption: Option },
  setup() {
    const value = ref<string[]>([]);
    return {
      args,
      value,
    };
  },
  template: `
  <div :style="{width: '420px'}">
    <i-select v-bind="args" placeholder="来选择">
      <i-option value="1" disabled></i-option>
      <i-option value="2"></i-option>
    </i-select>
  </div>
  `,
});

export const Primary: any = Template.bind({});
