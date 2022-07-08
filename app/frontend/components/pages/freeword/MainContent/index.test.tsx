import { render, waitFor } from "@testing-library/react";
import mockDataMansions from "~/components/molecules/MansionCard/fixtures/mockMansionData.json";
import { MansionPaginationQuery } from "~/graphql/generated";
import MainContent from "~/components/pages/freeword/MainContent";

describe("components/pages/freeword/List", () => {
  it("正常に表示される", async () => {
    const mockMansions = mockDataMansions as MansionPaginationQuery;
    const searchCondition = {
      wd: "神田町",
    };
    const { asFragment } = render(
      <MainContent
        mansionsData={mockMansions}
        currentPage={mockMansions.mansionPagination.pagination.currentPage}
        totalPages={mockMansions.mansionPagination.pagination.totalPages}
        pathname="ms-library/search/?wd=神田町"
        totalCount={mockMansions.mansionPagination.pagination.totalCount}
        searchCondition={searchCondition}
      />
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
