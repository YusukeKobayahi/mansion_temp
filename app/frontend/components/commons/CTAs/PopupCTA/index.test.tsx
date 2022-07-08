import { render } from "@testing-library/react";
import PopupCTA from ".";

describe("components/commons/CTAs/PopupCTA", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<PopupCTA />);
    expect(asFragment()).toMatchSnapshot();
  });
});
