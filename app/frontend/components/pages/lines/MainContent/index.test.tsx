import { render, waitFor } from "@testing-library/react";
import mockData from "~/components/pages/lines/fixtures/mockData.json";
import mockDataMansions from "~/components/molecules/MansionCard/fixtures/mockMansionData.json";
import { LinesQuery, MansionPaginationQuery } from "~/graphql/generated";
import MainContent from "~/components/pages/lines/MainContent";

describe("components/pages/lines/MainContent", () => {
  it("正常に表示される", async () => {
    const mock = mockData as LinesQuery;
    const mockMansions = mockDataMansions as MansionPaginationQuery;
    const searchCondition = {
      ln: "62,102",
      md: "0205",
      prb: 30000000,
      prt: 40000000,
    };
    const { asFragment } = render(
      <MainContent
        data={mock}
        mansionsData={mockMansions}
        currentPage={mockMansions.mansionPagination.pagination.currentPage}
        totalPages={mockMansions.mansionPagination.pagination.totalPages}
        pathname="ms-library/lines/1324/"
        totalCount={mockMansions.mansionPagination.pagination.totalCount}
        searchCondition={searchCondition}
      />
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
