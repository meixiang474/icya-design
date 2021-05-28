import { App } from "vue";
import Option from "./index.vue";

Option.install = (app: App) => {
  app.component(Option.name, Option);
};

export default Option;
