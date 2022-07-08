import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import SalesCTA from ".";

describe("components/pages/mansions/SalesCTA", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<SalesCTA data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
