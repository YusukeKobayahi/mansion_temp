import { render } from "@testing-library/react";
import SearchBox from "~/components/pages/freeword/SearchBox";

describe("components/pages/freeword/SearchBox", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<SearchBox />);
    expect(asFragment()).toMatchSnapshot();
  });
});
