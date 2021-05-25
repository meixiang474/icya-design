import { mount, VueWrapper } from "@vue/test-utils";
import SubMenu from "@/components/SubMenu/index.vue";
import { MENU_CONTEXT } from "@/components/constant";

let wrapper: VueWrapper<any>;
jest.useFakeTimers();
describe("test SubMenu component", () => {
  it("should render correctly based on default props", async () => {
    wrapper = mount(SubMenu, {
      props: {
        index: 0,
        title: "test",
      },
      global: {
        provide: {
          [MENU_CONTEXT]: {
            activeIndex: {
              value: 0,
            },
            mode: {
              value: "horizontal",
            },
            defaultOpenSubmenus: ["0"],
          },
        },
      },
      slots: {
        default: "<div class='custom-slot'></div>",
      },
    });
    expect(wrapper.get(".icyad-submenu-title").text()).toBe("test");
    expect(wrapper.vm.menuOpen).toBeFalsy();
    const event = {
      preventDefault() {
        console.log("test-event");
      },
    };
    wrapper.vm.handleMouse(event, true);
    await jest.advanceTimersByTime(300);
    expect(wrapper.vm.menuOpen).toBeTruthy();
    wrapper.vm.handleMouse(event, false);
    await jest.advanceTimersByTime(300);
    expect(wrapper.vm.menuOpen).toBeFalsy();
  });
});
