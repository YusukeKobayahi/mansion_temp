import { render, waitFor } from "@testing-library/react";
import mockData from "~/components/pages/cities/fixtures/mockData.json";
import mockDataMansions from "~/components/molecules/MansionCard/fixtures/mockMansionData.json";
import { CitiesQuery, MansionPaginationQuery } from "~/graphql/generated";
import MainContent from "~/components/pages/cities/MainContent";

describe("components/pages/cities/MainContent", () => {
  it("正常に表示される", async () => {
    const mock = (mockData as unknown) as CitiesQuery;
    const mockMansions = mockDataMansions as MansionPaginationQuery;
    const searchCondition = {
      tw: "14101",
      gfb: 20,
      gft: 5,
    };
    const { asFragment } = render(
      <MainContent
        data={mock}
        mansionsData={mockMansions}
        currentPage={mockMansions.mansionPagination.pagination.currentPage}
        totalPages={mockMansions.mansionPagination.pagination.totalPages}
        pathname="ms-library/cities/14101/"
        totalCount={mockMansions.mansionPagination.pagination.totalCount}
        searchCondition={searchCondition}
      />
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
