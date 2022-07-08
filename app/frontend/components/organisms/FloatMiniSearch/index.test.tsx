import { render } from "@testing-library/react";
import FloatMiniSearch from "~/components/organisms/FloatMiniSearch";

describe("components/pages/commons/SearchComponents/Float", () => {
  it("正常に表示される", () => {
    const currentMainSearchCondition = ["東海道線/横浜"];
    const searchCondition = {
      st: "1324",
      md: "0101",
      prb: 70000000,
      prt: 80000000,
    };
    const { asFragment } = render(
      <FloatMiniSearch
        page={"stations"}
        ct={[""]}
        currentMainSearchCondition={currentMainSearchCondition}
        searchCondition={searchCondition}
        setSelectState={() => {
          return;
        }}
        setCityState={() => {
          return;
        }}
        setTownState={() => {
          return;
        }}
        setLineState={() => {
          return;
        }}
        setStationState={() => {
          return;
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
