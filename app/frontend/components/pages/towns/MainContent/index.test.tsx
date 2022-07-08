import { render, waitFor } from "@testing-library/react";
import mockData from "~/components/pages/towns/fixtures/mockData.json";
import mockDataMansions from "~/components/molecules/MansionCard/fixtures/mockMansionData.json";
import { TownsQuery, MansionPaginationQuery } from "~/graphql/generated";
import MainContent from "~/components/pages/towns/MainContent";

describe("components/pages/stations/MainContent", () => {
  it("正常に表示される", async () => {
    const mock = mockData as TownsQuery;
    const mockMansions = mockDataMansions as MansionPaginationQuery;
    const searchCondition = {
      tw: "39025",
      gfb: 20,
      gft: 5,
    };
    const { asFragment } = render(
      <MainContent
        data={mock}
        mansionsData={mockMansions}
        currentPage={mockMansions.mansionPagination.pagination.currentPage}
        totalPages={mockMansions.mansionPagination.pagination.totalPages}
        pathname="ms-library/towns/39025/"
        totalCount={mockMansions.mansionPagination.pagination.totalCount}
        searchCondition={searchCondition}
      />
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
