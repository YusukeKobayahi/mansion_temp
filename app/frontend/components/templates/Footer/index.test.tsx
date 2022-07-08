import { render } from "@testing-library/react";
import Footer from ".";

describe("components/commons/Footer", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
