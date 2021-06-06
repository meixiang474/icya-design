import Select from "./index.vue";
import Option from "../Option";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    // props
    value: {
      table: {
        category: "props",
      },
      description: "受控模式",
    },
    disabled: {
      table: {
        category: "props",
      },
      description: "是否禁用",
    },
    placeholder: {
      table: {
        category: "props",
      },
      description: "placeholder",
    },
    multiple: {
      table: {
        category: "props",
      },
      description: "是否多选",
    },
    defaultValue: {
      table: {
        category: "props",
      },
      description: "默认value",
    },
    // events:
    change: {
      table: {
        category: "events",
        type: {
          summary: "(val: string | string[]) => any",
        },
      },
      description: "select值发生变化时触发",
    },
    // slots
    empty: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "选项为空时所展示的内容",
    },
    default: {
      table: {
        category: "slots",
        type: {
          summary: "Option",
        },
      },
      description: "选项",
    },
  },
};

const Template = (args: any) => ({
  components: { ISelect: Select, IOption: Option },
  setup() {
    return {
      args,
    };
  },
  template: `
  <div :style="{width: '420px', height: '300px'}">
    <i-select v-bind="args">
      <i-option value="disabled" disabled></i-option>
      <i-option value="apple" label="苹果"></i-option>
      <i-option value="orange" label="橘子"></i-option>
      <i-option value="banana" label="香蕉"></i-option>
      <i-option value="watermelon" label="西瓜"></i-option>
      <i-option value="lemon" label="柠檬"></i-option>
    </i-select>
  </div>
  `,
});

export const Knobs: any = Template.bind({});

Knobs.args = {
  placeholder: "select fruit",
};

Knobs.parameters = {
  docs: {
    source: {
      code: `
<div :style="{width: '420px', height: '300px'}">
  <i-select>
    <i-option value="disabled" disabled></i-option>
    <i-option value="apple" label="苹果"></i-option>
    <i-option value="orange" label="橘子"></i-option>
    <i-option value="banana" label="香蕉"></i-option>
    <i-option value="watermelon" label="西瓜"></i-option>
    <i-option value="lemon" label="柠檬"></i-option>
  </i-select>
</div>     
      `,
    },
  },
};
