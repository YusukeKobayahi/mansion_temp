import { render } from "@testing-library/react";
import mockData from "~/components/pages/mansions/fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import CitySummary from "~/components/pages/mansions/CitySummary";

describe("components/pages/mansions/CitySummary", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<CitySummary data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
