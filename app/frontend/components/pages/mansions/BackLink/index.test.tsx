import { render } from "@testing-library/react";
import BackLink from "~/components/pages/mansions/BackLink";

describe("components/pages/mansions/BackLink", () => {
  it("正常に表示される", () => {
    const dummyData = {
      jisCode: "13101",
    };
    const { asFragment } = render(<BackLink {...dummyData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
