import { render } from "@testing-library/react";
import ShowMoreBtn from "../ShowMoreBtn";

describe("components/commons/ShowMoreBtn", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <ShowMoreBtn onClick={() => null} isLoading={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("ローディング中はスピナーが表示される", () => {
    const { asFragment } = render(
      <ShowMoreBtn onClick={() => null} isLoading={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
