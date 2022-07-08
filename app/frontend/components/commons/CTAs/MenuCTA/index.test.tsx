import { render } from "@testing-library/react";
import MenuCTA from ".";

describe("components/commons/CTAs/CTAs", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<MenuCTA />);
    expect(asFragment()).toMatchSnapshot();
  });
});
