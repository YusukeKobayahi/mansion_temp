import { render } from "@testing-library/react";
import mockData from "~/components/pages/lines/fixtures/mockData.json";
import { LinesQuery } from "~/graphql/generated";
import MarketPrice from "~/components/pages/lines/MarketPrice";

describe("components/pages/lines/MarketPrice", () => {
  it("正常に表示される", () => {
    const mock = mockData as LinesQuery;
    const { asFragment } = render(<MarketPrice data={mock.lines[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
