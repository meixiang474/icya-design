import Progress from "./index.vue";

export default {
  title: "Components/Progress",
  component: Progress,
  argTypes: {
    // props
    count: {
      table: {
        category: "props",
        defaulValue: {
          summary: 30,
        },
      },
      description: "progress进度值",
    },
    width: {
      table: {
        category: "props",
        defaultValue: {
          summary: 500,
        },
      },
      description: "progress长度，单位px",
    },
    text: {
      table: {
        category: "props",
      },
      description: "progress末尾文本，默认是进度值",
    },
    primary: {
      table: {
        category: "props",
        defaultValue: {
          summary: "#1890ff",
        },
      },
      description: "progress填充颜色",
      control: {
        type: "color",
      },
    },
    base: {
      table: {
        category: "props",
        defaultValue: {
          summary: "#f5f5f5",
        },
      },
      description: "progress基础颜色",
      control: {
        type: "color",
      },
    },
  },
};

const Template = (args: any) => ({
  components: { IProgress: Progress },
  setup() {
    return { args };
  },
  template: '<i-progress v-bind="args"></i-progress>',
});

export const Knobs: any = Template.bind({});

Knobs.parameters = {
  docs: {
    source: {
      code: `
 <i-progress :count="30"></i-progress>     
      `,
    },
  },
};
