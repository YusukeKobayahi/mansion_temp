/**
 * @jest-environment node
 */
import SalesSummaryBuilder from "./SalesSummaryBuilder";

describe("SalesSummaryBuilder", () => {
  const dummySummaries = [
    {
      layout: "1SLDK",
      minPrice: 89800000,
      maxPrice: 228000000,
      minExclusiveArea: 62.04,
      maxExclusiveArea: 108.11,
    },
    {
      layout: "2LDK",
      minPrice: 78000000,
      maxPrice: 430000000,
      minExclusiveArea: 59.83,
      maxExclusiveArea: 159.42,
    },
  ];

  const builder = new SalesSummaryBuilder(dummySummaries);

  describe("#totalMinPrice", () => {
    it("最小のPriceを取得する", () => {
      expect(builder.totalMinPrice).toBe(78000000);
    });
  });

  describe("#totalMaxPrice", () => {
    it("最大のPriceを取得する", () => {
      expect(builder.totalMaxPrice).toBe(430000000);
    });
  });

  describe("#buildLayoutSummaries", () => {
    it("Layoutごとのサマリを取得する", () => {
      expect(builder.buildLayoutSummaries()).toEqual([
        {
          layout: "1SLDK",
          info: "8,980万円 ~ 2億2,800万円 / 62.04㎡ ~ 108.11㎡",
        },
        {
          layout: "2LDK",
          info: "7,800万円 ~ 4億3,000万円 / 59.83㎡ ~ 159.42㎡",
        },
      ]);
    });
  });
});
