import { render } from "@testing-library/react";
import Register from "~/components/pages/index/Register";

describe("components/pages/index/Register", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<Register />);
    expect(asFragment()).toMatchSnapshot();
  });
});
