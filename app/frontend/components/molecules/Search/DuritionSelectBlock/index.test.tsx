import { render } from "@testing-library/react";
import DuritoinSelectBlock from ".";

describe("components/pages/commute/stations/Search/DuritionSelectBlock", () => {
  it("正常に表示される", () => {
    // 本来SelectBoxをchildrenとして渡すためのコンポーネントだが、テストでは、SelectBoxの挙動に依存しないためにSelectBoxを渡していない。
    const { asFragment } = render(
      <DuritoinSelectBlock
        labelText={"平均相場"}
        minSelectBox={<button>テスト</button>}
        maxSelectBox={<button>テスト</button>}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
