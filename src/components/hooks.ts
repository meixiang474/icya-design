import { onMounted, onUnmounted, Ref } from "vue";

export function useClickOutside(
  ref: Ref<HTMLDivElement>,
  handler: (...args: any[]) => any
) {
  const listener = (e: MouseEvent) => {
    if (!ref.value || ref.value.contains(e.target as Node)) return;
    handler(e);
  };
  onMounted(() => {
    document.addEventListener("click", listener);
  });
  onUnmounted(() => {
    document.removeEventListener("click", listener);
  });
}
