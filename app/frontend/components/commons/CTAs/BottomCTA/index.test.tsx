import { render } from "@testing-library/react";
import BottomCTA from ".";

describe("components/commons/CTAs/BottomCTA", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<BottomCTA />);
    expect(asFragment()).toMatchSnapshot();
  });
});
