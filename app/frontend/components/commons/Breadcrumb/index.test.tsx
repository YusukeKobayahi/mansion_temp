import { render } from "@testing-library/react";
import Breadcrumb from "~/components/commons/Breadcrumb";

describe("components/commons/Breadcrumb", () => {
  const breadcrumbs = [
    {
      name: "マンションライブラリー",
      path: "/ms-library/",
    },
    {
      name: "東京都",
      path: "/prefectures/[jisCode]",
      asLink: "/ms-library/prefectures/13000/",
    },
  ];

  it("正常に表示される", () => {
    const { asFragment } = render(<Breadcrumb breadcrumbs={breadcrumbs} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
