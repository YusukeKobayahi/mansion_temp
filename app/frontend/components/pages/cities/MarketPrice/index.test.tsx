import { render } from "@testing-library/react";
import mockData from "~/components/pages/cities/fixtures/mockData.json";
import { CitiesQuery } from "~/graphql/generated";
import MarketPrice from "~/components/pages/cities/MarketPrice";

describe("components/pages/cities/MarketPrice", () => {
  it("正常に表示される", () => {
    const mock = (mockData as unknown) as CitiesQuery;
    const { asFragment } = render(<MarketPrice data={mock.cities[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
