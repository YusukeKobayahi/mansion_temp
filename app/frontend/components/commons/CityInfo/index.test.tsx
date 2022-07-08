import { render } from "@testing-library/react";
import mockData from "~/components/pages/mansions/fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import CityInfo from "~/components/commons/CityInfo";

describe("components/commons/CityInfo", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<CityInfo data={mock.mansion.city} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
