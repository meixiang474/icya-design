import { App } from "vue";
import IVirtualList from "./index.vue";

IVirtualList.install = (app: App) => {
  app.component(IVirtualList.name, IVirtualList);
};

export default IVirtualList;
