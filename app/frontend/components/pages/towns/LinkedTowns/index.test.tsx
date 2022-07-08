import { render } from "@testing-library/react";
import mockData from "~/components/pages/towns/fixtures/mockData.json";
import { TownsQuery } from "~/graphql/generated";
import LinkedTowns from "~/components/pages/towns/LinkedTowns";

describe("components/pages/towns/LinkedTowns", () => {
  it("正常に表示される", () => {
    const mock = mockData as TownsQuery;
    const { asFragment } = render(<LinkedTowns data={mock.towns[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
