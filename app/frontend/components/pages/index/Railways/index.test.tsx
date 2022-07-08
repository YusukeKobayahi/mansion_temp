import { render } from "@testing-library/react";
import RailWays from "~/components/pages/index/Railways";
import ToggleContextProvider from "~/components/Context/ToggleContext";
import SearchConditionContextProvider from "~/components/Context/SearchConditionContext";

describe("components/pages/index/Railways", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <SearchConditionContextProvider searchCondition={{}}>
        <ToggleContextProvider>
          <RailWays
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
