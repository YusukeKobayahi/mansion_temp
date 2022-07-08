import { render } from "@testing-library/react";
import mockData from "~/components/pages/index/fixtures/mockData.json";
import { IndexQuery } from "~/graphql/generated";
import Fv from "~/components/pages/index/Fv";
import ToggleContextProvider from "~/components/Context/ToggleContext";
import SearchConditionContextProvider from "~/components/Context/SearchConditionContext";

describe("components/pages/index/Fv", () => {
  it("正常に表示される", () => {
    const mock = mockData as IndexQuery;
    const breadcrumbs = [
      {
        name: "Housiiトップ",
        path: "https://ieul.jp/buy/",
      },
      {
        name: "マンションライブラリー",
        path: "/ms-library/",
      },
    ];

    const { asFragment } = render(
      <SearchConditionContextProvider searchCondition={{}}>
        <ToggleContextProvider>
          <Fv
            data={mock.prefectures}
            breadcrumbs={breadcrumbs}
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
