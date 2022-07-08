import { render } from "@testing-library/react";
import FloatCTA from ".";

describe("components/pages/commute/stations/FloatCTA", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <FloatCTA visility={""}>
        <button>会員登録</button>
      </FloatCTA>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
