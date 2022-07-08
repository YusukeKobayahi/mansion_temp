import { render } from "@testing-library/react";
import mockData from "~/components/pages/lines/fixtures/mockData.json";
import Writing from ".";

describe("components/pages/lines/Writing", () => {
  it("正常に表示される", () => {
    const mock = mockData;
    const { asFragment } = render(<Writing {...mock.lines[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
