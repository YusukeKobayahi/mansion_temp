import { render } from "@testing-library/react";
import mockData from "~/components/pages/schools/fixtures/mockData.json";
import { PrimarySchoolsQuery } from "~/graphql/generated";
import OtherSchools from ".";

describe("components/pages/schools/OtherSchools", () => {
  it("正常に表示される", () => {
    const mock = mockData as PrimarySchoolsQuery;
    const dummyData = {
      data: mock.primarySchools[0],
      schoolName: "笄小学校",
    };
    const { asFragment } = render(<OtherSchools {...dummyData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
