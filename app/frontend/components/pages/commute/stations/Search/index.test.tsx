import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { CommuteStationsQuery } from "~/graphql/generated";
import { ButtonRadiusProps } from "~/components/commons/ButtonRadius";
import Search from ".";

describe("components/pages/commute/stations/Search", () => {
  const mock = (mockData as unknown) as CommuteStationsQuery;
  const station = mock.station;
  const searchCondition = { st: "1322" };
  const buttonRadius: Pick<ButtonRadiusProps, "onClick" | "disabled"> = {
    disabled: false,
    onClick: () => {
      return;
    },
  };
  it("正常に表示される", () => {
    const { asFragment } = render(
      <Search
        station={station}
        searchCondition={searchCondition}
        buttonRadius={buttonRadius}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
