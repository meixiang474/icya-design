import { App } from "vue";
import Tabs from "./index.vue";

Tabs.install = (app: App) => {
  app.component(Tabs.name, Tabs);
};

export default Tabs;
