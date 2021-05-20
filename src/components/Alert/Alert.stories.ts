import Alert from "./index.vue";

export default {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    // slots
    default: {
      table: {
        category: "slots",
      },
      description: "自定义alert内容",
      control: {
        type: null,
      },
    },
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
      },
      description: "alert类型 'success' | 'default' | 'warning' | 'danger'",
      control: {
        type: "radio",
        options: ["success", "default", "warning", "danger"],
      },
    },
    close: {
      table: {
        category: "events",
      },
    },
  },
};

const Template = (args: any) => ({
  components: { IAlert: Alert },
  setup() {
    const handleClose = () => {
      console.log("closed");
    };
    return { args, handleClose };
  },
  template: '<i-alert v-bind="args" @close="handleClose"></i-alert>',
});

export const Primary: any = Template.bind({});
Primary.args = { title: "标题", content: "这是内容" };
