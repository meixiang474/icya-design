import Tabs from "./index.vue";
import TabItem from "../TabItem/index.vue";
import Button from "../Button";

export default {
  title: "Components/Tabs",
  component: Tabs,
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
  components: { ITabs: Tabs, ITabItem: TabItem, IButton: Button },
  setup() {
    const handleSelect = (id: number) => {
      console.log("select", id);
    };
    return { args, handleSelect };
  },
  template: `
    <i-tabs mode="card">
      <i-tab-item name="1" label="1"><div>111<span>22</span></div></i-tab-item>
      <i-tab-item name="2" label="2">
        <i-button>111</i-button>
        <template #title="slotProps">
          {{slotProps.label}}-{{slotProps.label}}
          <span>{{2}}</span>
        </template>
      </i-tab-item>
    </i-tabs>
  `,
});

export const Primary: any = Template.bind({});
