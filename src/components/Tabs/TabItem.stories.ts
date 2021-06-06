import TabItem from "../TabItem";

export default {
  title: "Components/Tabs/TabItem",
  component: TabItem,
  argTypes: {
    // props
    name: {
      table: {
        category: "props",
        type: {
          summary: "string|number",
        },
      },
      type: {
        required: true,
      },
      description: "选项卡name",
    },
    label: {
      table: {
        category: "props",
        type: {
          summary: "string",
        },
      },
      description: "选项卡label",
    },
    disabled: {
      table: {
        category: "props",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
      description: "选项卡是否禁用",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "选项卡内容",
    },
    title: {
      table: {
        category: "slots",
        type: {
          summary: "slotProps: { label: string | number }",
        },
      },
      description: "自定义选项卡标题",
    },
  },
};

export const Docs = (args: any) => ({
  setup() {
    return { args };
  },
});
