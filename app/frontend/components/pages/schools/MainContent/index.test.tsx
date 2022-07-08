import { render, waitFor } from "@testing-library/react";
import mockData from "~/components/pages/schools/fixtures/mockData.json";
import mockDataMansions from "~/components/molecules/MansionCard/fixtures/mockMansionData.json";
import {
  PrimarySchoolsQuery,
  MansionPaginationQuery,
} from "~/graphql/generated";
import MainContent from "~/components/pages/schools/MainContent";

describe("components/pages/schools/MainContent", () => {
  it("正常に表示される", async () => {
    const mock = mockData as PrimarySchoolsQuery;
    const mockMansions = mockDataMansions as MansionPaginationQuery;
    const searchCondition = {
      psc: "23869",
      gfb: 20,
      gft: 5,
    };
    const { asFragment } = render(
      <MainContent
        data={mock}
        mansionsData={mockMansions}
        currentPage={mockMansions.mansionPagination.pagination.currentPage}
        totalPages={mockMansions.mansionPagination.pagination.totalPages}
        pathname="ms-library/schools/23869/"
        totalCount={mockMansions.mansionPagination.pagination.totalCount}
        searchCondition={searchCondition}
      />
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
