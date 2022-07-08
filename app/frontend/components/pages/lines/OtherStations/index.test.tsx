import { render } from "@testing-library/react";
import mockData from "~/components/pages/lines/fixtures/mockData.json";
import { LinesQuery } from "~/graphql/generated";
import OtherStations from "~/components/pages/lines/OtherStations";

describe("components/pages/lines/OtherStations", () => {
  it("正常に表示される", () => {
    const mock = mockData as LinesQuery;
    const { asFragment } = render(<OtherStations data={mock} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
