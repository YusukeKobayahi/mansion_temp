import { render } from "@testing-library/react";
import mockData from "~/components/pages/lines/fixtures/mockData.json";
import { LinesQuery } from "~/graphql/generated";
import PassedCities from "~/components/pages/lines/PassedCities";

describe("components/pages/lines/PassedCities", () => {
  it("正常に表示される", () => {
    const mock = mockData as LinesQuery;
    const { asFragment } = render(<PassedCities data={mock.lines[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
