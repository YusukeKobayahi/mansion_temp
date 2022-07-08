import { render } from "@testing-library/react";
import mockData from "~/components/pages/cities/fixtures/mockData.json";
import { CitiesQuery } from "~/graphql/generated";
import NeighborCities from "~/components/pages/cities/NeighborCities";

describe("components/pages/cities/NeighborCities", () => {
  it("正常に表示される", () => {
    const mock = (mockData as unknown) as CitiesQuery;
    const { asFragment } = render(<NeighborCities data={mock.cities[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
