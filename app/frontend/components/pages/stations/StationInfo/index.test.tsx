import { render } from "@testing-library/react";
import { ComponentProps } from "react";
import StationInfo from ".";

describe("components/pages/cities/StationInfo", () => {
  it("正常に表示される", () => {
    const props: ComponentProps<typeof StationInfo> = {
      title: "駅の情報",
      commuteStations: [
        {
          startStation: {
            id: "2002",
            name: "大井",
          },
        },
      ],
    };
    const { asFragment } = render(<StationInfo {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
