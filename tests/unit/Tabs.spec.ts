import { mount, VueWrapper } from "@vue/test-utils";
import { ref } from "vue";
import Tabs from "@/components/Tabs/index.vue";
import TabItem from "@/components/TabItem/index.vue";

let wrapper: VueWrapper<any>;

describe("test Tabs Compoenent", () => {
  it("should render correct with default props", async () => {
    const Container = {
      components: {
        Tabs,
        TabItem,
      },
      template: `
        <tabs>
          <tab-item class="test1" label="test1" name="1">111</tab-item>
          <tab-item label="test2" name="2">222</tab-item>
        </tabs>
      `,
    };
    wrapper = mount(Container);
    expect(wrapper.get("li").text()).toBe("test1");
    expect(wrapper.get("li").classes()).toContain("test1");
    expect(wrapper.get("li:last-child").text()).toBe("test2");
    expect(wrapper.get("li").classes()).toContain("is-active");
    expect(wrapper.get(".icyad-tabs-content").text()).toBe("111");
    expect(wrapper.get("ul").classes()).toContain("icyad-tabs-title-line");
    await wrapper.get("li:last-child").trigger("click");
    expect(wrapper.get("li:last-child").classes()).toContain("is-active");
    expect(wrapper.get(".icyad-tabs-content").text()).toBe("222");
  });
  it("should render correct with custom props", () => {
    const Container = {
      components: {
        Tabs,
        TabItem,
      },
      template: `
        <tabs defaultName="2" mode="card">
          <tab-item class="test1" label="test1" name="1" disabled>111</tab-item>
          <tab-item label="test2" name="2">222</tab-item>
        </tabs>
      `,
    };
    wrapper = mount(Container);
    expect(wrapper.get("li:last-child").classes()).toContain("is-active");
    expect(wrapper.get("li").classes()).toContain("disabled");
  });
  it("should render correctly with correct mode", async () => {
    const fn = jest.fn();
    const Container = {
      components: {
        Tabs,
        TabItem,
      },
      setup() {
        const activeName = ref("1");
        const handleChange = (name: string | number) => {
          fn(name);
          activeName.value = name as string;
        };
        return {
          activeName,
          handleChange,
        };
      },
      template: `
        <tabs :activeName="activeName" mode="card" @change="handleChange">
          <tab-item class="test1" label="test1" name="1" disabled>111</tab-item>
          <tab-item label="test2" name="2">222</tab-item>
        </tabs>
      `,
    };
    wrapper = mount(Container);
    expect(wrapper.get("li").classes()).toContain("is-active");
    await wrapper.get("li:last-child").trigger("click");
    expect(wrapper.get("li:last-child").classes()).toContain("is-active");
    expect(fn).toHaveBeenCalledWith("2");
  });
});
