import MenuItem from "../MenuItem/index.vue";

export default {
  title: "Components/Menu/MenuItem",
  component: MenuItem,
  argTypes: {
    // props
    index: {
      table: {
        category: "props",
        type: {
          summary: "string|number",
        },
      },
      description: "菜单项索引",
      type: {
        required: true,
      },
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
      description: "菜单项是否禁用",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "菜单项标题",
    },
  },
};

export const docs = (args: any) => ({
  setup() {
    return { args };
  },
});
