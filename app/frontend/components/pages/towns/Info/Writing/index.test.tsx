import { render } from "@testing-library/react";
import mockData from "~/components/pages/towns/fixtures/mockData.json";
import { TownsQuery } from "~/graphql/generated";
import TownInfoWriting from "~/components/pages/towns/Info/Writing";

describe("components/pages/towns/Info/Wrting", () => {
  it("正常に表示される", () => {
    const mock = mockData as TownsQuery;
    const { asFragment } = render(<TownInfoWriting data={mock.towns[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
