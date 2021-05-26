import { App } from "vue";
import Button from "./Button";
import Alert from "./Alert";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";
import Tabs from "./Tabs";
import TabItem from "./TabItem";
import Icon from "./Icon";
import Input from "./Input";
import AutoComplete from "./AutoComplete";

const components = [
  Button,
  Alert,
  Menu,
  MenuItem,
  SubMenu,
  Tabs,
  TabItem,
  Icon,
  Input,
  AutoComplete,
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export {
  install,
  Button,
  Alert,
  Menu,
  MenuItem,
  SubMenu,
  Tabs,
  TabItem,
  Icon,
  Input,
  AutoComplete,
};

export default {
  install,
};
