import { render } from "@testing-library/react";
import BasicBlock from ".";

describe("components/molecules/Search/BasicBlock", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <BasicBlock>
        <button>button</button>
      </BasicBlock>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
