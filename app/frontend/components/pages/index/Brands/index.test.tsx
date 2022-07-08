import { render } from "@testing-library/react";
import Brands from "~/components/pages/index/Brands";

describe("components/pages/index/Brands", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<Brands />);
    expect(asFragment()).toMatchSnapshot();
  });
});
