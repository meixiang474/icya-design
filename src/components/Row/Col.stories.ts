import Col from "../Col";

export default {
  title: "Components/Layout/Col",
  components: Col,
  argTypes: {
    tag: {
      table: {
        category: "props",
        defaultValue: {
          summary: "div",
        },
        type: {
          summary: "string",
        },
      },
      description: "渲染的标签",
      control: {
        type: "text",
      },
    },
    span: {
      table: {
        category: "props",
        defaultValue: {
          summary: 24,
        },
        type: {
          summary: "number",
        },
      },
      description: "列所占的份数",
      control: {
        type: "number",
      },
    },
    offset: {
      table: {
        category: "props",
        defaultValue: {
          summary: 0,
        },
        type: {
          summary: "number",
        },
      },
      description: "列偏移量",
      control: {
        type: "number",
      },
    },
    default: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "列内容",
    },
  },
};

export const Docs = (args: any) => ({
  setup() {
    return { args };
  },
});
