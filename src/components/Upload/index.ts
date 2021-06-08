import { App } from "vue";
import Upload from "./index.vue";

export * from "./types";

Upload.install = (app: App) => {
  app.component(Upload.name, Upload);
};

export default Upload;
