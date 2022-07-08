import { render } from "@testing-library/react";
import Sort from "~/components/commons/Sort";

describe("components/commons/Sort", () => {
  it("正常に表示される", () => {
    const pathname = "/cities/13101/";
    const searchCondition = {
      gft: 5,
    };
    const { asFragment } = render(
      <Sort pathname={pathname} searchCondition={searchCondition} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
