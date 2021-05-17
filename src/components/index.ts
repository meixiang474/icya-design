import { App } from "vue";
import Button from "./Button";
import Alert from "./Alert";

const components = [Button, Alert];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export { install, Button, Alert };

export default {
  install,
};
