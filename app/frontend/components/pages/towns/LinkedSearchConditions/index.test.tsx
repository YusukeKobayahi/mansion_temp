import { render } from "@testing-library/react";
import mockData from "~/components/pages/towns/fixtures/mockData.json";
import { TownsQuery } from "~/graphql/generated";
import LinkedSearchConditions from ".";

describe("components/pages/cities/LinkedSearchConditions", () => {
  it("正常に表示される", () => {
    const mock = mockData as TownsQuery;
    const pathname = "/ms-library/towns/38774/";
    const { asFragment } = render(
      <LinkedSearchConditions data={mock.towns[0]} pathname={pathname} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
