import { render } from "@testing-library/react";
import Popup from "~/components/commons/Popup";

describe("components/pages/cities/Popup", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<Popup isPopup={true} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
