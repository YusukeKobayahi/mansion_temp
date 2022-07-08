import { render } from "@testing-library/react";
import mockData from "~/components/pages/cities/fixtures/mockData.json";
import { CitiesQuery } from "~/graphql/generated";
import IncludedStations from ".";

describe("components/pages/cities/IncludedStations", () => {
  it("正常に表示される", () => {
    const mock = (mockData as unknown) as CitiesQuery;
    const { asFragment } = render(<IncludedStations data={mock.cities[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
