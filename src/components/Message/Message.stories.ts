import Message from "./message";
import IButton from "../Button";

export default {
  title: "Components/Message",
  component: Message,
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
  components: { IButton },
  setup() {
    const handleClick = () => {
      Message.info("aaa");
    };
    return { args, handleClick };
  },
  template: '<i-button v-bind="args" @click="handleClick" ></i-button>',
});

export const Primary: any = Template.bind({});
