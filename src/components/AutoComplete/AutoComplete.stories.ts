import AutoComplete from "./index.vue";

export default {
  title: "Components/AutoComplete",
  component: AutoComplete,
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
  components: { IAutoComplete: AutoComplete },
  setup() {
    const handleFetch = (val: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([val, "sam", "lily"]);
        }, 300);
      });
    };
    return { args, handleFetch };
  },
  template: `<i-auto-complete v-bind="args" :fetchSuggestions="handleFetch">
    <template #default="slotProps">
      {{slotProps.suggestion}}-{{slotProps.index}}
    </template>
  </i-auto-complete>`,
});

export const Primary: any = Template.bind({});
