import { render } from "@testing-library/react";
import mockData from "~/components/pages/towns/fixtures/mockData.json";
import { TownsQuery } from "~/graphql/generated";
import MarketPrice from "~/components/pages/towns/MarketPrice";

describe("components/pages/towns/MarketPrice", () => {
  it("正常に表示される", () => {
    const mock = mockData as TownsQuery;
    const { asFragment } = render(<MarketPrice data={mock.towns[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
