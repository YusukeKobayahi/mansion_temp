import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import FloatCTA from "~/components/pages/mansions/FloatCTA";

describe("components/pages/mansions/FloatCTA", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<FloatCTA data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
