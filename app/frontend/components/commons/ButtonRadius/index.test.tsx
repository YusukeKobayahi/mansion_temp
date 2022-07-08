import { render } from "@testing-library/react";
import ButtonRadius from "~/components/commons/ButtonRadius";

describe("components/commons/ButtonRadius", () => {
  const text = "選択した駅一覧";
  const size = "sm";
  it("正常に表示される", () => {
    const { asFragment } = render(<ButtonRadius text={text} size={size} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
