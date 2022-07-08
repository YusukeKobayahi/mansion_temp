import { render } from "@testing-library/react";
import CurrentPageNumber from "~/components/commons/CurrentPageNumber";

describe("components/commons/CurrentPageNumber", () => {
  it("正常に表示される", () => {
    const dummyData = {
      currentPage: 5,
      totalPages: 10,
    };
    const { asFragment } = render(<CurrentPageNumber {...dummyData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
