import { render } from "@testing-library/react";
import IncludedCity from "~/components/pages/stations/IncludedCity";

describe("components/pages/stations/IncludedCity", () => {
  it("正常に表示される", () => {
    const dummyData = {
      station: "横浜",
      name: "横浜市西区",
      jisCode: "14103",
      mansionCount: 94,
    };
    const { asFragment } = render(<IncludedCity {...dummyData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
