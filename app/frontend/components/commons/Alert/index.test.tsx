import { render } from "@testing-library/react";
import Alert from ".";

describe("components/commons/Alert", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <Alert
        text="条件に合う物件がありません。条件を変更して再度検索してください。"
        outline={true}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
