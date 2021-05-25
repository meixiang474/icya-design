import { mount, VueWrapper } from "@vue/test-utils";
import Menu from "@/components/Menu/index.vue";

let wrapper: VueWrapper<any>;

describe("test Menu and MenuItem Components", () => {
  it("should render correct Menu and MenuItem on default props", () => {
    wrapper = mount(Menu, {
      slots: {
        default: `<div class="custom-slot"></div>`,
      },
    });
    expect(wrapper.find(".custom-slot").exists()).toBeTruthy();
  });
  it("should click item change active and call the callback", () => {
    wrapper = mount(Menu);
    wrapper.vm.onSelect(0);
    expect(wrapper.emitted()).toHaveProperty("select");
    expect(wrapper.emitted("select")[0]).toEqual([0]);
  });
  it("should render vertical mode when mode is set to vertical", () => {
    wrapper = mount(Menu, {
      props: {
        mode: "vertical",
      },
    });
    expect(wrapper.get("ul").classes()).toContain("icyad-menu-vertical");
  });
});
