/**
 * @jest-environment node
 */

import MetaText from "./metaText";
import { QueryVariables } from "~/lib/types";

describe("#class MetaText", () => {
  describe("#getBasicTitle", () => {
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

    it("引数を全て渡した場合、正しいテキストが返される(conditionからは gfb, gft, utbのみが表示される)", () => {
      const metaText = new MetaText({
        subject: "丸々市",
        prefecture: { name: "東京都" },
        conditions,
      });
      expect(metaText.getBasicTitle()).toBe(
        "丸々市(大規模マンション、タワーマンション、低層マンション)の中古マンションを探す｜中古マンション購入・売却ならHousii"
      );
    });
  });
  describe("#getBasicDescription", () => {
    const conditions: QueryVariables = {
      ckt: 30,
      eat: 100,
      gft: 5, //低層マンション(5階以下)
    };
    it("引数を全て渡した場合、正しいテキストが返される", () => {
      const metaText = new MetaText({
        subject: "丸々市",
        prefecture: { name: "東京都" },
        conditions,
      });
      expect(metaText.getBasicDescription()).toBe(
        "【丸々市(東京都)(築年数30年以下、100m2未満、低層マンション)】の中古マンション一覧です。Housii（ハウシー）では【丸々市】のプレミアム中古マンションの売却・相場情報、価格推移、周辺環境とマンション情報が満載。都心・アクセスが良い・きれい・人気の高いプレミアム購入中古マンションを探すならHousii（ハウシー）におまかせ。"
      );
    });
    it("引数 prefectureのみを渡さなかった場合、prefecture以外のテキストが正しく返される", () => {
      const metaText = new MetaText({
        subject: "丸々市",
        conditions,
      });
      expect(metaText.getBasicDescription()).toBe(
        "【丸々市(築年数30年以下、100m2未満、低層マンション)】の中古マンション一覧です。Housii（ハウシー）では【丸々市】のプレミアム中古マンションの売却・相場情報、価格推移、周辺環境とマンション情報が満載。都心・アクセスが良い・きれい・人気の高いプレミアム購入中古マンションを探すならHousii（ハウシー）におまかせ。"
      );
    });
  });
});
