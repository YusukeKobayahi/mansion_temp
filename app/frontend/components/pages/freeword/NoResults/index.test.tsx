import { render } from "@testing-library/react";
import NoResults from "~/components/pages/freeword/NoResults";

describe("/components/pages/search/freeword/NoResults", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<NoResults />);
    expect(asFragment()).toMatchSnapshot();
  });
});
