import { App } from "vue";
import ButtonGroup from "./index.vue";

ButtonGroup.install = (app: App) => {
  app.component(ButtonGroup.name, ButtonGroup);
};

export default ButtonGroup;
