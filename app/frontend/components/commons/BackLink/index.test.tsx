import { render } from "@testing-library/react";
import BackLink from ".";

describe("~/components/commons/BackLink", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <BackLink name={"千代田区"} page={"cities"} id={"13101"} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
