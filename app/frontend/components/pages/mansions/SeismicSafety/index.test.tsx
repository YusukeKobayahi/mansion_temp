import { render } from "@testing-library/react";
import mockData from "../fixtures/mockData.json";
import { MansionQuery } from "~/graphql/generated";
import SeismicSafety from ".";

describe("components/pages/mansions/SeismicSafety", () => {
  it("正常に表示される", () => {
    const mock = mockData as MansionQuery;
    const { asFragment } = render(<SeismicSafety data={mock.mansion} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("築年月が1983年5月以前だったら何も表示されない", () => {
    const data = {
      name: "ガーラ・レジデンス三鷹シャインパークス",
      age: 37,
      constructedIn: "1983-05-31",
      structure: {
        name: "鉄骨造(S造)",
        slug: "steel",
      },
    };
    const { asFragment } = render(<SeismicSafety data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("築年月が1983年6月以降だったら表示される", () => {
    const data = {
      name: "ガーラ・レジデンス三鷹シャインパークス",
      age: 37,
      constructedIn: "1983-06-01",
      structure: {
        name: "鉄骨造(S造)",
        slug: "steel",
      },
    };
    const { asFragment } = render(<SeismicSafety data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
