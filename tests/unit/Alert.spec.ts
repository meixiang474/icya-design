import { shallowMount, VueWrapper, mount } from "@vue/test-utils";
import Alert from "@/components/Alert/index.vue";

let wrapper: VueWrapper<any>;

jest.useFakeTimers();

describe("test Alert Component", () => {
  it("should render correctly based on default props", async () => {
    wrapper = shallowMount(Alert, {
      props: {
        title: "title",
        content: "content",
      },
    });
    expect(wrapper.find(".icyad-alert-default").exists()).toBeTruthy();
    expect(wrapper.get(".icyad-alert-title").text()).toBe("title");
    expect(wrapper.get(".icyad-alert-content").text()).toBe("content");
    expect(wrapper.find(".icyad-alert-close").exists()).toBeTruthy();
    await wrapper.get(".icyad-alert-close").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("close");
    expect(wrapper.emitted("close")[0]).toEqual([]);
    const alertElement = wrapper.get(".icyad-alert");
    expect(getComputedStyle(alertElement.element).animation).toBe(
      "hide 0.2s ease-in-out forwards"
    );
    expect(wrapper.find(".icyad-alert-unmount").exists()).toBeFalsy();
    await jest.advanceTimersByTime(2000);
    expect(wrapper.get(".icyad-alert").classes()).toContain(
      "icyad-alert-unmount"
    );
  });
  it("should render correctly based on custom props", async () => {
    wrapper = mount(Alert, {
      props: {
        isUnmount: false,
        delay: 0.5,
        type: "success",
      },
      slots: {
        default: `<div class="custom-content">custom content</div>`,
      },
    });
    expect(wrapper.get(".custom-content").text()).toBe("custom content");
    expect(wrapper.get(".icyad-alert").classes()).toContain(
      "icyad-alert-success"
    );
    await wrapper.get(".icyad-alert-close").trigger("click");
    await jest.advanceTimersByTime(200);
    expect(wrapper.get(".icyad-alert").classes()).not.toContain(
      "icyad-alert-unmount"
    );
    await jest.advanceTimersByTime(300);
    expect(wrapper.get(".icyad-alert").classes()).not.toContain(
      "icyad-alert-unmount"
    );
  });
});
