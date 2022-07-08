import { render } from "@testing-library/react";
import BaseInfo from ".";

describe("components/commons/BaseInfo", () => {
  it("正常に表示される", () => {
    const dummyData = {
      mainText: "東京都港区",
      areaText: "東京都港区",
      isNoindex: false,
      totalCount: 100,
    };
    const { asFragment } = render(<BaseInfo {...dummyData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
