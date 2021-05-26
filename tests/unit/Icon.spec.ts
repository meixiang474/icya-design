import { mount, VueWrapper } from "@vue/test-utils";
import Icon from "@/components/Icon/index.vue";

let wrapper: VueWrapper<any>;

describe("test Icon Component", () => {
  it("should render correct with default props", () => {
    wrapper = mount(Icon, {
      props: {
        icon: "watch",
      },
    });
    expect(wrapper.get("svg").classes()).not.toContain("is-block");
    const pathElement = wrapper.get("path").element;
    expect(getComputedStyle(pathElement).fill).toBe("black");
  });
  it("should render correct with custom props", () => {
    wrapper = mount(Icon, {
      props: {
        icon: "watch",
        block: true,
        color: "red",
      },
    });
    expect(wrapper.get("svg").classes()).toContain("is-block");
    const pathElement = wrapper.get("path").element;
    expect(getComputedStyle(pathElement).fill).toBe("red");
  });
});
