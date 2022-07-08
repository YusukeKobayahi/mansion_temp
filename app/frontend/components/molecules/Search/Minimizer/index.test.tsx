import { render } from "@testing-library/react";
import Minimizer from ".";

describe("components/molecules/Search/Minimizer", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <Minimizer
        setIsOpen={() => {
          return;
        }}
        isOpen={true}
      >
        <button>Minimized button</button>
      </Minimizer>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
