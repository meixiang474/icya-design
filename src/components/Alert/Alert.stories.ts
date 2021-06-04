import Alert from "./index.vue";
import Message from "../Message";

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    // props
    closable: {
      table: {
        category: "props",
      },
      description: "alert是否可关闭",
    },
    type: {
      table: {
        category: "props",
        type: {
          summary: "success|default|warning|danger",
        },
      },
      description: "alert类型",
      control: {
        type: "radio",
        options: ["success", "default", "warning", "danger"],
      },
    },
    isUnmount: {
      table: {
        category: "props",
      },
      description: "关闭后是否卸载",
    },
    duration: {
      table: {
        category: "props",
      },
      description: "关闭动画持续事件，单位s",
    },
    title: {
      table: {
        category: "props",
      },
      description: "标题",
    },
    content: {
      table: {
        category: "props",
      },
      description: "内容",
    },
    // events
    close: {
      table: {
        type: {
          summary: "() => any",
        },
        category: "events",
      },
      description: "点击关闭按钮的回调函数",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "自定义alert内容",
      control: {
        type: null,
      },
    },
  },
};

const Template = (args: any) => ({
  components: { IAlert: Alert },
  setup() {
    return { args };
  },
  template: '<i-alert v-bind="args"></i-alert>',
});

export const Knobs: any = Template.bind({});

Knobs.args = { content: "这是内容" };

Knobs.parameters = {
  docs: {
    source: {
      code: `
        <i-alert content="这是内容"></i-alert>
      `,
    },
  },
};

export const WithTitle: any = Template.bind({});

WithTitle.args = { content: "这是内容", title: "这是标题", closable: false };

WithTitle.parameters = {
  docs: {
    source: {
      code: `
        <i-alert content="这是内容" title="这是标题" :closable="false"></i-alert>
      `,
    },
  },
};

export const Closable: any = Template.bind({});

Closable.args = { content: "这是内容", title: "这是标题" };

Closable.parameters = {
  docs: {
    source: {
      code: `
        <i-alert content="这是内容" title="这是标题"></i-alert>
      `,
    },
  },
};

export const DifferentType = (args: any) => ({
  components: { IAlert: Alert },
  setup() {
    return { args };
  },
  template: `
    <div>
      <i-alert v-bind="args" title="标题" content="这是内容" type="default"></i-alert>
      <i-alert v-bind="args" title="标题" content="这是内容" type="success"></i-alert>
      <i-alert v-bind="args" title="标题" content="这是内容" type="warning"></i-alert>
      <i-alert v-bind="args" title="标题" content="这是内容" type="danger"></i-alert>
    </div>
  `,
});

DifferentType.parameters = {
  docs: {
    source: {
      code: `
<div>
  <i-alert v-bind="args" title="标题" content="这是内容" type="default"></i-alert>
  <i-alert v-bind="args" title="标题" content="这是内容" type="success"></i-alert>
  <i-alert v-bind="args" title="标题" content="这是内容" type="warning"></i-alert>
  <i-alert v-bind="args" title="标题" content="这是内容" type="danger"></i-alert>
</div>
      `,
    },
  },
};

export const CustomContent = (args: any) => ({
  components: { IAlert: Alert },
  setup() {
    return { args };
  },
  template: `
    <i-alert v-bind="args">
        <span>我是自定义内容</span>
    </i-alert>
  `,
});

CustomContent.parameters = {
  docs: {
    source: {
      code: `
<i-alert v-bind="args">
  <span>我是自定义内容</span>
</i-alert>
      `,
    },
  },
};

export const TrggerCloseEvent = (args: any) => ({
  components: { IAlert: Alert },
  setup() {
    const handleClose = () => {
      Message.success("close事件触发成功");
    };
    return { args, handleClose };
  },
  template: `
    <div>
      <i-alert v-bind="args" title="标题" content="这是内容" @close="handleClose"></i-alert>
    </div>
  `,
});

TrggerCloseEvent.parameters = {
  docs: {
    source: {
      code: `
<template>
  <i-alert title="标题" content="这是内容" @close="handleClose"></i-alert>
</template>
    
<script lang="ts">
  import { defineComponent } from "vue";
  import { IMessage, IAlert } from "./components";
  
  export default defineComponent({
    components: {
      IAlert,
    },
    setup() {
      const handleClose = () => {
        IMessage.success("close事件触发成功");
      };
      return {
        handleClose,
      };
    },
  });
</script>     
`,
    },
  },
};
