import { render, waitFor } from "@testing-library/react";
import mockData from "~/components/pages/stations/fixtures/mockData.json";
import mockDataMansions from "~/components/molecules/MansionCard/fixtures/mockMansionData.json";
import { StationsQuery, MansionPaginationQuery } from "~/graphql/generated";
import MainContent from "~/components/pages/stations/MainContent";

describe("components/pages/stations/MainContent", () => {
  it("正常に表示される", async () => {
    const mock = mockData as StationsQuery;
    const mockMansions = mockDataMansions as MansionPaginationQuery;
    const searchCondition = {
      st: "1324",
      gfb: 20,
      gft: 5,
    };
    const { asFragment } = render(
      <MainContent
        data={mock}
        mansionsData={mockMansions}
        currentPage={mockMansions.mansionPagination.pagination.currentPage}
        totalPages={mockMansions.mansionPagination.pagination.totalPages}
        pathname="ms-library/stations/1324/"
        totalCount={mockMansions.mansionPagination.pagination.totalCount}
        searchCondition={searchCondition}
      />
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
