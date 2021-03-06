import { App } from "vue";
import Row from "./index.vue";

Row.install = (app: App) => {
  app.component(Row.name, Row);
};

export default Row;
