import { Ref, ComputedRef } from "vue";

export interface MenuContext {
  activeIndex: Ref<number | string>;
  onSelect: (selectedIndex: number | string) => void;
  mode: ComputedRef<"horizontal" | "vertical">;
  defaultOpenSubmenus: (string | number)[];
}
