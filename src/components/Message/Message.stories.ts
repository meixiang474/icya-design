import Message from "./message";
import IButton from "../Button";

export default {
  title: "Components/Message",
  component: Message,
  argTypes: {
    // options
    id: {
      table: {
        category: "options",
        type: {
          summary: "string",
        },
      },
      description: "message id",
    },
    message: {
      table: {
        category: "options",
        type: {
          summary: "string",
        },
      },
      description: "message内容",
      control: {
        type: "text",
      },
    },
    type: {
      table: {
        category: "options",
        type: {
          summary: "success|error|info|warning",
        },
      },
      description: "message类型",
      control: {
        type: "radio",
        options: ["success", "error", "info", "warning"],
      },
    },
    duration: {
      table: {
        category: "options",
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "2000",
        },
      },
      description: "message展示时长，单位ms",
      control: {
        type: "number",
      },
    },
    onClose: {
      table: {
        category: "options",
        type: {
          summary: "(id: string) => any",
        },
      },
      description: "message消失时的回调函数",
    },
    offset: {
      table: {
        category: "options",
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: 20,
        },
      },
      description: "message垂直偏移量",
      control: {
        type: "number",
      },
    },
  },
};

const Template = (args: any) => ({
  components: { IButton },
  setup() {
    const handleClick = () => {
      Message(args);
    };
    return { handleClick };
  },
  template: '<i-button @click="handleClick" ></i-button>',
});

export const Knobs: any = Template.bind({});

Knobs.args = {
  message: "message",
};

Knobs.parameters = {
  docs: {
    source: {
      code: `
<i-button v-on:click="handleClick">button</i-button>

import {defineComponent} from 'vue'
import {IButton, IMessage} from 'icyad'

export default defineComponent({
  components: {
    IButton
  },
  setup() {
    const handleClick = () => {
      IMessage({
        message: 'message'
      })
    }
    return {
      handleClick
    }
  }
})
      `,
    },
  },
};

export const DifferentType = (args: any) => ({
  components: { IButton },
  setup() {
    return { args, Message };
  },
  template: `
  <i-button @click="Message.info('info')" :style="{margin: '0 5px'}">info</i-button>
  <i-button btnType="success" @click="Message.success('success')" :style="{margin: '0 5px'}">success</i-button>
  <i-button btnType="warning" @click="Message.warning('warning')" :style="{margin: '0 5px'}">warning</i-button>
  <i-button btnType="danger" @click="Message.error('error')" :style="{margin: '0 5px'}">error</i-button>
  `,
});
DifferentType.parameters = {
  docs: {
    source: {
      code: `
<i-button v-on:click="IMessage.info('info')" :style="{margin: '0 5px'}">info</i-button>
<i-button btnType="success" v-on:click="IMessage.success('success')" :style="{margin: '0 5px'}">success</i-button>
<i-button btnType="warning" v-on:click="IMessage.warning('warning')" :style="{margin: '0 5px'}">warning</i-button>
<i-button btnType="danger" v-on:click="IMessage.error('error')" :style="{margin: '0 5px'}">error</i-button>

import {defineComponent} from 'vue'
import {IButton, IMessage} from 'icyad'
      
export default defineComponent({
  components: {
    IButton
  },
  setup() {
    return {
      IMessage
    }
  }
})       
      `,
    },
  },
};
