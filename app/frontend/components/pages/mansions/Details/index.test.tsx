import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import Details from ".";

describe("components/pages/mansions/Details", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<Details data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
