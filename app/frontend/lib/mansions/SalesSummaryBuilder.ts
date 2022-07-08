import compact from "lodash/compact";
import min from "lodash/min";
import max from "lodash/max";
import sortBy from "lodash/sortBy";
import uniq from "lodash/uniq";
import zip from "lodash/zip";

import { yenFormat } from "~/lib/utils";

interface SalesSummary {
  layout: string;
  minPrice: number;
  maxPrice: number;
  minExclusiveArea?: number;
  maxExclusiveArea?: number;
}

export interface LayoutSummary {
  layout?: string;
  info: string;
}

export default class SalesSummaryBuilder {
  private readonly _summaries: SalesSummary[];
  private readonly _layouts: string[];
  private readonly _prices: number[][];
  private readonly _areas: number[][];

  public totalMinPrice: number;
  public totalMaxPrice: number;

  public constructor(summaries: SalesSummary[]) {
    this._summaries = sortBy(summaries, ["layout"]);
    this._layouts = this._summaries.map((s) => s.layout);
    this._prices = this._summaries.map((s) => uniq([s.minPrice, s.maxPrice]));
    this._areas = this._summaries.map((s) => {
      if (s.minExclusiveArea == null || s.maxExclusiveArea == null) {
        return [];
      }
      return uniq([s.minExclusiveArea, s.maxExclusiveArea]);
    });

    this.totalMinPrice = min(this._summaries.map((s) => s.minPrice)) || 0;
    this.totalMaxPrice = max(this._summaries.map((s) => s.maxPrice)) || 0;
  }

  public buildLayoutSummaries = (): LayoutSummary[] => {
    const formattedPrices = this._prices.map((arr) =>
      arr.map((price) => yenFormat(price))
    );
    const formattedAreas = this._areas.map((arr) =>
      arr.map((area) => `${area}㎡`)
    );

    return compact(
      zip(this._layouts, formattedPrices, formattedAreas).map((pair) => {
        const info = compact([
          (pair[1] || []).join(" ~ "),
          (pair[2] || []).join(" ~ "),
        ]).join(" / ");

        return {
          layout: pair[0],
          info: info,
        };
      })
    );
  };
}
