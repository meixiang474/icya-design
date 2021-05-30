<template>
  <div class="icyad-file-upload">
    <div
      class="icyad-upload-area"
      :class="{ 'is-dragover': drag && isDragOver }"
      v-on="events"
    >
      <slot v-if="isUploading" name="loading">
        <div v-if="drag" class="icyad-drag-upload">正在上传文件</div>
        <i-button disabled v-else>正在上传</i-button>
      </slot>
      <slot
        name="uploaded"
        v-else-if="lastFileData && lastFileData.loaded"
        :uploadedData="lastFileData.data"
      >
        <div v-if="drag" class="icyad-drag-upload">拖拽上传文件</div>
        <i-button v-else>点击上传</i-button>
      </slot>
      <slot v-else name="default">
        <div v-if="drag" class="icyad-drag-upload">拖拽上传文件</div>
        <i-button v-else>点击上传</i-button>
      </slot>
    </div>
    <input
      type="file"
      :style="{ display: 'none' }"
      ref="fileInput"
      :multiple="multiple"
      @change="handleFileChange"
    />
    <ul
      :class="`icyad-upload-list icyad-upload-list-${listType}`"
      v-if="showUploadList"
    >
      <li
        :class="`icyad-uploaded-file icyad-upload-${file.status}`"
        v-for="file in files || filesList"
        :key="file.uid"
      >
        <img
          v-if="file.url && listType === 'picture'"
          class="icyad-upload-list-thumbnail"
          :src="file.url"
          :alt="file.name"
        />
        <span v-if="file.status === 'loading'" class="icyad-file-icon">
          <i-icon icon="loading" spin></i-icon>
        </span>
        <span v-else-if="file.status === 'ready'" class="icyad-file-icon">
          <i-icon icon="book"></i-icon>
        </span>
        <span v-else-if="file.status === 'success'">
          <i-icon icon="check"></i-icon>
        </span>
        <span v-else>
          <i-icon icon="closeAlt"></i-icon>
        </span>
        <span class="icyad-filename">{{ file.name }}</span>
        <slot
          name="progress"
          v-if="showProgress"
          :file="file"
          :list="files || filesList"
        >
          <i-progress
            :style="{ width: '30%' }"
            :count="file.percent"
          ></i-progress>
        </slot>
        <span class="icyad-delete-icon" @click="removeFile(file.uid)">
          <i-icon icon="trash"></i-icon>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
} from "@vue/runtime-core";
import IIcon from "../Icon";
import IProgress from "../Progress";
import IButton from "../Button";
import { last } from "lodash-es";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
type CheckUpload = (file: File) => boolean | Promise<File>;
type FileListType = "picture" | "text";
type UploadStatus = "ready" | "loading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStatus;
  raw: File;
  resp?: any;
  percent: number;
  url?: string;
}

const resolveName = (name: string | string[], index: number) => {
  if (Array.isArray(name)) {
    return name[index];
  }
  return name;
};

