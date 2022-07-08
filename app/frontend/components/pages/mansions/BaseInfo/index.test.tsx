import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import BaseInfo from ".";

describe("components/pages/mansions/BaseInfo", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<BaseInfo data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
