import { render } from "@testing-library/react";
import MembersCTA from "~/components/pages/index/MembersCTA";

describe("components/pages/index/MembersCTA", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<MembersCTA />);
    expect(asFragment()).toMatchSnapshot();
  });
});
