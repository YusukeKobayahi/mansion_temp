import { render } from "@testing-library/react";
import mockData from "~/components/pages/prefectures/fixtures/mockData.json";
import { PrefectureQuery } from "~/graphql/generated";
import Cities from "~/components/pages/prefectures/Cities";

describe("components/pages/prefectures/Cities", () => {
  it("正常に表示される", () => {
    const mock = mockData as PrefectureQuery;
    const { asFragment } = render(<Cities data={mock.prefecture} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
