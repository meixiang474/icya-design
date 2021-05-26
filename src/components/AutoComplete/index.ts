import { App } from "vue";
import AutoComplete from "./index.vue";

AutoComplete.install = (app: App) => {
  app.component(AutoComplete.name, AutoComplete);
};

export default AutoComplete;
