import { render } from "@testing-library/react";
import Header from ".";

describe("components/commons/Header", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
