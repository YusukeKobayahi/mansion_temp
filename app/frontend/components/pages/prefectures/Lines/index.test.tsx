import { render } from "@testing-library/react";
import mockData from "~/components/pages/prefectures/fixtures/mockData.json";
import { PrefectureQuery } from "~/graphql/generated";
import Lines from "~/components/pages/prefectures/Lines";

describe("components/pages/prefectures/Lines", () => {
  it("正常に表示される", () => {
    const mock = mockData as PrefectureQuery;
    const { asFragment } = render(<Lines data={mock.prefecture} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
