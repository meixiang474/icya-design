import { App } from "vue";
import Message from "./message";

Message.install = (app: App) => {
  app.config.globalProperties.$message = Message;
};

export default Message;
