import { render } from "@testing-library/react";
import MembersCTA from ".";

describe("components/commons/CTAs/MembersCTA", () => {
  it("正常に表示される", () => {
    const dummyData = {
      name: "リブシティ神田",
    };
    const { asFragment } = render(<MembersCTA {...dummyData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
