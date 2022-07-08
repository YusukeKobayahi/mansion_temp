import { render } from "@testing-library/react";
import MiniSearch from ".";
import ToggleContextProvider from "~/components/Context/ToggleContext";
import SearchConditionContextProvider from "~/components/Context/SearchConditionContext";

describe("components/organisms/MiniSearch", () => {
  it("正常に表示される", () => {
    const searchCondition = {
      st: "1324",
      md: "0101",
      prb: 70000000,
      prt: 80000000,
    };
    const { asFragment } = render(
      <SearchConditionContextProvider searchCondition={searchCondition}>
        <ToggleContextProvider>
          <MiniSearch
            page={"cities"}
            currentMainSearchCondition={"千代田区"}
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
