import IVirtualList from "./index.vue";

export default {
  title: "Components/VirtualList",
  component: IVirtualList,
  argTypes: {
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
        type: {
          summary: "lg|sm|md",
        },
      },
      description: "按钮大小",
      control: {
        type: "radio",
        options: ["lg", "sm", "md"],
      },
    },
    btnType: {
      table: {
        category: "props",
        type: {
          summary: "primary|default|warning|success|danger|link",
        },
      },
      description: "按钮类型",
      control: {
        type: "radio",
        options: ["primary", "default", "danger", "warning", "success", "link"],
      },
    },
    href: {
      table: {
        category: "props",
        type: {
          summary: "string",
        },
      },
      description: "link类型button的地址(可选)",
    },
    loading: {
      table: {
        category: "props",
        type: {
          summary: "boolean",
        },
      },
      description: "是否为loading状态",
    },
    round: {
      table: {
        category: "props",
        type: {
          summary: "boolean",
        },
      },
      description: "是否圆角",
    },
    icon: {
      table: {
        category: "props",
        type: {
          summary: "string",
        },
      },
      description: "图标名称，参考Icon组件",
      control: {
        type: "text",
      },
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "自定义按钮内容",
    },
    "icon(slot)": {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "自定义图标",
    },
  },
};

const Template = (args: any) => ({
  components: { IVirtualList },
  setup() {
    return { args };
  },
  template: `
    <div :style="{height: '500px'}">
      <i-virtual-list v-bind="args">
        <template v-slot="slotProps">
          <div :style="{height: slotProps.item.id % 2 ? '100px' : '200px'}" :style="{backgroundColor: slotProps.item.id % 2 ? 'red' : 'green'}">
            {{slotProps.item.id}}
          </div>
        </template>
      </i-virtual-list>
    </div>
  `,
});

export const Knobs: any = Template.bind({});

Knobs.args = {
  size: 150,
  remain: 5,
  items: new Array(500).fill(null).map((item, index) => ({ id: index + "" })),
  variable: true,
};
