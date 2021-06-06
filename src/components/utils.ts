import { SetupContext } from "@vue/runtime-core";
import mitt from "mitt";

export const emitter = mitt();

export function debounce(fn: (...args: any[]) => any, delay = 500) {
  let timer: any;
  return function(this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

export function exchangeValueToLabel(
  value: string | string[],
  ctx: SetupContext<any>
) {
  if (Array.isArray(value)) {
    return value.map((val) => {
      const targetSlot = ctx.slots
        .default?.()
        .find((item) => item.props && item.props.value === val);

      if (targetSlot) {
        const label = targetSlot.props?.label;
        return (label == null ? val : label) as string;
      } else {
        return val;
      }
    });
  } else {
    const targetSlot = ctx.slots
      .default?.()
      .find((item) => item.props && item.props.value === value);
    if (targetSlot) {
      const label = targetSlot.props?.label;
      return (label == null ? value : label) as string;
    } else {
      return value;
    }
  }
}
