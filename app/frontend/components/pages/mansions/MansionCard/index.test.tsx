import { render } from "@testing-library/react";
import MansionCard from "~/components/pages/mansions/MansionCard";

describe("components/pages/mansions/MansionSlider/MansionCard", () => {
  it("正常に表示される", () => {
    const dummyData = {
      salesInfo: [{ info: "1000万円 ~ 1億円" }],
      href: "http://dummy.ieul.jp/ms-library/mansions/some-id",
      name: "テストマンション",
      constructedDate: "2013年05月 (築7年)",
      address: "テストアドレス",
    };
    const { asFragment } = render(<MansionCard {...dummyData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
