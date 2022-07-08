import { render } from "@testing-library/react";
import Form from "~/components/templates/Header/Form";

describe("components/commons/Header/Form", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<Form />);
    expect(asFragment()).toMatchSnapshot();
  });
});
