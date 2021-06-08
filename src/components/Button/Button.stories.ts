import Button from "./index.vue";
import IButtonGroup from "../ButtonGroup";

export default {
  title: "Components/Button",
  component: Button,
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
  components: { IButton: Button },
  setup() {
    return { args };
  },
  template: '<i-button v-bind="args"></i-button>',
});

export const Knobs: any = Template.bind({});

Knobs.parameters = {
  docs: {
    source: {
      code: `
        <i-button>button</i-button>
      `,
    },
  },
};

export const ButtonGroup = (args: any) => ({
  components: { IButton: Button, IButtonGroup },
  setup() {
    return { args };
  },
  template: `
    <i-button-group>
      <i-button v-bind="args" btnType="primary">left</i-button>
      <i-button v-bind="args" btnType="primary">center</i-button>
      <i-button v-bind="args" btnType="primary">right</i-button>
    </i-button-group>
  `,
});

ButtonGroup.parameters = {
  docs: {
    source: {
      code: `
<i-button-group>
  <i-button btnType="primary">left</i-button>
  <i-button btnType="primary">center</i-button>
  <i-button btnType="primary">right</i-button>
</i-button-group>
      `,
    },
  },
};
