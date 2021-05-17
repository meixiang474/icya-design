import { shallowMount, VueWrapper } from "@vue/test-utils";
import Button from "@/components/Button/index.vue";

let wrapper: VueWrapper<any>;

describe("test Button Component", () => {
  beforeAll(() => {
    wrapper = shallowMount(Button);
  });
  it("should render the correct default button", () => {
    expect(wrapper.get("button").text()).toBe("button");
  });
  // it("should render the correct component based on different props", () => {});
  // it("should render a link when btnType is link and href is provided", () => {});
  // it("should render disabled button when disabled set to true", () => {});
});
