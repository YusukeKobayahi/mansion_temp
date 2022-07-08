import { render } from "@testing-library/react";
import Container from ".";

describe("components/molecules/Search/Container", () => {
  it("正常に表示される", () => {
    const { asFragment } = render(
      <Container
        setIsOpen={() => {
          return;
        }}
        isOpen={true}
      >
        <span>button</span>
      </Container>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
