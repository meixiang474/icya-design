import Icon from "./index.vue";
import icons from "../icons";
import "./Icon.stories.scss";

export default {
  title: "Components/Icon",
  component: Icon,
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
  components: { IIcon: Icon },
  setup() {
    return { args };
  },
  template: `<i-icon v-bind="args" ></i-icon>`,
});

export const Primary: any = Template.bind({});
Primary.args = {
  icon: "watch",
};

export const Label = () => ({
  components: { IIcon: Icon },
  setup() {
    return { icons };
  },
  template: `<ul class="icon-story-ul">
    <li v-for="(value, key) in icons" :key="key" class="icon-story-li">
      <i-icon :icon="key"></i-icon>
      <div class="icon-story-div">{{key}}</div>
    </li>
  </ul>`,
});
