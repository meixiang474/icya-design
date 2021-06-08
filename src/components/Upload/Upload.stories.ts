import Upload from "./index.vue";

export default {
  title: "Components/Upload",
  component: Upload,
  argTypes: {
    // props
    files: {
      table: {
        category: "props",
        type: {
          summary: "UploadFile[]",
        },
      },
      description: "受控模式",
    },
    defaultFiles: {
      table: {
        category: "props",
        type: {
          summary: "UploadFile[]",
        },
        defaultValue: {
          summary: "[]",
        },
      },
      description: "默认已上传文件",
    },
    name: {
      table: {
        category: "props",
        type: {
          summary: "string|string[]",
        },
        defaultValue: {
          summary: "file",
        },
      },
      description: "上传文件的name字段",
    },
    action: {
      table: {
        category: "props",
      },
      description: "上传地址",
    },
    beforeUpload: {
      table: {
        category: "props",
        type: {
          summary: "(file: File) => boolean | Promise<File>",
        },
      },
      description: "上传前钩子函数",
      control: null,
    },
    showProgress: {
      table: {
        category: "props",
      },
      description: "是否展示进度条",
    },
    multiple: {
      table: {
        category: "props",
      },
      description: "是否可以多选",
    },
    data: {
      table: {
        category: "props",
      },
      description: "自定义额外请求体",
    },
    headers: {
      table: {
        category: "props",
      },
      description: "自定义额外请求头",
    },
    customRequest: {
      table: {
        category: "props",
        type: {
          summary:
            "(val: {file: UploadFile; list: UploadFile[]; raw: File}) => any",
        },
      },
      description: "自定义请求函数",
    },
    drag: {
      table: {
        category: "props",
      },
      description: "是否拖拽上传",
    },
    autoUpload: {
      table: {
        category: "props",
      },
      description: "是否自动上传",
    },
    listType: {
      table: {
        category: "props",
        type: {
          summay: "text|picture",
        },
      },
      description: "列表类型",
      control: {
        type: "radio",
        options: ["text", "picture"],
      },
    },
    showUploadList: {
      table: {
        category: "props",
      },
      description: "是否展示上传列表",
    },
    // events
    progress: {
      table: {
        category: "events",
        type: {
          summary: "(props: {file: UploadFile; list: UploadFile[]}) => any",
        },
      },
      description: "上传中触发",
    },
    success: {
      table: {
        category: "events",
        type: {
          summary: "(props: {file: UploadFile; list: UploadFile[]}) => any",
        },
      },
      description: "上传成功时触发",
    },
    error: {
      table: {
        category: "events",
        type: {
          summary:
            "(props: {error: any; file: UploadFile; list: UploadFile[]}) => any",
        },
      },
      description: "上传失败时触发",
    },
    change: {
      table: {
        category: "events",
        type: {
          summary: "(props: {file: UploadFile; list: UploadFile[]}) => any",
        },
      },
      description: "文件列表变化时触发",
    },
    // slots
    default: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "自定义上传组件",
    },
    uploaded: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "自定义上传成功后样式",
    },
    uploading: {
      table: {
        category: "slots",
        type: {
          summary: "slot",
        },
      },
      description: "自定义上传中样式",
    },
    "progress(slot)": {
      table: {
        category: "slots",
        type: {
          summary: "slotProps: {file: UploadFile; list: UploadFile[]}",
        },
      },
      description: "自定义进度条",
    },
    // types
    UploadFile: {
      table: {
        category: "types",
        type: {
          summary:
            "{uid: string; size: number; name: string; status: UploadStatus; raw?: File; resp?: any; percent: number; url?: string}",
        },
      },
      description: "UploadFile类型",
    },
    UploadStatus: {
      table: {
        category: "types",
        type: {
          summary: "ready | loading | success | error",
        },
      },
      description: "UploadStatus类型",
    },
  },
};

const Template = (args: any) => ({
  components: { IUpload: Upload },
  setup() {
    return { args };
  },
  template: '<i-upload v-bind="args"></i-upload>',
});

export const Knobs: any = Template.bind({});

Knobs.args = {
  action: "http://39.101.151.113:6006/api/utils/upload",
  defaultFiles: [],
};

Knobs.parameters = {
  docs: {
    source: {
      code: `
      <i-upload action="http://39.101.151.113:6006/api/utils/upload"></i-upload>
      `,
    },
  },
};
