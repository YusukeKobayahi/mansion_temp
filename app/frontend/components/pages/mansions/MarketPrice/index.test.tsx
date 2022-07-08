import { render } from "@testing-library/react";
import mockData from "~/components/pages/mansions/fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import MarketPrice from "~/components/pages/mansions/MarketPrice";

describe("components/pages/mansions/MarketPrice", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<MarketPrice data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
