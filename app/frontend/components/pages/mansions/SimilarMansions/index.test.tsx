import { render } from "@testing-library/react";
import mockData from "~/components/pages/mansions/fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import SimilarMansions from "~/components/pages/mansions/SimilarMansions";

describe("components/pages/mansions/SimilarMansions", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<SimilarMansions data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
