import { render } from "@testing-library/react";
import FloatCTA from ".";

describe("components/commons/FloatCTA", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<FloatCTA page="msl_ichiran" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
