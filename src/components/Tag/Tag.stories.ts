import Tag from "./index.vue";

export default {
  title: "Components/Tag",
  component: Tag,
  argTypes: {
    // props
    size: {
      table: {
        category: "props",
        type: {
          summary: "lg|md|sm",
        },
      },
      control: {
        type: "radio",
        options: ["lg", "md", "sm"],
      },
      description: "tag大小",
    },
    type: {
      table: {
        category: "props",
        type: {
          summary: "info|primary|warning|danger|success",
        },
      },
      control: {
        type: "radio",
        options: ["info", "primary", "warning", "danger", "success"],
      },
      description: "tag类型",
    },
    closable: {
      table: {
        category: "props",
      },
      description: "是否可关闭",
    },
    // events
    close: {
      table: {
        category: "events",
        type: {
          summary: "() => any",
        },
      },
      description: "关闭tag时触发",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "tag内容",
    },
  },
};

const Template = (args: any) => ({
  components: { ITag: Tag },
  setup() {
    return { args };
  },
  template: '<i-tag v-bind="args" type="primary"></i-tag>',
});

export const Knobs: any = Template.bind({});
Knobs.parameters = {
  docs: {
    source: {
      code: `
      <i-tag></i-tag>
      `,
    },
  },
};
