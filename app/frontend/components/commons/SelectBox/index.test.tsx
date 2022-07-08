import { render } from "@testing-library/react";
import SelectBox from "~/components/commons/SelectBox";

describe("components/commons/SelectBox", () => {
  const options = [10, 20, 30].map((num) => {
    return {
      value: String(num),
      text: String(num),
    };
  });
  it("正常に表示される", () => {
    const { asFragment } = render(
      <SelectBox options={options} defaultValue={""} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
