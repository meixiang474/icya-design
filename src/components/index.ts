import { App } from "vue";
import IButton from "./Button";
import IAlert from "./Alert";
import IMenu from "./Menu";
import IMenuItem from "./MenuItem";
import ISubMenu from "./SubMenu";
import ITabs from "./Tabs";
import ITabItem from "./TabItem";
import IIcon from "./Icon";
import IInput from "./Input";
import IAutoComplete from "./AutoComplete";
import ITag from "./Tag";
import ISelect from "./Select";
import IOption from "./Option";
import IProgress from "./Progress";

const components = [
  IButton,
  IAlert,
  IMenu,
  IMenuItem,
  ISubMenu,
  ITabs,
  ITabItem,
  IIcon,
  IInput,
  IAutoComplete,
  ITag,
  ISelect,
  IOption,
  IProgress,
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export {
  install,
  IButton,
  IAlert,
  IMenu,
  IMenuItem,
  ISubMenu,
  ITabs,
  ITabItem,
  IIcon,
  IInput,
  IAutoComplete,
  ITag,
  ISelect,
  IOption,
  IProgress,
};

export default {
  install,
};
