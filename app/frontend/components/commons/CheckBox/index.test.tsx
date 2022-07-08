import { render } from "@testing-library/react";
import CheckBox from "~/components/commons/CheckBox";

describe("components/commons/CheckBox", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<CheckBox checked={false} value={"value"} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
