import { render } from "@testing-library/react";
import mockData from "~/components/pages/index/fixtures/mockData.json";
import { IndexQuery } from "~/graphql/generated";
import Prefectures from "~/components/pages/index/Fv/Prefectures";

describe("components/pages/index/Fv/Prefectures", () => {
  it("正常に表示される", () => {
    const mock = mockData as IndexQuery;
    const { asFragment } = render(<Prefectures data={mock.prefectures} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
