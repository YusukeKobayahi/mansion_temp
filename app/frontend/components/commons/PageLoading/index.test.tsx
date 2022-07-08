import { render } from "@testing-library/react";
import PageLoading from "../PageLoading";

describe("components/commons/PageLoading", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(<PageLoading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
