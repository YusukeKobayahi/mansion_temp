import { screen, render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import SalesHistories from ".";

describe("components/pages/mansions/SalesHistories", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(
      <SalesHistories data={mock.mansion} hasHistoryNextPage={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("floorNumberがnullの場合に「null」という文字が表示されない", () => {
    const mock = mockData as MansionQuery;
    const firstHistory = mock.mansion.salesHistories.edges?.[0]?.node;
    if (!firstHistory) {
      throw "Invalid mockData";
    }
    firstHistory.floorNumber = null;

    render(<SalesHistories data={mock.mansion} hasHistoryNextPage={true} />);
    expect(screen.queryAllByText(/null/)).toHaveLength(0);
  });
});
