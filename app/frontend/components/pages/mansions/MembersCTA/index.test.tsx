import { render } from "@testing-library/react";
import MembersCTA from "~/components/pages/mansions/MembersCTA";

describe("components/pages/mansions/MembersCTA", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <MembersCTA mansionName="プラネスーペリア南行徳" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
