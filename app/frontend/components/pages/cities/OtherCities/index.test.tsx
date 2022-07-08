import { render } from "@testing-library/react";
import mockData from "~/components/pages/cities/fixtures/mockData.json";
import { CitiesQuery } from "~/graphql/generated";
import OtherCities from "~/components/pages/cities/OtherCities";

describe("components/pages/cities/OtherCities", () => {
  it("正常に表示される", () => {
    const mock = (mockData as unknown) as CitiesQuery;
    const { asFragment } = render(<OtherCities data={mock.cities[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
