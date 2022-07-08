import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import UnitSize from ".";

describe("components/pages/mansions/UnitSize", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<UnitSize data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
