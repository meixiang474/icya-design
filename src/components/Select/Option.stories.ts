import Option from "../Option";

export default {
  title: "Components/Select/Option",
  component: Option,
  argTypes: {
    // props
    value: {
      table: {
        category: "props",
        type: {
          summary: "string",
        },
      },
      type: {
        required: true,
      },
      description: "选项值",
    },
    label: {
      table: {
        category: "props",
        type: {
          summary: "string",
        },
      },
      description: "选项标签",
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
      description: "选项是否禁用",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: `slotProps: {
            label: string | undefined; 
            value: string;
          }`,
        },
      },
      description: "自定义选项",
    },
  },
};

export const Docs = (args: any) => ({
  setup() {
    return { args };
  },
});
