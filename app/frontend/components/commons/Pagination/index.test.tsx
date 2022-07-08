import { render } from "@testing-library/react";
import Pagination from "~/components/commons/Pagination";

describe("components/commons/Pagination", () => {
  it("正常に表示される", () => {
    const dummyData = {
      currentPage: 5,
      totalPages: 10,
      pathname: "/cities/13101/",
    };
    const searchCondition = {};
    const { asFragment } = render(
      <Pagination {...dummyData} searchCondition={searchCondition} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
