import { render } from "@testing-library/react";
import Nav from "~/components/pages/mansions/Nav";

describe("components/pages/mansions/Nav", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<Nav />);
    expect(asFragment()).toMatchSnapshot();
  });
});
