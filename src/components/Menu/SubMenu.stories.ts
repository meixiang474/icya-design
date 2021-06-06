import SubMenu from "../SubMenu/index.vue";

export default {
  title: "Components/Menu/SubMenu",
  component: SubMenu,
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
    title: {
      table: {
        category: "props",
        type: {
          summary: "string|number",
        },
      },
      description: "子菜单标题",
      type: {
        required: true,
      },
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "MenuItem|SubMenu",
        },
      },
      description: "子菜单项",
    },
  },
};

export const docs = (args: any) => ({
  setup() {
    return { args };
  },
});
