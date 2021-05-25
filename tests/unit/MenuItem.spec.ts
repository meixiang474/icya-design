import { shallowMount, VueWrapper } from "@vue/test-utils";
import MenuItem from "@/components/MenuItem/index.vue";
import { MENU_CONTEXT } from "@/components/constant";

let wrapper: VueWrapper<any>;

describe("test MenuItem component", () => {
  it("should render correctly based on default props", async () => {
    const fn = jest.fn();
    wrapper = shallowMount(MenuItem, {
      props: {
        index: 0,
      },
      global: {
        provide: {
          [MENU_CONTEXT]: {
            activeIndex: {
              value: 1,
            },
            onSelect: fn,
          },
        },
      },
      slots: {
        default: () => "test",
      },
    });
    expect(wrapper.get("li").text()).toBe("test");
    expect(wrapper.get("li").classes()).not.toContain("icyad-menu-item-active");
    await wrapper.get("li").trigger("click");
    expect(fn).toHaveBeenCalledWith(0);
  });
  it("should render correctly when activeIndex equals to index", () => {
    const fn = jest.fn();
    wrapper = shallowMount(MenuItem, {
      props: {
        index: 0,
        disabled: true,
      },
      global: {
        provide: {
          [MENU_CONTEXT]: {
            activeIndex: {
              value: 0,
            },
            onSelect: fn,
          },
        },
      },
      slots: {
        default: () => "test",
      },
    });
    expect(wrapper.get("li").classes()).toContain("icyad-menu-item-active");
    expect(wrapper.get("li").classes()).toContain("icyad-menu-item-disabled");
  });
});
