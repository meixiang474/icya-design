import Menu from "./index.vue";
import MenuItem from "../MenuItem/index.vue";
import SubMenu from "../SubMenu/index.vue";

export default {
  title: "Components/Menu",
  component: Menu,
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
  components: { IMenu: Menu, IMenuItem: MenuItem, ISubMenu: SubMenu },
  setup() {
    const handleSelect = (id: number) => {
      console.log("select", id);
    };
    return { args, handleSelect };
  },
  template: `<i-menu v-bind="args" @select="handleSelect">
    <i-menu-item :index="0">menu0</i-menu-item>
    <i-menu-item index="1">menu1</i-menu-item>
    <i-menu-item :index="2" disabled>menu2</i-menu-item>
    <i-sub-menu :index="3" title="dropdown">
      <i-menu-item index="3-1">menu0</i-menu-item>
      <i-menu-item index="3-2">menu1</i-menu-item>
    </i-sub-menu>
  </i-menu>`,
});

export const Primary: any = Template.bind({});
Primary.args = {
  mode: "vertical",
  defaultOpenSubmenus: [3],
};
