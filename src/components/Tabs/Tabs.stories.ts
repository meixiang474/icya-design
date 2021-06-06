import Tabs from "./index.vue";
import TabItem from "../TabItem/index.vue";

export default {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    // props
    defaultName: {
      table: {
        category: "props",
      },
      description: "默认激活的选项卡",
    },
    activeName: {
      table: {
        category: "props",
      },
      description: "受控模式",
    },
    mode: {
      table: {
        category: "props",
        type: {
          summary: "card|line",
        },
      },
      control: {
        type: "radio",
        options: ["card", "line"],
      },
    },
    change: {
      table: {
        category: "events",
        type: {
          summary: "(name: string | number) => any",
        },
      },
      description: "切换选项卡时触发",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "TabItem",
        },
      },
      description: "选项卡",
    },
  },
};

const Template = (args: any) => ({
  components: { ITabs: Tabs, ITabItem: TabItem },
  setup() {
    return { args };
  },
  template: `
    <i-tabs v-bind="args">
      <i-tab-item name="tab1" label="tab1">tab1 content</i-tab-item>
      <i-tab-item name="tab2" label="tab2" class="tab-item">
        tab2 content
      </i-tab-item>
    </i-tabs>
  `,
});

export const Knobs: any = Template.bind({});

Knobs.parameters = {
  docs: {
    source: {
      code: `
<i-tabs>
  <i-tab-item name="tab1" label="tab1">tab1 content</i-tab-item>
  <i-tab-item name="tab2" label="tab2">tab2 content</i-tab-item>
</i-tabs>
      `,
    },
  },
};
