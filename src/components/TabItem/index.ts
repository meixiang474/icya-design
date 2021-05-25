import { App } from "vue";
import TabItem from "./index.vue";

TabItem.install = (app: App) => {
  app.component(TabItem.name, TabItem);
};

export default TabItem;
