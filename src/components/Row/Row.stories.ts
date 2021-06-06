import IRow from "./index.vue";
import ICol from "../Col";

export default {
  title: "Components/Layout/Row",
  component: IRow,
  argTypes: {
    // props
    tag: {
      table: {
        category: "props",
      },
      description: "渲染的标签",
    },
    gutter: {
      table: {
        category: "props",
      },
      description: "列间距",
    },
    justify: {
      table: {
        category: "props",
        type: {
          summary: "start|end|center|space-around|space-between",
        },
      },
      description: "列排列方式",
      control: {
        type: "radio",
        options: ["start", "end", "center", "space-around", "space-between"],
      },
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "Col",
        },
      },
      description: "列",
    },
  },
};

const Template = (args: any) => ({
  components: { IRow, ICol },
  setup() {
    return { args };
  },
  template: `
    <i-row v-bind="args">
      <i-col :span="6">
      <div :style="{background: '#ccc', height: '50px'}"></div>
      </i-col>
      <i-col :span="6">
      <div :style="{background: '#ddd', height: '50px'}"></div>
      </i-col>
      <i-col :span="6">
        <div :style="{background: '#aaa', height: '50px'}"></div>
      </i-col>
    </i-row>
  `,
});

export const Knobs: any = Template.bind({});

Knobs.parameters = {
  docs: {
    source: {
      code: `
<i-row>
  <i-col :span="6">
    <div :style="{background: '#ccc', height: '50px'}"></div>
  </i-col>
  <i-col :span="6">
    <div :style="{background: '#ddd', height: '50px'}"></div>
  </i-col>
  <i-col :span="6">
    <div :style="{background: '#aaa', height: '50px'}"></div>
  </i-col>
</i-row>      
      `,
    },
  },
};
