import { render } from "@testing-library/react";
import ConditionalWrapper from "~/components/commons/ConditionalWrapper";

describe("components/commons/ConditionalWrapper", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <ConditionalWrapper
        condition={true}
        wrapper={(children) => <button>{children}</button>}
      >
        ボタン
      </ConditionalWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
