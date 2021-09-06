import IVirtualList from "./index.vue";

export default {
  title: "Components/VirtualList",
  component: IVirtualList,
  argTypes: {
    // props
    size: {
      table: {
        category: "props",
      },
      description: "列表中预计每项的高度",
    },
    remain: {
      table: {
        category: "props",
      },
      description: "预计展示多少项",
    },
    items: {
      table: {
        category: "props",
        type: {
          summary: "ItemProps[]",
        },
        defaultValue: {
          summary: "[]",
        },
      },
      description: "每项的数据，必须有一个id属性为string，其他属性任意",
    },
    variable: {
      table: {
        category: "props",
      },
      description: "每项的高度是否不固定，选择此模式时性能会有损耗",
    },
    throttle: {
      table: {
        category: "props",
      },
      description: "截流时间，单位ms",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "自定义每项",
    },
  },
};

const Template = (args: any) => ({
  components: { IVirtualList },
  setup() {
    return { args };
  },
  template: `
    <div :style="{height: '500px'}">
      <i-virtual-list v-bind="args">
        <template v-slot="slotProps">
          <div :style="{backgroundColor: slotProps.item.id % 2 ? '#adb5bd' : '#0d6efd', height: '100px'}">
            {{slotProps.item.id}}
          </div>
        </template>
      </i-virtual-list>
    </div>
  `,
});

export const Knobs: any = Template.bind({});

Knobs.args = {
  size: 100,
  remain: 5,
  items: new Array(100).fill(null).map((item, index) => ({ id: index + "" })),
  variable: false,
};

Knobs.parameters = {
  docs: {
    source: {
      code: `
<div :style="{height: '500px'}">
  <i-virtual-list :items="items" :size="100" :remain="5">
    <template v-slot="slotProps">
      <div :style="{backgroundColor: slotProps.item.id % 2 ? '#adb5bd' : '#0d6efd', height: '100px'}">
        {{slotProps.item.id}}
      </div>
    </template>
  </i-virtual-list>
</div>

import {defineComponent} from 'vue';
import {IVirtualList} from 'icyad';

export default defineComponent({
  components: {
    IVirtualList
  },
  setup() {
    const item = new Array(100).fill(null).map((item, index) => ({ id: index + "" }));
    return {
      items
    }
  }
})
      `,
    },
  },
};

export const VaribaleMode = (args: any) => ({
  components: { IVirtualList },
  setup() {
    const items = new Array(100)
      .fill(null)
      .map((item, index) => ({ id: index + "" }));
    return { args, items };
  },
  template: `
    <div :style="{height: '500px'}">
      <i-virtual-list :size="100" :remain="5" :items="items" variable>
        <template v-slot="slotProps">
          <div :style="{backgroundColor: slotProps.item.id % 2 ? '#adb5bd' : '#0d6efd', height: slotProps.item.id % 2 ? '100px' : '200px'}">
            {{slotProps.item.id}}
          </div>
        </template>
      </i-virtual-list>
    </div>
  `,
});

VaribaleMode.parameters = {
  docs: {
    source: {
      code: `
<div :style="{height: '500px'}">
  <i-virtual-list :items="items" :size="100" :remain="5" variable>
    <template v-slot="slotProps">
      <div :style="{backgroundColor: slotProps.item.id % 2 ? '#adb5bd' : '#0d6efd', height: slotProps.item.id % 2 ? '100px' : '200px'}">
        {{slotProps.item.id}}
      </div>
    </template>
  </i-virtual-list>
</div>

import {defineComponent} from 'vue';
import {IVirtualList} from 'icyad';

export default defineComponent({
  components: {
    IVirtualList
  },
  setup() {
    const item = new Array(100).fill(null).map((item, index) => ({ id: index + "" }));
    return {
      items
    }
  }
})
      `,
    },
  },
};
