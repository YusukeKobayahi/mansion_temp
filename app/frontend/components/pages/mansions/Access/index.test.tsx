import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import Access from ".";

describe("components/pages/mansions/Access", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<Access data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
