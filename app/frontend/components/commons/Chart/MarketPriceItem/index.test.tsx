import { render } from "@testing-library/react";
import mockData from "~/components/pages/mansions/fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import MarketPriceItem from "~/components/commons/Chart/MarketPriceItem";

describe("components/commons/Chart/MarketPriceItem", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const salePricePerSquare = mock.mansion.priceHubble.salePricePerSquare.map(
      (o) => {
        return {
          date: o.date,
          building: Number(o.building),
          town: Number(o.town),
          city: Number(o.city),
          prefecture: Number(o.prefecture),
          station: Number(o.station),
        };
      }
    );
    const salePricePerTsubo = mock.mansion.priceHubble.salePricePerTsubo.map(
      (o) => {
        return {
          date: o.date,
          building: Number(o.building),
          town: Number(o.town),
          city: Number(o.city),
          prefecture: Number(o.prefecture),
          station: Number(o.station),
        };
      }
    );
    const dummyData = {
      mainKey: "town",
      name: "東京都新宿区西新宿",
      salePricePerSquare: salePricePerSquare,
      salePricePerTsubo: salePricePerTsubo,
      targetListItems: [
        {
          name: "ＡＸＡＳ西新宿",
          key: "building",
          color: "#B2A173",
        },
        {
          name: "東京都新宿区西新宿",
          key: "town",
          color: "#746744",
        },
        {
          name: "東京都新宿区",
          key: "city",
          color: "#686D87",
        },
        {
          name: "東京都",
          key: "prefecture",
          color: "#505050",
        },
        {
          name: "西新宿五丁目駅",
          key: "station",
          color: "#9D9990",
        },
      ],
      defaultDiisplayKeyList: [
        "building",
        "town",
        "city",
        "prefecture",
        "station",
      ],
    };
    const { asFragment } = render(<MarketPriceItem {...dummyData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
