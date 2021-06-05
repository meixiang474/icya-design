import Input from "./index.vue";
import IButton from "../Button";
import { ref } from "vue";

export default {
  title: "Components/Input",
  component: Input,
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
        defaultValue: {
          summary: false,
        },
        type: {
          summary: "boolean",
        },
      },
      description: "是否只读",
      control: {
        type: "boolean",
      },
    },
    disabled: {
      table: {
        category: "props",
        defaultValue: {
          summary: false,
        },
        type: {
          summary: "boolean",
        },
      },
      control: {
        type: "boolean",
      },
      description: "是否禁用",
    },
    placeholder: {
      table: {
        category: "props",
        type: {
          summary: "string",
        },
      },
      control: {
        type: "text",
      },
      description: "输入框placeholder",
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
        options: ["lg", "sm", "md"],
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
      description: "尾部图标, 参考Icon组件",
      control: {
        type: "text",
      },
    },
    // events
    change: {
      table: {
        category: "events",
        type: {
          summary: "(val: string) => any",
        },
      },
      description: "输入时触发，参数为输入的值",
    },
    // slots
    prepend: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "输入框前缀",
    },
    append: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "输入框后缀",
    },
    // refs
    inputRef: {
      table: {
        category: "refs",
        type: {
          summary: "Ref<HTMLInputElement",
        },
      },
      description: "输入框实例",
    },
  },
};

const Template = (args: any) => ({
  components: { IInput: Input },
  setup() {
    return { args };
  },
  template: `<div :style="{width: '420px'}">
  <i-input v-bind="args">
  </i-input>
  </div>`,
});

export const Knobs: any = Template.bind({});

Knobs.args = {
  icon: "search",
};

Knobs.parameters = {
  docs: {
    source: {
      code: `
<div :style="{width: '420px'}">
  <i-input icon="search"></i-input>
</div>
      `,
    },
  },
};

export const PrependAndAppend = (args: any) => ({
  components: { IInput: Input },
  setup() {
    return { args };
  },
  template: `<div :style="{width: '420px'}">
  <i-input v-bind="args">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </i-input>
  </div>`,
});

PrependAndAppend.parameters = {
  docs: {
    source: {
      code: `
<div :style="{width: '420px'}">
  <i-input>
    <template v-slot:prepend>https://</template>
    <template v-slot:append>.com</template>
  </i-input>
</div>
      `,
    },
  },
};

export const GetInputInstance = (args: any) => ({
  components: { IInput: Input, IButton },
  setup() {
    const inputRef = ref();
    const handleFocus = () => {
      inputRef.value.inputRef.focus();
    };
    return { args, handleFocus, inputRef };
  },
  template: `<div :style="{width: '420px'}">
  <i-input ref="inputRef"></i-input>
  <i-button @click="handleFocus" :style="{marginTop: '30px'}">focus</i-button>
  </div>`,
});

GetInputInstance.parameters = {
  docs: {
    source: {
      code: `
<div :style="{width: '420px'}">
  <i-input ref="inputRef"></i-input>
  <i-button v-on:click="handleFocus" :style="{marginTop: '30px'}">focus</i-button>
</div>

import {defineComponent} from 'vue';
import {IInput, IButton} from 'icyad';

export default defineComponent({
  components: {
    IInput,
    IButton
  },
  setup() {
    const inputRef = ref();
    const handleFocus = () => {
      inputRef.value.inputRef.focus();
    };
    return { 
      handleFocus, inputRef
    };
  }
})
 `,
    },
  },
};
