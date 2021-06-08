import Menu from "./index.vue";
import MenuItem from "../MenuItem/index.vue";
import SubMenu from "../SubMenu/index.vue";

export default {
  title: "Components/Menu",
  component: Menu,
  argTypes: {
    // props
    defaultIndex: {
      table: {
        category: "props",
      },
      description: "默认选中的菜单选项索引",
    },
    mode: {
      table: {
        category: "props",
        type: {
          summary: "horizontal|vertical",
        },
      },
      description: "菜单模式",
      control: {
        type: "radio",
        options: ["horizontal", "vertical"],
      },
    },
    defaultOpenSubmenus: {
      table: {
        category: "props",
        defaultValue: {
          summary: "[]",
        },
      },
      description: "vertical模式下默认展开的菜单的索引",
    },
    // events
    select: {
      table: {
        category: "events",
        type: {
          summary: "(selectedIndex: string | number) => any",
        },
      },
      description: "切换菜单时触发，参数为菜单项索引",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "MenuItem|SubMenu",
        },
      },
      description: "菜单项",
    },
  },
};

const Template = (args: any) => ({
  components: { IMenu: Menu, IMenuItem: MenuItem, ISubMenu: SubMenu },
  setup() {
    return { args };
  },
  template: `<div :style="{height: '250px'}">
  <i-menu v-bind="args">
  <i-menu-item :index="0">menu0</i-menu-item>
  <i-menu-item :index="1">menu1</i-menu-item>
  <i-menu-item :index="2" disabled>menu2</i-menu-item>
  <i-sub-menu :index="3" title="menu3">
    <i-menu-item index="3-1">menu3-1</i-menu-item>
    <i-menu-item index="3-2">menu3-2</i-menu-item>
  </i-sub-menu>
</i-menu>
  </div>`,
});

export const Knobs: any = Template.bind({});
Knobs.args = {
  mode: "vertical",
  defaultOpenSubmenus: [3],
};
Knobs.parameters = {
  docs: {
    source: {
      code: `
<i-menu mode="vertical" :default-open-submenus="[3]">
  <i-menu-item :index="0">menu0</i-menu-item>
  <i-menu-item :index="1">menu1</i-menu-item>
  <i-menu-item :index="2" disabled>menu2</i-menu-item>
  <i-sub-menu :index="3" title="menu3">
    <i-menu-item index="3-1">menu3-1</i-menu-item>
    <i-menu-item index="3-2">menu3-2</i-menu-item>
  </i-sub-menu>
</i-menu>
      `,
    },
  },
};

export const Horizontal = (args: any) => ({
  components: { IMenu: Menu, IMenuItem: MenuItem, ISubMenu: SubMenu },
  setup() {
    return { args };
  },
  template: `
  <div :style="{height: '150px'}">
  <i-menu mode="horizontal">
    <i-menu-item :index="0">menu0</i-menu-item>
    <i-menu-item :index="1">menu1</i-menu-item>
    <i-menu-item :index="2" disabled>menu2</i-menu-item>
    <i-sub-menu :index="3" title="menu3">
      <i-menu-item index="3-1">menu3-1</i-menu-item>
      <i-menu-item index="3-2">menu3-2</i-menu-item>
    </i-sub-menu>
  </i-menu>
  </div>
  `,
});
Horizontal.parameters = {
  docs: {
    source: {
      code: `
<i-menu mode="horizontal">
  <i-menu-item :index="0">menu0</i-menu-item>
  <i-menu-item :index="1">menu1</i-menu-item>
  <i-menu-item :index="2" disabled>menu2i-menu-item>
  <i-sub-menu :index="3" title="menu3">
    <i-menu-item index="3-1">menu3-1</i-menu-item>
    <i-menu-item index="3-2">menu3-2</i-menu-item>
  </i-sub-menu>
</i-menu>       
      `,
    },
  },
};
