import { render } from "@testing-library/react";
import mockData from "~/components/pages/towns/fixtures/mockData.json";
import { TownsQuery } from "~/graphql/generated";
import IndexedTowns from "~/components/pages/towns/IndexedTowns";

describe("components/pages/cities/IndexedTowns", () => {
  it("正常に表示される", () => {
    const mock = mockData as TownsQuery;
    const { asFragment } = render(<IndexedTowns data={mock.towns[0].city} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
