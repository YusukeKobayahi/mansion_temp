import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { CommuteStationsQuery } from "~/graphql/generated";
import Menu from ".";

describe("components/pages/commute/stations/Menu", () => {
  const mock = (mockData as unknown) as CommuteStationsQuery;
  const station = mock.station;
  const stationToStations = station.stationToStations!;

  it("正常に表示される", () => {
    const { asFragment } = render(
      <Menu
        checkbox={<button>button1</button>}
        buttonRadius={<button>button2</button>}
        sortBox={<button>button3</button>}
        hitCount={stationToStations.length}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
