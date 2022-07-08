import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { CommuteStationsQuery } from "~/graphql/generated";
import Item from ".";

describe("components/pages/commute/stations/Item", () => {
  const mock = (mockData as unknown) as CommuteStationsQuery;

  it("正常に表示される", () => {
    const station = mock.station;
    const stationToStation = station.stationToStations?.[0];
    const { asFragment } = render(
      <Item
        data={stationToStation!}
        st={["1321", "7655"]}
        setSt={() => {
          return;
        }}
        fromStation={station}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
