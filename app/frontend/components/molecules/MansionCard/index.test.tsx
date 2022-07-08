import { render } from "@testing-library/react";
import MansionCard from ".";

describe("components/commons/MansionCard", () => {
  it("正常に表示される", () => {
    const mansion = {
      uniqueCode: "868b97434821477f8dbe33b5",
      name: "レーベンリヴァーレエイセスモバード",
      age: 10,
      constructedIn: "2012-03-01",
      unitAmount: 86,
      prefecture: {
        name: "神奈川県",
      },
      city: {
        name: "鎌倉市",
      },
      town: {
        name: "台",
      },
      street: {
        name: "５丁目",
      },
      blockNumber: "３－４",
      display: {
        minPrice: 30800000,
        maxPrice: 39800000,
        minExclusiveArea: 66.72,
        maxExclusiveArea: 80.47,
        layoutName: "2SLDK、3LDK",
      },
      access: [
        {
          id: "18",
          stationId: 8030,
          stationLineName: "東海道線",
          stationName: "大船",
          stationWalkingMinutes: 15,
          lineId: 427,
        },
      ],
      salesHistorySummaries: [
        {
          layout: "1LDK",
          numberOfRooms: 1,
          layoutKind: {
            slug: "ldk",
            sort: 7,
          },
          exclusiveAreas: [55.04, 59.42],
        },
      ],
    };
    const subjectNames = ["東海道線"];
    const { asFragment } = render(
      <MansionCard {...mansion} subjectNames={subjectNames} writing={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
