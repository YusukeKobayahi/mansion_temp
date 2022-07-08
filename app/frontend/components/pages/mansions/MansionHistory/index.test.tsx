import { render } from "@testing-library/react";
import mockData from "~/components/pages/mansions/fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import MansionHistory from "~/components/pages/mansions/MansionHistory";

describe("components/pages/mansions/MansionHistory", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<MansionHistory data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
