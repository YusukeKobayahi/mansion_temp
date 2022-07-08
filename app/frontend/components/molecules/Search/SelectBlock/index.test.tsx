import { render } from "@testing-library/react";
import SelectBlock from ".";

describe("components/molecules/Search/SelectBlock", () => {
  const select = (
    <select>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  );
  it("正常に表示される", () => {
    const { asFragment } = render(
      <SelectBlock labelText={"徒歩"} unitText={"分"}>
        {select}
      </SelectBlock>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
