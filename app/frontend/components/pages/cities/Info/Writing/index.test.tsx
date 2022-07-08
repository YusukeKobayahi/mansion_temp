import { render } from "@testing-library/react";
import mockData from "~/components/pages/cities/fixtures/mockData.json";
import { CitiesQuery } from "~/graphql/generated";
import CityInfoWrting from "~/components/pages/cities/Info/Writing";

describe("components/pages/cities/Info/Wrting", () => {
  it("正常に表示される", () => {
    const mock = (mockData as unknown) as CitiesQuery;
    const { asFragment } = render(<CityInfoWrting data={mock.cities[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
