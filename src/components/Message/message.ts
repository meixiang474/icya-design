import { createVNode, VNode } from "vue";
import { MessageFunction, MessageOptions, MessageParams } from "./types";
import MessageComponent from "./index.vue";
import { render } from "@vue/runtime-dom";
import { v4 as uuidv4 } from "uuid";

let vms: VNode[] = [];

const Message: MessageFunction = (options: MessageParams) => {
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }
  let offset = options.offset || 20;
  vms.forEach((vm) => {
    offset += vm.el!.offsetHeight + 20;
  });
  const opts: Record<string, any> = {
    ...options,
    id: options.id || uuidv4(),
    offset,
    onClose(id: string) {
      (options as MessageOptions).onClose?.(id);
      vms = vms.filter((vm) => vm.props!.id !== id);
    },
  };
  opts.onDestroy = () => {
    render(null, container);
  };
  const container = document.createElement("div");
  const vm = createVNode(MessageComponent, opts);
  render(vm, container);
  vms.push(vm);
  document.body.appendChild(container.firstElementChild!);
};

Message.success = (options: MessageParams) => {
  options =
    typeof options === "string"
      ? { message: options, type: "success" }
      : { ...options, type: "success" };
  Message({ ...options, type: "success" });
};
Message.info = (options: MessageParams) => {
  options =
    typeof options === "string"
      ? { message: options, type: "info" }
      : { ...options, type: "info" };
  Message({ ...options, type: "info" });
};
Message.error = (options: MessageParams) => {
  options =
    typeof options === "string"
      ? { message: options, type: "error" }
      : { ...options, type: "error" };
  Message({ ...options, type: "error" });
};
Message.warning = (options: MessageParams) => {
  options =
    typeof options === "string"
      ? { message: options, type: "warning" }
      : { ...options, type: "warning" };
  Message({ ...options, type: "warning" });
};
export default Message;
