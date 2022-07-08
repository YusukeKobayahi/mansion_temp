import { render } from "@testing-library/react";
import mockData from "~/components/pages/towns/fixtures/mockData.json";
import { TownsQuery } from "~/graphql/generated";
import LinkedStations from "~/components/pages/towns/LinkedStations";

describe("components/pages/towns/LinkedStations", () => {
  it("正常に表示される", () => {
    const mock = mockData as TownsQuery;
    const { asFragment } = render(<LinkedStations data={mock.towns[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
