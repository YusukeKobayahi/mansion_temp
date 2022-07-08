import { render } from "@testing-library/react";
import mockData from "~/components/pages/towns/fixtures/mockData.json";
import { TownsQuery } from "~/graphql/generated";
import LinkedBuildings from "~/components/pages/towns/LinkedBuildings";

describe("components/pages/cities/LinkedBuildings", () => {
  it("正常に表示される", () => {
    const mock = mockData as TownsQuery;
    const { asFragment } = render(<LinkedBuildings data={mock.towns[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
