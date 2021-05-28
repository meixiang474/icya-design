export function debounce(fn: (...args: any[]) => any, delay = 200) {
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
