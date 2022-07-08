import { render } from "@testing-library/react";
import mockData from "~/components/pages/mansions/fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import SchoolReviews from ".";

describe("components/commons/SchoolInfo", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(
      <SchoolReviews data={mock.mansion.primarySchool} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
