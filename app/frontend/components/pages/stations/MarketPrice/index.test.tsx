import { render } from "@testing-library/react";
import mockData from "~/components/pages/stations/fixtures/mockData.json";
import { StationsQuery } from "~/graphql/generated";
import MarketPrice from "~/components/pages/stations/MarketPrice";

describe("components/pages/stations/MarketPrice", () => {
  it("正常に表示される", () => {
    const mock = mockData as StationsQuery;
    const { asFragment } = render(<MarketPrice data={mock.stations[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
