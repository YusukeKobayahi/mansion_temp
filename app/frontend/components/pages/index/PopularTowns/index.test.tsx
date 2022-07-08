import { render } from "@testing-library/react";
import PopularTowns from "~/components/pages/index/PopularTowns";

describe("components/pages/index/PopularTowns", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<PopularTowns />);
    expect(asFragment()).toMatchSnapshot();
  });
});
