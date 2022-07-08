import { render } from "@testing-library/react";
import { ComponentProps } from "react";
import Link from ".";

describe("components/commons/Link", () => {
  it("正常に表示される", () => {
    const props: ComponentProps<typeof Link> = {
      linkProps: { href: "/cities/13101" },
      text: "千代田区",
      subText: "(127)",
    };
    const { asFragment } = render(<Link {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
