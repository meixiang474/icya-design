import { shallowMount, VueWrapper } from "@vue/test-utils";
import Button from "@/components/Button/index.vue";

let wrapper: VueWrapper<any>;

describe("test Button Component", () => {
  it("should render the correct default button", async () => {
    const fn = jest.fn();
    wrapper = shallowMount(Button, {
      props: {
        onClick: fn,
      },
    });
    // 测试button的内容
    expect(wrapper.get("button").text()).toBe("button");

    // 测试button的类名
    expect(wrapper.get("button").classes()).toContain("icyad-btn-default");
    expect(wrapper.get("button").classes()).toContain("icyad-btn-md");
    // 测试click事件
    await wrapper.get("button").trigger("click");
    expect(fn).toHaveBeenCalled();
  });
  it("should render the correct component based on different props", async () => {
    wrapper = shallowMount(Button, {
      props: {
        size: "lg",
      },
    });
    expect(wrapper.find(".icyad-btn-lg").exists()).toBeTruthy();
    await wrapper.setProps({
      size: "sm",
      btnType: "primary",
      class: "custom-class",
    });
    expect(wrapper.find(".icyad-btn-sm").exists()).toBeTruthy();
    expect(wrapper.find(".icyad-btn-primary").exists()).toBeTruthy();
    expect(wrapper.find(".custom-class").exists()).toBeTruthy();
  });
  it("should render a link when btnType is link and href is provided", () => {
    wrapper = shallowMount(Button, {
      props: {
        btnType: "link",
        href: "test.url",
      },
      slots: {
        default: () => "test",
      },
    });
    expect(wrapper.get("a").text()).toBe("test");
    expect(wrapper.get("a").classes()).toContain("icyad-btn-link");
    expect(wrapper.get("a").attributes("href")).toBe("test.url");
  });
  it("should render disabled button when disabled set to true", async () => {
    const fn = jest.fn();
    wrapper = shallowMount(Button, {
      props: {
        disabled: true,
        onClick: fn,
      },
    });
    expect(wrapper.get("button").attributes("disabled")).toBe("");
    await wrapper.get("button").trigger("click");
    expect(fn).not.toBeCalled();
  });
});
