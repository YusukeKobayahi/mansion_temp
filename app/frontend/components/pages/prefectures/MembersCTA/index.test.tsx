import { render } from "@testing-library/react";
import MembersCTA from "~/components/pages/prefectures/MembersCTA";

describe("components/pages/prefectures/MembersCTA", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <MembersCTA position="top" subject="東京都" />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
