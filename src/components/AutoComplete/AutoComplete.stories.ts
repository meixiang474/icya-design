import AutoComplete from "./index.vue";

export default {
  title: "Components/AutoComplete",
  component: AutoComplete,
  argTypes: {
    // props
    value: {
      table: {
        category: "props",
        type: {
          summary: "string",
        },
      },
      description: "输入框内容(受控模式)",
      control: {
        type: "text",
      },
    },
    readonly: {
      table: {
        category: "props",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: false,
        },
      },
      description: "输入框是否只读",
      control: {
        type: "boolean",
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
      description: "输入框是否禁用",
      control: {
        type: "boolean",
      },
    },
    placeholder: {
      table: {
        category: "props",
        type: {
          summary: "string",
        },
      },
      description: "输入框placeholder",
      control: {
        type: "text",
      },
    },
    size: {
      table: {
        category: "props",
        type: {
          summary: "lg|sm|md",
        },
        defaultValue: {
          summary: "md",
        },
      },
      description: "输入框大小",
      control: {
        type: "radio",
        options: ["lg", "md", "sm"],
      },
    },
    type: {
      table: {
        category: "props",
        type: {
          summary: "text|password",
        },
        defaultValue: {
          summary: "text",
        },
      },
      description: "输入框类型",
      control: {
        type: "radio",
        options: ["text", "password"],
      },
    },
    icon: {
      table: {
        category: "props",
        type: {
          summary: "string",
        },
      },
      description: "输入框图标，图标值参考图标组件",
      control: {
        type: "text",
      },
    },
    fetchSuggestions: {
      table: {
        category: "props",
        type: {
          summary: "(val: string) => any[] | Promise<any[]>",
        },
      },
      description:
        "获取选项列表函数, 非受控模式应返回string[] | Promise<string[]>",
    },
    //events
    select: {
      table: {
        category: "events",
        type: {
          summary: "(val: any) => any",
        },
      },
      description: "选中选项时触发, 参数类型取决于fetchSuggestions的返回值",
    },
    change: {
      table: {
        category: "events",
        type: {
          summary: "(val: string) => any",
        },
      },
      description: "输入文本时触发, 参数是文本内容",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "自定义选项",
      control: {
        type: null,
      },
    },
  },
};

const Template = (args: any) => ({
  components: { IAutoComplete: AutoComplete },
  setup() {
    return { args };
  },
  template: `
    <div :style="{width: '50%', height: '200px'}">
      <i-auto-complete v-bind="args">
      </i-auto-complete>
    </div>    
  `,
});

export const Knobs: any = Template.bind({});

Knobs.args = {
  fetchSuggestions: (val: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([val, "apple", "banana"]);
      }, 300);
    });
  },
};

Knobs.parameters = {
  docs: {
    source: {
      code: `
<div :style="{width: '50%', height: '200px'}">
  <i-auto-complete :fetch-suggestions="fetchSuggestions"></i-auto-complete>
</div>

import { defineComponent } from "vue";
import { IAutoComplete } from "icyad";
  
export default defineComponent({
  components: {
    IAutoComplete,
  },
  setup() {
    const fetchSuggestions = (val: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([val, "apple", "banana"]);
        }, 300);
      });
    };
    return {
      fetchSuggestions,
    };
  },
});
      `,
    },
  },
};
