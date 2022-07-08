import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import SalesSummary from ".";

describe("components/pages/mansions/SalesSummary", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<SalesSummary data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
