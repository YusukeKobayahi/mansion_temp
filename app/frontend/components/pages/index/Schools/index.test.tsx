import { render } from "@testing-library/react";
import Schools from "~/components/pages/index/Schools";
import ToggleContextProvider from "~/components/Context/ToggleContext";
import SearchConditionContextProvider from "~/components/Context/SearchConditionContext";

describe("components/pages/index/Schools", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <SearchConditionContextProvider searchCondition={{}}>
        <ToggleContextProvider>
          <Schools
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
