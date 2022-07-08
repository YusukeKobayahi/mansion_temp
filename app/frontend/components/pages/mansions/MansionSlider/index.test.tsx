import { render } from "@testing-library/react";
import MansionSlider from "~/components/pages/mansions/MansionSlider";

describe("components/pages/mansions/MansionSlider", () => {
  it("正常に表示される", () => {
    const mansionCards = [
      {
        salesInfo: [{ info: "1000万円 ~ 1億円" }],
        href: "http://dummy.ieul.jp/ms-library/mansions/some-id",
        name: "テストマンション",
        constructedDate: "2013年05月 (築7年)",
        address: "テストアドレス",
      },
      {
        salesInfo: [{ info: "1000万円 ~ 1億円" }],
        href: "http://dummy.ieul.jp/ms-library/mansions/some-id",
        name: "テストマンション",
        constructedDate: "2013年05月 (築7年)",
        address: "テストアドレス",
      },
    ];
    const { asFragment } = render(
      <MansionSlider mansionCards={mansionCards} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
