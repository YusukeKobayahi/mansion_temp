/**
 * @jest-environment node
 */

import { QueryVariables } from "~/lib/types";
import {
  isSSR,
  buildLibraryPagePath,
  yenFormat,
  getConditionText,
} from "./utils";

describe("#isSSR", () => {
  it("SSRのとき、true", () => {
    expect(isSSR()).toBe(true);
  });
});

describe("#buildLibraryPagePath", () => {
  describe("引数がない場合", () => {
    it("トップページのパスが返ってくる", () => {
      expect(buildLibraryPagePath()).toBe("/");
    });
  });

  describe("引数がある場合", () => {
    it("引数で指定したページのパスが返ってくる", () => {
      expect(buildLibraryPagePath("mansions", "1234567890")).toBe(
        "/mansions/1234567890/"
      );
    });
  });
});

describe("#yenFormat", () => {
  it("20000000を指定した場合", () => {
    expect(yenFormat(20000000)).toBe("2,000万円");
  });

  it("120000000を指定した場合", () => {
    expect(yenFormat(120000000)).toBe("1億2,000万円");
  });
});

describe("#getConditionText", () => {
  it("検索条件がある場合、正しくテキストが返される", () => {
    const conditions: QueryVariables = {
      md: "0302",
      ckt: 30,
      eab: 40,
      eat: 100,
      prb: 20000000,
      prt: 50000000,
      utb: 100, //大規模マンション(100戸以上)
      gfb: 20, //タワーマンション(20階建以上)
      gft: 5, //低層マンション(5階以下)
    };
    expect(getConditionText({ conditions })).toBe(
      "3K、築年数30年以下、40m2以上、100m2未満、2000万円以上、5000万円未満、大規模マンション、タワーマンション、低層マンション"
    );
  });

  it("検索条件がない場合、空文字が返される", () => {
    const conditions: QueryVariables = {};
    expect(getConditionText({ conditions })).toBe("");
  });

  it("検索条件の価格がちょうど1千万円差の場合、「〇〇台」と表示される", () => {
    const conditions: QueryVariables = {
      prb: 20000000,
      prt: 30000000,
    };
    expect(getConditionText({ conditions })).toBe("2,000万円台");
  });

  it("検索条件が一つの場合、末尾に「、」が表示されない", () => {
    const conditions: QueryVariables = {
      md: "0302",
    };
    expect(getConditionText({ conditions })).toBe("3K");
  });

  it("検索条件にutb, gft, gfbがある場合、()の文字列が含まれていない。", () => {
    const conditions: QueryVariables = {
      utb: 100, //大規模マンション(100戸以上)
      gfb: 20, //タワーマンション(20階建以上)
      gft: 5, //低層マンション(5階以下)
    };
    expect(getConditionText({ conditions })).toBe(
      "大規模マンション、タワーマンション、低層マンション"
    );
  });

  it("引数 conditionFilterを指定した場合、指定した検索条件のみのテキストが返される", () => {
    const conditions: QueryVariables = {
      md: "0302",
      ckt: 30,
      eab: 40,
      eat: 100,
      prb: 20000000,
      prt: 50000000,
    };
    expect(
      getConditionText({
        conditions,
        conditionFilter: ["ckt", "prt"],
      })
    ).toBe("築年数30年以下、5000万円未満");
  });

  it("引数 conditionFilterに空の配列を指定した場合、無視され、正しいテキストが返される", () => {
    const conditions: QueryVariables = {
      md: "0302",
      ckt: 30,
      eab: 40,
      eat: 100,
      prb: 20000000,
      prt: 50000000,
    };
    expect(
      getConditionText({
        conditions,
        conditionFilter: [],
      })
    ).toBe(
      "3K、築年数30年以下、40m2以上、100m2未満、2000万円以上、5000万円未満"
    );
  });
});
