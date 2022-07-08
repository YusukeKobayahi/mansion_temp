import { render } from "@testing-library/react";
import ButtonRect from "~/components/commons/ButtonRect";

describe("components/commons/ButtonRect", () => {
  const text = "検索する";
  it("正常に表示される", () => {
    const { asFragment } = render(<ButtonRect text={text} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
