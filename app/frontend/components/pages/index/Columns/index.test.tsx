import { render } from "@testing-library/react";
import mockData from "~/components/pages/index/fixtures/mockData.json";
import { IndexQuery } from "~/graphql/generated";
import Columns from "~/components/pages/index/Columns";

describe("components/pages/index/Columns", () => {
  it("正常に表示される", () => {
    const mock = mockData as IndexQuery;
    const { asFragment } = render(<Columns data={mock.prefectures} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
