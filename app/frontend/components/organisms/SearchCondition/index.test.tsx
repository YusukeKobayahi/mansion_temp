import { render } from "@testing-library/react";
import SearchCondition from ".";
import ToggleContextProvider from "~/components/Context/ToggleContext";
import SearchConditionContextProvider from "~/components/Context/SearchConditionContext";

describe("components/molecules/SearchComponents/SearchCondition", () => {
  it("正常に表示される", () => {
    const page = "stations";
    const currentMainSearchCondition = ["東海道線/横浜"];
    const searchCondition = {
      st: "1324",
      md: "0101",
      prb: 70000000,
      prt: 80000000,
    };
    const { asFragment } = render(
      <SearchConditionContextProvider searchCondition={searchCondition}>
        <ToggleContextProvider>
          <SearchCondition
            page={page}
            currentMainSearchCondition={currentMainSearchCondition}
            searchCondition={searchCondition}
            setTab={() => {
              return;
            }}
          />
        </ToggleContextProvider>
      </SearchConditionContextProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
