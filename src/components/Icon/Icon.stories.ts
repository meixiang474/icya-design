import Icon from "./index.vue";
import icons from "../icons";
import "./Icon.stories.scss";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    // props
    icon: {
      table: {
        category: "props",
      },
      description: "图标名称，详见下表",
    },
    block: {
      table: {
        category: "props",
        defaultValue: {
          summary: false,
        },
      },
      description: "是否是block",
    },
    color: {
      table: {
        category: "props",
        defaultValue: {
          summary: "black",
        },
      },
      description: "图标颜色",
      control: {
        type: "color",
      },
    },
    spin: {
      table: {
        category: "props",
        defaultValue: {
          summary: false,
        },
      },
      description: "是否旋转",
    },
  },
};

const Template = (args: any) => ({
  components: { IIcon: Icon },
  setup() {
    return { args };
  },
  template: `<i-icon v-bind="args"></i-icon>`,
});

export const Knobs: any = Template.bind({});
Knobs.args = {
  icon: "watch",
};

Knobs.parameters = {
  docs: {
    source: {
      code: `
        <i-icon icon="watch"></i-icon>
      `,
    },
  },
};

export const AllIcons = (args: any) => ({
  components: { IIcon: Icon },
  setup() {
    return { args, icons };
  },
  template: `
  <ul class="icon-story-ul">
    <li v-for="(value, key) in icons" :key="key" class="icon-story-li">
      <i-icon :icon="key"></i-icon>
      <div class="icon-story-div">{{key}}</div>
    </li>
  </ul>`,
});