export default defineComponent({
  name: "uploader",
  components: {
    IIcon,
    IProgress,
    IButton,
  },
  props: {
    files: {
      type: Array as PropType<UploadFile[]>,
    },
    name: {
      type: [String, Array] as PropType<string | string[]>,
      default: "file",
    },
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckUpload>,
    },
    showProgress: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
    customRequest: {
      type: Function as PropType<
        (val: { file: UploadFile; list: UploadFile[]; raw: File }) => any
      >,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    listType: {
      type: String as PropType<FileListType>,
      default: "text",
    },
    showUploadList: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["progress", "success", "error", "change", "removeFile"],
  setup(props, ctx) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const filesList = ref<UploadFile[]>([]);
    const isDragOver = ref(false);
    const isUploading = computed(() => {
      return (props.files || filesList.value).some(
        (item) => item.status === "loading"
      );
    });
    const lastFileData = computed(() => {
      const lastFile = last(props.files || filesList.value);
      if (lastFile) {
        return {
          loaded: lastFile.status === "success",
          data: lastFile.resp,
        };
      }
      return false;
    });
    const removeFile = (id: string) => {
      ctx.emit("removeFile", id);
      filesList.value = filesList.value.filter((item) => item.uid !== id);
    };
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const postFile = (readyFile: UploadFile, index: number) => {
      if (props.customRequest) {
        props.customRequest({
          file: readyFile,
          list: props.files || filesList.value,
          raw: readyFile.raw,
        });
        return;
      }
      const formData = new FormData();
      formData.append(resolveName(props.name, index), readyFile.raw);
      Object.keys(props.data).forEach((item) => {
        formData.append(item, props.data[item]);
      });
      readyFile.status = "loading";
      axios
        .post(props.action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...props.headers,
          },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            readyFile.percent = percent;
            ctx.emit("progress", {
              file: readyFile,
              list: props.files || filesList.value,
            });
          },
        })
        .then((res) => {
          readyFile.status = "success";
          readyFile.resp = res.data;
          ctx.emit("success", {
            file: readyFile,
            list: props.files || filesList.value,
          });
        })
        .catch((err) => {
          readyFile.status = "error";
          ctx.emit("error", {
            error: err,
            file: readyFile,
            list: props.files || filesList.value,
          });
          console.error(err);
        })
        .finally(() => {
          if (fileInput.value) {
            fileInput.value.value = "";
          }
        });
    };
    const addFileToList = (uploadedFile: File) => {
      const fileObj = reactive<UploadFile>({
        uid: uuidv4(),
        size: uploadedFile.size,
        name: uploadedFile.name,
        status: "ready",
        raw: uploadedFile,
        percent: 0,
      });
      if (props.listType === "picture") {
        try {
          fileObj.url = URL.createObjectURL(uploadedFile);
        } catch (e) {
          console.error("upload File error", e);
        }
      }
      filesList.value.push(fileObj);
      ctx.emit("change", {
        file: fileObj,
        list: props.files || filesList.value,
      });
      if (props.autoUpload) {
        postFile(fileObj, filesList.value.length - 1);
      }
    };
    const beforeUploadCheck = (files: FileList | null) => {
      if (files) {
        const fileList = Array.from(files);
        fileList.forEach((file) => {
          if (props.beforeUpload) {
            const res = props.beforeUpload(file);
            if (res && res instanceof Promise) {
              res
                .then((processedFile) => {
                  if (processedFile instanceof File) {
                    addFileToList(processedFile);
                  } else {
                    throw new Error(
                      "beforeUpload Promise should return a File object"
                    );
                  }
                })
                .catch((e) => {
                  console.error(e);
                });
            } else if (res === true) {
              addFileToList(file);
            }
          } else {
            addFileToList(file);
          }
        });
      }
    };
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      beforeUploadCheck(target.files);
    };
    const handleDrag = (e: DragEvent, over: boolean) => {
      e.preventDefault();
      isDragOver.value = over;
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (isUploading.value) return;
      isDragOver.value = false;
      if (e.dataTransfer) {
        beforeUploadCheck(e.dataTransfer.files);
      }
    };

    const uploadFiles = () => {
      (props.files || filesList.value)
        .filter((file) => file.status === "ready")
        .forEach((readyFile, index) => {
          postFile(readyFile, index);
        });
    };

    const events = computed(() => {
      const events: { [key: string]: (e: any) => void } = {
        click: triggerUpload,
      };
      if (props.drag) {
        events.dragover = (e: DragEvent) => {
          handleDrag(e, true);
        };
        events.dragleave = (e: DragEvent) => {
          handleDrag(e, false);
        };
        events.drop = handleDrop;
      }
      return events;
    });
    return {
      fileInput,
      triggerUpload,
      handleFileChange,
      filesList,
      isUploading,
      removeFile,
      lastFileData,
      isDragOver,
      events,
      uploadFiles,
    };
  },
});
</script>
