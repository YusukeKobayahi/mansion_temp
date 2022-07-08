import { render } from "@testing-library/react";
import LinkBlock from "~/components/commons/LinkBlock";

describe("components/commons/LinkBlock", () => {
  it("正常に表示される", () => {
    const dummyData = {
      name: "千代田区",
      id: "13101",
      mansionCount: 127,
      link: "cities",
    };
    const { asFragment } = render(<LinkBlock {...dummyData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
