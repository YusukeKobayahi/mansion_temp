import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { CommuteStationsQuery } from "~/graphql/generated";
import BaseInfo from ".";

describe("components/pages/commute/stations/BaseInfo", () => {
  const mock = (mockData as unknown) as CommuteStationsQuery;

  it("正常に表示される", () => {
    const { asFragment } = render(<BaseInfo mainText={mock.station.name} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
