import { Ref, ComputedRef } from "vue";

export interface MenuContext {
  activeIndex: Ref<number | string>;
  onSelect: (selectedIndex: number | string) => void;
  mode: ComputedRef<"horizontal" | "vertical">;
  defaultOpenSubmenus: (string | number)[];
}

export interface SelectContext {
  externalValue: ComputedRef<string | string[] | undefined>;
  internalValue: Ref<string>;
  internalValues: Ref<string[]>;
  multiple: ComputedRef<boolean>;
  activeIndex: Ref<number>;
  availableValues: Ref<string[]>;
}
