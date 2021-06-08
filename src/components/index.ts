import { App } from "vue";
import IButton from "./Button";
import IButtonGroup from "./ButtonGroup";
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
import IUpload, { UploadFile } from "./Upload";
import IRow from "./Row";
import ICol from "./Col";
import IMessage from "./Message";

const components = [
  IButton,
  IButtonGroup,
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
  IUpload,
  IRow,
  ICol,
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export {
  install,
  IButton,
  IButtonGroup,
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
  IUpload,
  IRow,
  ICol,
  IMessage,
  UploadFile,
};

export default {
  install,
};
