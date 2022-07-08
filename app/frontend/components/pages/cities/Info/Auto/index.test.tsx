import { render } from "@testing-library/react";
import mockData from "~/components/pages/cities/fixtures/mockData.json";
import { CitiesQuery } from "~/graphql/generated";
import CityInfoAuto from "~/components/pages/cities/Info/Auto";

describe("components/pages/cities/Info/Auto", () => {
  it("正常に表示される", () => {
    const mock = (mockData as unknown) as CitiesQuery;
    const { asFragment } = render(
      <CityInfoAuto
        data={mock.cities[0]}
        citiesLength={mock.cities[0].prefecture.cities.length}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
