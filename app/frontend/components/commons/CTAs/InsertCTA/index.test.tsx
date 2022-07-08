import { render } from "@testing-library/react";
import InsertCTA from ".";

describe("components/commons/CTAs/InsertCTA", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<InsertCTA />);
    expect(asFragment()).toMatchSnapshot();
  });
});
