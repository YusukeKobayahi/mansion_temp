import { render } from "@testing-library/react";
import mockData from "~/components/pages/stations/fixtures/mockData.json";
import { StationsQuery } from "~/graphql/generated";
import NeighborStations from "~/components/pages/stations/NeighborStations";

describe("components/pages/stations/NeighborStations", () => {
  it("正常に表示される", () => {
    const mock = mockData as StationsQuery;
    const { asFragment } = render(<NeighborStations data={mock.stations[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
